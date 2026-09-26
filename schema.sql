-- VoxCRM MySQL Schema
-- Database: voxcrm
-- Safe to run on empty database. Does NOT drop existing tables.

CREATE DATABASE IF NOT EXISTS voxcrm
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE voxcrm;

CREATE TABLE IF NOT EXISTS contacts (
  id            BIGINT AUTO_INCREMENT PRIMARY KEY,
  name          VARCHAR(200) NOT NULL,
  email         VARCHAR(255) NULL,
  phone         VARCHAR(50)  NULL,
  company       VARCHAR(200) NULL,
  industry      VARCHAR(100) NULL,
  location      VARCHAR(200) NULL,
  status        VARCHAR(50)  NOT NULL DEFAULT 'PROSPECT',
  source        VARCHAR(100) NULL,
  notes         TEXT         NULL,
  created_at    DATETIME(6)  NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  updated_at    DATETIME(6)  NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  INDEX idx_contacts_status (status),
  INDEX idx_contacts_email (email),
  INDEX idx_contacts_phone (phone)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS leads (
  id            BIGINT AUTO_INCREMENT PRIMARY KEY,
  contact_id    BIGINT       NOT NULL,
  title         VARCHAR(255) NULL,
  source        VARCHAR(100) NULL,
  status        VARCHAR(50)  NOT NULL DEFAULT 'NEW',
  score         INT          NOT NULL DEFAULT 0,
  estimated_value DECIMAL(14,2) NULL,
  notes         TEXT         NULL,
  created_at    DATETIME(6)  NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  updated_at    DATETIME(6)  NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  CONSTRAINT fk_leads_contact FOREIGN KEY (contact_id) REFERENCES contacts(id),
  INDEX idx_leads_status (status),
  INDEX idx_leads_contact (contact_id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS deals (
  id            BIGINT AUTO_INCREMENT PRIMARY KEY,
  lead_id       BIGINT       NULL,
  contact_id    BIGINT       NOT NULL,
  title         VARCHAR(255) NOT NULL,
  value         DECIMAL(14,2) NOT NULL DEFAULT 0,
  stage         VARCHAR(50)  NOT NULL DEFAULT 'QUALIFICATION',
  expected_close_date DATE   NULL,
  notes         TEXT         NULL,
  created_at    DATETIME(6)  NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  updated_at    DATETIME(6)  NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  CONSTRAINT fk_deals_lead FOREIGN KEY (lead_id) REFERENCES leads(id),
  CONSTRAINT fk_deals_contact FOREIGN KEY (contact_id) REFERENCES contacts(id),
  INDEX idx_deals_stage (stage),
  INDEX idx_deals_contact (contact_id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS calls (
  id                BIGINT AUTO_INCREMENT PRIMARY KEY,
  contact_id        BIGINT       NULL,
  phone             VARCHAR(50)  NULL,
  direction         VARCHAR(20)  NOT NULL DEFAULT 'OUTBOUND',
  status            VARCHAR(50)  NOT NULL DEFAULT 'COMPLETED',
  outcome           VARCHAR(50)  NULL,
  attempt_number    INT          NOT NULL DEFAULT 1,
  duration_seconds  INT          NULL,
  recording_path    VARCHAR(500) NULL,
  recording_url     VARCHAR(500) NULL,
  started_at        DATETIME(6)  NULL,
  ended_at          DATETIME(6)  NULL,
  created_at        DATETIME(6)  NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  updated_at        DATETIME(6)  NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  CONSTRAINT fk_calls_contact FOREIGN KEY (contact_id) REFERENCES contacts(id),
  INDEX idx_calls_contact (contact_id),
  INDEX idx_calls_outcome (outcome),
  INDEX idx_calls_started (started_at)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS call_transcripts (
  id            BIGINT AUTO_INCREMENT PRIMARY KEY,
  call_id       BIGINT       NOT NULL,
  full_text     MEDIUMTEXT   NOT NULL,
  language      VARCHAR(20)  NULL,
  created_at    DATETIME(6)  NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  CONSTRAINT fk_transcript_call FOREIGN KEY (call_id) REFERENCES calls(id) ON DELETE CASCADE,
  UNIQUE KEY uk_transcript_call (call_id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS call_ai_analysis (
  id                  BIGINT AUTO_INCREMENT PRIMARY KEY,
  call_id             BIGINT       NOT NULL,
  summary             TEXT         NULL,
  interest_level      VARCHAR(50)  NULL,
  intent_score        INT          NULL,
  sentiment           VARCHAR(50)  NULL,
  sentiment_score     INT          NULL,
  next_action         VARCHAR(500) NULL,
  estimated_deal      DECIMAL(14,2) NULL,
  objections          TEXT         NULL,
  follow_up_required  BOOLEAN      NOT NULL DEFAULT FALSE,
  raw_response        TEXT         NULL,
  created_at          DATETIME(6)  NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  CONSTRAINT fk_analysis_call FOREIGN KEY (call_id) REFERENCES calls(id) ON DELETE CASCADE,
  UNIQUE KEY uk_analysis_call (call_id),
  INDEX idx_analysis_interest (interest_level)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS tasks (
  id            BIGINT AUTO_INCREMENT PRIMARY KEY,
  contact_id    BIGINT       NULL,
  lead_id       BIGINT       NULL,
  call_id       BIGINT       NULL,
  title         VARCHAR(255) NOT NULL,
  description   TEXT         NULL,
  status        VARCHAR(50)  NOT NULL DEFAULT 'PENDING',
  due_at        DATETIME(6)  NULL,
  completed_at  DATETIME(6)  NULL,
  created_at    DATETIME(6)  NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  updated_at    DATETIME(6)  NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  CONSTRAINT fk_tasks_contact FOREIGN KEY (contact_id) REFERENCES contacts(id),
  CONSTRAINT fk_tasks_lead FOREIGN KEY (lead_id) REFERENCES leads(id),
  CONSTRAINT fk_tasks_call FOREIGN KEY (call_id) REFERENCES calls(id),
  INDEX idx_tasks_status (status),
  INDEX idx_tasks_contact (contact_id)
) ENGINE=InnoDB;
