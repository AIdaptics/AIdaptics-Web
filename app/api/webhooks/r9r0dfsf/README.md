# Typeform Webhook Endpoint

## Overview
This is a robust webhook endpoint that receives data from Typeform and forwards it to another webhook URL with comprehensive security and validation features. **Optimized for complex forms with 14+ questions and supports all Typeform field types.**

## Endpoint URL
```
POST {your-domain}/api/webhooks/r9r0dfsf
```

## Environment Variables Required

### Required Configuration
```bash
# Target webhook URL where data will be forwarded
TARGET_WEBHOOK_URL=https://your-target-webhook-url.com/webhook

# Secret key for webhook signature verification (generate a strong random string)
WEBHOOK_SECRET_KEY=your-secret-key-here
```

## Security Features

### 1. Secret Key Authentication
- Uses HMAC SHA-256 signature verification
- Supports multiple signature header formats:
  - `x-typeform-signature`
  - `x-signature` 
  - `x-hub-signature-256`

### 2. Rate Limiting
- 500 requests per minute per IP address
- Uses LRU cache for efficient tracking

### 3. Request Validation
- Validates Content-Type (must be application/json)
- Validates User-Agent (must contain 'Typeform' or 'webhook')
- Validates JSON payload structure

### 4. Enhanced Error Handling
- Comprehensive error logging
- Proper HTTP status codes
- Timeout protection (10 seconds)
- Graceful error responses

## Data Transformation

The webhook transforms Typeform data into a structured format:

### Input (Typeform Format)
```json
{
  "form_response": {
    "form_id": "abc123",
    "token": "submission_token",
    "submitted_at": "2025-01-02T10:00:00Z",
    "answers": [
      {
        "field": {
          "id": "field_id",
          "type": "text"
        },
        "text": "User answer"
      }
    ]
  }
}
```

### Output (Transformed Format)
```json
{
  "source": "typeform",
  "timestamp": "2025-01-02T10:00:00Z",
  "webhookId": "r9r0dfsf",
  "metadata": {
    "receivedAt": "2025-01-02T10:00:00Z",
    "ip": "192.168.1.1",
    "userAgent": "Typeform-Webhook/1.0"
  },
  "form": {
    "id": "abc123",
    "token": "submission_token",
    "submittedAt": "2025-01-02T10:00:00Z",
    "landedAt": "2025-01-02T09:59:00Z",
    "calculated": {},
    "variables": [],
    "hidden": {
      "auth_code": "xxxxx",
      "user_id": "12345"
    },
    "totalAnswers": 14,
    "formDefinition": {
      "id": "abc123",
      "title": "My Complex Form",
      "totalFields": 14
    }
  },
  "answers": [
    {
      "fieldId": "field_id",
      "fieldType": "text",
      "fieldRef": "field_ref",
      "answer": "User answer",
      "answerLabel": null,
      "hasAnswer": true,
      "answerLength": 12,
      "isMultipleChoice": false,
      "isRequired": true
    }
  ],
  "originalData": { /* original Typeform payload */ }
}
```

## Supported Field Types

The webhook supports **all Typeform field types** including:

### Text Fields
- `text`, `short_text`, `long_text`
- `email`
- `phone_number`
- `url`

### Choice Fields
- `choice`, `single_choice`
- `choices`, `multiple_choice`
- `dropdown`

### Number Fields
- `number`
- `rating`
- `opinion_scale`
- `nps` (Net Promoter Score)

### Special Fields
- `boolean`, `yes_no`
- `date`
- `file_upload`
- `legal`
- `statement`
- `group` (nested answers)
- `payment`

## Complex Form Features

### Large Form Support
- ✅ **14+ Questions**: Optimized for complex forms
- ✅ **Answer Validation**: Ensures all answers are properly processed
- ✅ **Metadata Tracking**: Includes answer count and form complexity
- ✅ **Performance Monitoring**: Logs large form submissions

### Enhanced Data Structure
- ✅ **Form Definition**: Includes form title and total field count
- ✅ **Answer Metadata**: Tracks answer completeness, length, and type
- ✅ **Validation Status**: Shows which fields are required vs optional
- ✅ **Multiple Choice Detection**: Identifies multi-select fields
- ✅ **Hidden Fields Support**: Captures auth_code and other hidden parameters
- ✅ **Auth Code Tracking**: Extracts and forwards authentication codes from URLs

## Auth Code Support

### URL-Based Auth Codes
When users access your Typeform with an auth_code in the URL:
```
https://form.typeform.com/to/iWlPNbs0#auth_code=xxxxx
```

The webhook will automatically:
- ✅ **Extract the auth_code** from the form submission
- ✅ **Include it in Discord messages** with proper formatting
- ✅ **Log auth_code information** for tracking
- ✅ **Forward to target webhook** in the data payload

### Discord Message Format
```
🎯 **New Typeform Submission**

**Form:** My branded typeform
**Submission ID:** 01K6HN31KEHKS16BSNPCXR5MHX
**Auth Code:** `xxxxx`

**Answers:**
**Question 1:** Choice 1
```

### Data Structure
```json
{
  "form": {
    "hidden": {
      "auth_code": "xxxxx",
      "user_id": "12345"
    }
  }
}
```

## API Endpoints

### POST /api/webhooks/r9r0dfsf
- Receives Typeform webhook data
- Validates and forwards to target webhook
- Returns success/error response

### GET /api/webhooks/r9r0dfsf
- Health check endpoint
- Shows configuration status
- Lists available features

### OPTIONS /api/webhooks/r9r0dfsf
- CORS preflight support
- Allows cross-origin requests if needed

## HTTP Status Codes

- `200` - Success
- `400` - Bad Request (invalid data format)
- `401` - Unauthorized (invalid signature)
- `429` - Rate Limit Exceeded
- `500` - Internal Server Error (configuration issues)
- `502` - Bad Gateway (target webhook error)
- `504` - Gateway Timeout (target webhook timeout)

## Setup Instructions

1. **Set Environment Variables**:
   ```bash
   TARGET_WEBHOOK_URL=https://your-destination-webhook.com
   WEBHOOK_SECRET_KEY=your-strong-secret-key
   ```

2. **Configure Typeform Webhook**:
   - Go to your Typeform dashboard
   - Navigate to Connect > Webhooks
   - Add webhook URL: `https://your-domain.com/api/webhooks/r9r0dfsf`
   - Set the secret key in Typeform webhook settings

3. **Test the Endpoint**:
   ```bash
   curl -X GET https://your-domain.com/api/webhooks/r9r0dfsf
   ```

## Monitoring and Logging

The webhook provides comprehensive logging:
- Request validation results
- Signature verification status
- Data transformation details
- Forwarding success/failure
- Error details with context

Check your application logs for detailed information about webhook processing.

## Security Best Practices

1. **Use HTTPS**: Always use HTTPS in production
2. **Strong Secret Key**: Generate a cryptographically strong secret key
3. **Monitor Logs**: Regularly check logs for suspicious activity
4. **Rate Limiting**: The endpoint includes built-in rate limiting
5. **Validation**: All requests are validated before processing
6. **Timeout Protection**: Prevents hanging requests

## Troubleshooting

### Common Issues

1. **401 Unauthorized**: Check if the secret key matches between Typeform and your environment
2. **500 Configuration Error**: Verify TARGET_WEBHOOK_URL is set
3. **502 Bad Gateway**: Check if target webhook URL is accessible
4. **429 Rate Limited**: Too many requests from same IP

### Debug Mode
Enable detailed logging by checking your application console for webhook processing details.
