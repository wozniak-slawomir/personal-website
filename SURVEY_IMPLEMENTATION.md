# Survey Application

## Overview

Simple survey application for collecting programmer personality data.

## Features

1. **20-question TIPI personality test** for Big Five traits
2. **Employment data collection** (type, experience, salary)
3. **IP-based one-response limit**
4. **SQLite database storage** (`.data/survey.db`)

## Files

### Backend
| File | Description |
|------|-------------|
| [surveyDatabase.ts](file:///home/slawomir/Desktop/Work/personal-website/server/utils/surveyDatabase.ts) | Survey database with `survey_responses` table |
| [surveyUtils.ts](file:///home/slawomir/Desktop/Work/personal-website/server/utils/surveyUtils.ts) | Shared utilities (getClientIP, validateTIPIAnswer) |
| [responses.post.ts](file:///home/slawomir/Desktop/Work/personal-website/server/api/survey/responses.post.ts) | Survey submission endpoint |
| [check-ip.get.ts](file:///home/slawomir/Desktop/Work/personal-website/server/api/survey/check-ip.get.ts) | IP duplicate check |

### Frontend
| File | Description |
|------|-------------|
| [SurveyContainer.vue](file:///home/slawomir/Desktop/Work/personal-website/components/survey/SurveyContainer.vue) | Multi-step survey wizard |
| [ankieta.vue](file:///home/slawomir/Desktop/Work/personal-website/pages/narzedzia/ankieta.vue) | Survey page |

### Constants
| File | Description |
|------|-------------|
| [survey.ts](file:///home/slawomir/Desktop/Work/personal-website/const/survey.ts) | TIPI questions & employment types |

## Access

Survey: `/narzedzia/ankieta`
