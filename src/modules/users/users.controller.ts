import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  ParseIntPipe,
  Req,
  NotFoundException,
  UnauthorizedException,
  BadRequestException,
  Patch,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { User } from '../../entities/user.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Request } from 'express';
import { UpdateMyAccountDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as QRCode from 'qrcode';
import * as fs from 'fs';
import * as path from 'path';
import { LoginQrDto } from './dto/user-qrcode.dto';

const UPLOAD_DIR = 'uploads';
const PROFILE_DIR = 'profile_pictures';

function ensureDirectoryExists(dirPath: string) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function normalizeImagePath(path: string | null): string | null {
  if (!path) return null;

  // Remove any duplicated '/uploads/' prefixes
  let cleanPath = path
    .replace(/^\/+(uploads\/)+/, '/uploads/') // Replace any starting /uploads/ pattern with a single one
    .replace(/\/+/g, '/'); // Replace any multiple slashes with single

  // If the path still has duplicate 'uploads', fix it
  cleanPath = cleanPath.replace(/\/uploads\/uploads\//, '/uploads/');

  return cleanPath;
}

function getUniqueFileName(dir: string, fileName: string): string {
  // Ensure filename uses underscores instead of spaces
  let safeFileName = fileName.replace(/\s+/g, '_');
  let filePath = path.join(dir, safeFileName);
  let counter = 1;

  // Find unique name if file exists
  while (fs.existsSync(filePath)) {
    const nameWithoutExt = path.basename(
      safeFileName,
      path.extname(safeFileName),
    );
    const ext = path.extname(safeFileName);
    safeFileName = `${nameWithoutExt}_${counter}${ext}`;
    filePath = path.join(dir, safeFileName);
    counter++;
  }

  return safeFileName;
}

// function sanitizeFilename(name: string) {
//   return name
//     .normalize('NFD')
//     .replace(/[\u0300-\u036f]/g, '')
//     .replace(/[^a-zA-Z0-9]/g, '_')
//     .replace(/_+/g, '_')
//     .toLowerCase();
// }

const multerOptions = {
  storage: diskStorage({
    destination: (req, file, cb) => {
      const tempPath = path.join(process.cwd(), 'uploads', 'temp');
      ensureDirectoryExists(tempPath);
      cb(null, tempPath);
    },
    filename: (req: Request, file: Express.Multer.File, cb) => {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const ext = path.extname(file.originalname);
      cb(null, `${uniqueSuffix}${ext}`);
    },
  }),
  fileFilter: (req: Request, file: Express.Multer.File, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|webp|svg)$/i)) {
      return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
};

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User successfully created' })
  @ApiResponse({ status: 409, description: 'Username or email already exists' })
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Post('teacher')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new user with teacher role' })
  @ApiResponse({
    status: 201,
    description: 'Teacher user successfully created',
  })
  @ApiResponse({ status: 409, description: 'Username or email already exists' })
  async createTeacher(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.createUserWithTeacherRole(createUserDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all users with pagination' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiResponse({
    status: 200,
    description: 'Return paginated users with role information',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: { $ref: '#/components/schemas/UserResponseDto' },
        },
        pagination: {
          type: 'object',
          properties: {
            page: { type: 'number', example: 1 },
            limit: { type: 'number', example: 10 },
            total: { type: 'number', example: 100 },
            pages: { type: 'number', example: 10 },
          },
        },
      },
    },
  })
  async findAll(
    @Query('page', new ParseIntPipe({ optional: true })) page: number = 1,
    @Query('limit', new ParseIntPipe({ optional: true })) limit: number = 10,
  ): Promise<any> {
    return this.usersService.findAll(page, limit);
  }

  @Get('filter')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get users filtered by status and role' })
  @ApiQuery({
    name: 'status',
    required: false,
    type: Boolean,
    example: true,
    description: 'Filter by active status (true/false)',
  })
  @ApiQuery({
    name: 'roleId',
    required: false,
    type: Number,
    example: 8,
    description: 'Filter by role ID',
  })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiResponse({
    status: 200,
    description: 'Return filtered paginated users with role information',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: { $ref: '#/components/schemas/UserResponseDto' },
        },
        pagination: {
          type: 'object',
          properties: {
            page: { type: 'number', example: 1 },
            limit: { type: 'number', example: 10 },
            total: { type: 'number', example: 100 },
            total_active: { type: 'number', example: 20 },
            most_role_count: { type: 'string', example: 'គ្រូបង្រៀន 15' },
            pages: { type: 'number', example: 10 },
          },
        },
      },
    },
  })
  async findByStatusAndRole(
    @Query('status') status?: string,
    @Query('roleId', new ParseIntPipe({ optional: true })) roleId?: number,
    @Query('page', new ParseIntPipe({ optional: true })) page: number = 1,
    @Query('limit', new ParseIntPipe({ optional: true })) limit: number = 10,
  ): Promise<any> {
    let statusBoolean: boolean | undefined = undefined;
    if (status !== undefined) {
      statusBoolean = status === 'true';
    }

    return this.usersService.findByStatusAndRole(
      statusBoolean,
      roleId,
      page,
      limit,
    );
  }

  @Get('my-account/address-details')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get current user profile with detailed address information',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns current user profile with address details',
  })
  async getMyAccountWithAddress(@Req() req: Request): Promise<any> {
    if (!req.user || !req.user['id']) {
      throw new UnauthorizedException('Invalid user data');
    }

    const userId = parseInt(req.user['id'], 10);

    if (isNaN(userId)) {
      throw new BadRequestException('Invalid user ID');
    }

    return this.usersService.getUserWithAddressDetails(userId);
  }

  @Get('my-account')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({ status: 200, description: 'Returns current user profile' })
  async getMyAccount(@Req() req: Request): Promise<any> {
    // Ensure the user object exists and has an id
    if (!req.user || !req.user['id']) {
      throw new UnauthorizedException('Invalid user data');
    }

    // Parse the ID to number (just to be safe)
    const userId = parseInt(req.user['id'], 10);

    if (isNaN(userId)) {
      throw new BadRequestException('Invalid user ID');
    }

    const user = await this.usersService.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      fullname: `${user.first_name} ${user.last_name}`,
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
      email: user.email,
      roleId: user.roleId,
      roleNameEn: user.roleNameEn,
      roleNameKh: user.roleNameKh,
      date_of_birth: user.date_of_birth,
      gender: user.gender,
      profile_picture: normalizeImagePath(user.profile_picture),
      phone: user.phone,
      teacherId: user.teacher?.teacher_number || null,
      nationality: user.nationality,
      residence: user.residence,
      placeOfBirth: user.placeOfBirth,
    };
  }

  @Patch('my-account')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async updateMyAccount(
    @Req() req: Request,
    @Body() updateData: UpdateMyAccountDto,
  ): Promise<any> {
    if (!req.user || !req.user['id']) {
      throw new UnauthorizedException('Invalid user data');
    }
    const userId = parseInt(req.user['id'], 10);
    if (isNaN(userId)) {
      throw new BadRequestException('Invalid user ID');
    }

    // Allow updating specific fields
    const allowedFields = [
      'username',
      'first_name',
      'last_name',
      'email',
      'date_of_birth',
      'gender',
      'profile_picture',
      'phone',
      'nationality',
      'emergency_contact',
      'provinceId',
      'districtId',
      'communeId',
      'villageId',
      'teacher_number',
    ];

    const filteredData: any = {};
    for (const key of allowedFields) {
      if (updateData[key] !== undefined) {
        filteredData[key] = updateData[key];
      }
    }

    // Pass newPassword as a separate field
    if (updateData.newPassword) {
      filteredData.newPassword = updateData.newPassword;
    }

    // Log the update data for debugging
    console.log('Update data before service call:', filteredData);

    // Update the user
    const updatedUser = await this.usersService.update(userId, filteredData);

    // Log the updated user for debugging
    console.log('Updated user from service:', updatedUser);

    // Format the response
    const { password_hash, ...result } = updatedUser;

    // Use the updated teacher_number value in the response
    return {
      ...result,
      teacherId: updatedUser.teacher?.teacher_number || null,
      profile_picture: normalizeImagePath(updatedUser.profile_picture),
    };
  }

  @Patch('my-account/profile-picture')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file', multerOptions))
  @ApiBearerAuth()
  async updateProfilePicture(
    @Req() req,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<any> {
    try {
      if (!file) {
        throw new BadRequestException('No file uploaded');
      }

      const userId = req.user['id'];
      const user = await this.usersService.findById(userId);

      if (!user) {
        throw new NotFoundException('User not found');
      }

      // Ensure upload directories exist
      const uploadPath = path.join(process.cwd(), UPLOAD_DIR);
      const profilePath = path.join(uploadPath, PROFILE_DIR);
      ensureDirectoryExists(uploadPath);
      ensureDirectoryExists(profilePath);

      // Create filename using full name
      const fileExtension = path.extname(file.originalname);
      const sanitizedFullName = `${user.first_name}_${user.last_name}`.replace(
        /\s+/g,
        '_',
      );

      // Get unique filename if one already exists
      const profileDir = path.join(process.cwd(), UPLOAD_DIR, PROFILE_DIR);
      const newFileName = getUniqueFileName(
        profileDir,
        `${sanitizedFullName}${fileExtension}`,
      );

      // Create the complete path for storage and response
      const relativePath = `/uploads/${PROFILE_DIR}/${newFileName}`;
      const newFilePath = path.join(
        process.cwd(),
        UPLOAD_DIR,
        PROFILE_DIR,
        newFileName,
      );

      if (user.profile_picture) {
        // Remove any leading slash for file system operations
        const oldPathNormalized = user.profile_picture.replace(/^\//, '');
        const oldPath = path.join(process.cwd(), oldPathNormalized);

        if (fs.existsSync(oldPath)) {
          try {
            fs.unlinkSync(oldPath);
          } catch (err) {
            console.error('Error deleting old profile picture:', err);
          }
        }
      }

      // Move uploaded file
      try {
        fs.copyFileSync(file.path, newFilePath);
        fs.unlinkSync(file.path); // Clean up temp file
      } catch (err) {
        console.error('Error moving file:', err);
        throw new Error('Failed to save uploaded file');
      }

      // Store the path in DB
      await this.usersService.update(userId, { profile_picture: relativePath });

      // Return exactly the same path
      return {
        success: true,
        profile_picture: relativePath,
      };
    } catch (error) {
      console.error('Profile picture upload error:', error);
      throw error;
    }
  }

  @Post('generate-login-qr')
  @ApiOperation({ summary: 'Generate QR code for login credentials' })
  @ApiResponse({ status: 201, description: 'QR code generated successfully' })
  async generateLoginQR(
    @Body() credentials: LoginQrDto,
  ): Promise<{ qrCode: string }> {
    try {
      // Create a login URL with credentials
      const loginUrl = new URL('/login', process.env.FRONTEND_URL);

      // Add credentials as query parameters
      loginUrl.searchParams.append('username', credentials.username);
      loginUrl.searchParams.append('auto_login', 'true'); // Flag for auto-login
      loginUrl.searchParams.append('timestamp', new Date().toISOString());

      // Create URL in a specific format for QR scanning
      const qrData = JSON.stringify({
        title: 'PLP Login', // This will show as the label when scanned
        url: loginUrl.toString(),
      });

      // Generate QR code from the data
      const qrCode = await QRCode.toDataURL(qrData, {
        errorCorrectionLevel: 'H',
        margin: 2,
        width: 300,
        color: {
          dark: '#000000',
          light: '#FFFFFF',
        },
      });

      return { qrCode };
    } catch (error) {
      console.error('QR code generation error:', error);
      throw new BadRequestException('Failed to generate QR code');
    }
  }

  @Post(':id/upload-profile')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Upload profile picture for a user by ID' })
  @ApiResponse({
    status: 200,
    description: 'Profile picture uploaded successfully',
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  async uploadProfile(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<{ profile_picture: string }> {
    const user = await this.usersService.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Create the new filename based on username
    const fileExtension = path.extname(file.originalname);
    const newFileName = `${user.username}${fileExtension}`;
    const newFilePath = path.join(
      process.cwd(),
      'uploads',
      'user_profile',
      newFileName,
    );
    const tempFilePath = file.path;

    // Delete any existing profile pictures for this user
    const profileDir = path.join(process.cwd(), 'uploads', 'user_profile');
    if (fs.existsSync(profileDir)) {
      const files = fs.readdirSync(profileDir);
      const existingFiles = files.filter((f) =>
        f.startsWith(user.username + '.'),
      );
      existingFiles.forEach((existingFile) => {
        const existingFilePath = path.join(profileDir, existingFile);
        if (fs.existsSync(existingFilePath)) {
          fs.unlinkSync(existingFilePath);
        }
      });
    }

    // Rename temp file to permanent location
    fs.renameSync(tempFilePath, newFilePath);

    // Update user record
    const relativePath = `user_profile/${newFileName}`;
    await this.usersService.update(id, { profile_picture: relativePath });

    return {
      profile_picture: `/${relativePath}`,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns the user with role information',
    type: UserResponseDto,
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this.usersService.findById(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a user' })
  @ApiResponse({ status: 200, description: 'User successfully updated' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async update(
    @Param('id') id: number,
    @Body() updateData: Partial<User>,
  ): Promise<User> {
    return this.usersService.update(id, updateData);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({ status: 200, description: 'User successfully deleted' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async remove(@Param('id') id: number): Promise<void> {
    return this.usersService.remove(id);
  }
}
