# Audio File Management API Documentation

## Overview
This document outlines the API endpoints required to support the AudioExplorer component for audio file management.

## Base URL
```
https://your-domain.com/api
```

## Authentication
All endpoints require authentication. Include the authorization header:
```
Authorization: Bearer {your-token}
```

---

## 1. Get Audio Files and Folders

### Endpoint
```
GET /upload/audio-files
```

### Query Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `path` | string | No | Directory path to browse (e.g., "sounds/lessons") |
| `_t` | number | No | Cache busting timestamp |

### Request Example
```
GET /upload/audio-files?path=sounds&_t=1704067200000
```

### Response Format
```json
{
  "success": true,
  "data": {
    "folders": [
      {
        "name": "lesson-1",
        "path": "sounds/lesson-1",
        "modified": "2024-01-01T00:00:00.000Z"
      }
    ],
    "audios": [
      {
        "name": "audio_123456.mp3",
        "original_name": "Lesson 1 - Introduction.mp3",
        "url": "/uploads/audio/sounds/audio_123456.mp3",
        "path": "sounds/audio_123456.mp3",
        "size": 2048000,
        "duration": 120,
        "modified": "2024-01-01T00:00:00.000Z",
        "created_at": "2024-01-01T00:00:00.000Z",
        "tags": ["lesson", "introduction"],
        "description": "Introduction to the lesson",
        "alt_text": "Audio lesson introduction"
      }
    ],
    "totalFolders": 1,
    "totalAudios": 1,
    "currentPath": "sounds"
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Failed to retrieve audio files",
  "error": "Directory not found"
}
```

---

## 2. Upload Audio File

### Endpoint
```
POST /upload/audio
```

### Content-Type
```
multipart/form-data
```

### Form Data
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `audio` | file | Yes | Audio file (MP3, WAV, OGG, M4A, AAC, FLAC) |
| `path` | string | No | Directory path to upload to |

### File Requirements
- **Max Size:** 50MB
- **Allowed Types:** MP3, WAV, OGG, M4A, AAC, FLAC
- **MIME Types:** audio/mpeg, audio/wav, audio/ogg, audio/mp4, audio/aac, audio/flac

### Request Example
```
POST /upload/audio
Content-Type: multipart/form-data

Form Data:
- audio: [binary file data]
- path: sounds/lesson-1
```

### Success Response
```json
{
  "success": true,
  "data": {
    "filename": "audio_123456.mp3",
    "original_name": "Lesson 1 - Introduction.mp3",
    "url": "/uploads/audio/sounds/lesson-1/audio_123456.mp3",
    "size": 2048000,
    "duration": 120,
    "path": "sounds/lesson-1/audio_123456.mp3"
  }
}
```

### Error Responses

#### File Too Large
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "audio": ["The audio file must not be greater than 51200 kilobytes."]
  }
}
```

#### Invalid File Type
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "audio": ["The audio must be a file of type: mp3, wav, ogg, m4a, aac, flac."]
  }
}
```

#### Upload Failed
```json
{
  "success": false,
  "message": "Failed to upload audio file",
  "error": "Storage disk full"
}
```

---

## 3. Delete Audio File

### Endpoint
```
DELETE /upload/audio
```

### Request Body
```json
{
  "filename": "audio_123456.mp3"
}
```

### Success Response
```json
{
  "success": true,
  "message": "Audio file deleted successfully"
}
```

### Error Response
```json
{
  "success": false,
  "message": "Failed to delete audio file",
  "error": "File not found"
}
```

---

## 4. Create Folder

### Endpoint
```
POST /upload/folder
```

### Request Body
```json
{
  "path": "sounds/lesson-1",
  "name": "new-folder"
}
```

### Success Response
```json
{
  "success": true,
  "message": "Folder created successfully",
  "data": {
    "name": "new-folder",
    "path": "sounds/lesson-1/new-folder"
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Failed to create folder",
  "error": "Folder already exists"
}
```

---

## 5. Delete Folder

### Endpoint
```
DELETE /upload/folder
```

### Request Body
```json
{
  "path": "sounds/lesson-1/old-folder"
}
```

### Success Response
```json
{
  "success": true,
  "message": "Folder deleted successfully"
}
```

### Error Response
```json
{
  "success": false,
  "message": "Failed to delete folder",
  "error": "Folder not empty"
}
```

---

## 6. Rename Folder

### Endpoint
```
POST /upload/folder/rename
```

### Request Body
```json
{
  "oldPath": "sounds/lesson-1/old-name",
  "newName": "new-name"
}
```

### Success Response
```json
{
  "success": true,
  "message": "Folder renamed successfully",
  "data": {
    "oldPath": "sounds/lesson-1/old-name",
    "newPath": "sounds/lesson-1/new-name"
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Failed to rename folder",
  "error": "New name already exists"
}
```

---

## 7. Update Audio Metadata

### Endpoint
```
POST /upload/audio/metadata
```

### Request Body
```json
{
  "filename": "audio_123456.mp3",
  "original_name": "Updated Lesson Name.mp3",
  "tags": ["lesson", "updated", "pronunciation"],
  "description": "Updated lesson description",
  "alt_text": "Updated accessibility text"
}
```

### Success Response
```json
{
  "success": true,
  "message": "Audio metadata updated successfully",
  "data": {
    "filename": "audio_123456.mp3",
    "original_name": "Updated Lesson Name.mp3",
    "tags": ["lesson", "updated", "pronunciation"],
    "description": "Updated lesson description",
    "alt_text": "Updated accessibility text"
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Failed to update audio metadata",
  "error": "File not found"
}
```

---

## 8. Search Audio Files

### Endpoint
```
GET /upload/audio/search
```

### Query Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `tagSearch` | string | No | Search by tags (partial match) |
| `description` | string | No | Search by description |
| `path` | string | No | Search by file path |

### Request Example
```
GET /upload/audio/search?tagSearch=lesson&description=introduction
```

### Success Response
```json
{
  "success": true,
  "data": {
    "total": 2,
    "audios": [
      {
        "name": "audio_123456.mp3",
        "original_name": "Lesson 1 - Introduction.mp3",
        "url": "/uploads/audio/sounds/audio_123456.mp3",
        "path": "sounds/audio_123456.mp3",
        "size": 2048000,
        "duration": 120,
        "modified": "2024-01-01T00:00:00.000Z",
        "tags": ["lesson", "introduction"],
        "description": "Introduction to the lesson"
      }
    ]
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Search feature not available",
  "error": "Search functionality not implemented"
}
```

---

## HTTP Status Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created (for uploads) |
| 400 | Bad Request (validation errors) |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 413 | Payload Too Large |
| 500 | Internal Server Error |

---

## Error Response Format

All error responses follow this format:
```json
{
  "success": false,
  "message": "Human readable error message",
  "error": "Technical error details (optional)",
  "code": "ERROR_CODE (optional)"
}
```

---

## Rate Limiting

- **Upload endpoints:** 10 requests per minute per user
- **Search endpoints:** 60 requests per minute per user
- **Other endpoints:** 120 requests per minute per user

---

## File Size Limits

- **Maximum file size:** 50MB (51,200 KB)
- **Recommended formats:** MP3, WAV, OGG
- **Supported formats:** MP3, WAV, OGG, M4A, AAC, FLAC

---

## Notes

1. All timestamps are in ISO 8601 format (UTC)
2. File sizes are returned in bytes
3. Duration is returned in seconds
4. URLs are relative to the domain root
5. Tags are returned as arrays of strings
6. Empty folders return empty arrays for both `folders` and `audios`
7. Cache busting parameter `_t` should be a timestamp in milliseconds 