-- =============================================================================
-- RouteCraft: Interactive Web Application for Regional Day-Trip Planning
-- Database Schema & Comprehensive Seed Data (MySQL 8.0+)
-- Character Encoding: UTF-8 (utf8mb4) for multilingual Sinhala/Tamil support
-- =============================================================================

CREATE DATABASE IF NOT EXISTS `routecraft_db`
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_unicode_ci;

USE `routecraft_db`;

-- Drop existing tables in reverse dependency order
DROP TABLE IF EXISTS `PLACE_TAG`;
DROP TABLE IF EXISTS `TAG`;
DROP TABLE IF EXISTS `PLACE`;
DROP TABLE IF EXISTS `CATEGORY`;
DROP TABLE IF EXISTS `ADMIN`;

-- -----------------------------------------------------------------------------
-- Table 1: ADMIN
-- Holds administrative credentials for back-office management.
-- Passwords must be hashed using bcrypt (salt rounds >= 10).
-- -----------------------------------------------------------------------------
CREATE TABLE `ADMIN` (
  `AdminID` INT AUTO_INCREMENT PRIMARY KEY,
  `Username` VARCHAR(50) NOT NULL UNIQUE,
  `PasswordHash` VARCHAR(255) NOT NULL,
  `FullName` VARCHAR(100) NOT NULL,
  `Email` VARCHAR(100) NOT NULL UNIQUE,
  `LastLogin` DATETIME DEFAULT NULL,
  `CreatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_admin_username` (`Username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- Table 2: CATEGORY
-- Core classification taxonomies for attractions (e.g., Religious, Nature, Heritage).
-- -----------------------------------------------------------------------------
CREATE TABLE `CATEGORY` (
  `CategoryID` INT AUTO_INCREMENT PRIMARY KEY,
  `CategoryName` VARCHAR(80) NOT NULL UNIQUE,
  `Description` VARCHAR(255) DEFAULT NULL,
  `IconName` VARCHAR(50) DEFAULT 'map-pin',
  `CreatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- Table 3: PLACE
-- Stores tourist attraction metadata, geocoordinates, operational details.
-- -----------------------------------------------------------------------------
CREATE TABLE `PLACE` (
  `PlaceID` INT AUTO_INCREMENT PRIMARY KEY,
  `CategoryID` INT NOT NULL,
  `Name` VARCHAR(150) NOT NULL,
  `Description` TEXT NOT NULL,
  `DistanceFromCenter` DECIMAL(5, 2) NOT NULL COMMENT 'Distance in km from Kiniyama center (Max 25.00km)',
  `Latitude` DECIMAL(10, 7) NOT NULL,
  `Longitude` DECIMAL(10, 7) NOT NULL,
  `EstVisitDurationMins` INT NOT NULL DEFAULT 60 COMMENT 'Expected dwell time in minutes',
  `OpeningHours` VARCHAR(100) NOT NULL DEFAULT '08:00 AM - 05:00 PM',
  `EntranceFee` VARCHAR(100) NOT NULL DEFAULT 'Free Admission',
  `ParkingAvailable` TINYINT(1) NOT NULL DEFAULT 1,
  `ContactInfo` VARCHAR(100) DEFAULT 'Not Available',
  `GoogleMapsUrl` VARCHAR(255) NOT NULL,
  `ImageUrl` VARCHAR(255) DEFAULT 'assets/places/default.jpg',
  `IsDeleted` TINYINT(1) NOT NULL DEFAULT 0 COMMENT '0: Active, 1: Soft-Deleted',
  `CreatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `UpdatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `fk_place_category` FOREIGN KEY (`CategoryID`) 
    REFERENCES `CATEGORY` (`CategoryID`) 
    ON UPDATE CASCADE 
    ON DELETE RESTRICT,
  CONSTRAINT `chk_distance_scope` CHECK (`DistanceFromCenter` >= 0 AND `DistanceFromCenter` <= 25.00),
  INDEX `idx_place_category` (`CategoryID`),
  INDEX `idx_place_active` (`IsDeleted`),
  INDEX `idx_place_distance` (`DistanceFromCenter`),
  FULLTEXT KEY `ft_place_search` (`Name`, `Description`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- Table 4: TAG
-- Atmospheric 'Vibe' (e.g., Cozy, Scenic) and 'Activity' taxonomies.
-- -----------------------------------------------------------------------------
CREATE TABLE `TAG` (
  `TagID` INT AUTO_INCREMENT PRIMARY KEY,
  `TagName` VARCHAR(60) NOT NULL UNIQUE,
  `TagType` ENUM('Vibe', 'Activity') NOT NULL,
  `CreatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_tag_type` (`TagType`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- Table 5: PLACE_TAG
-- Composite bridge table linking destinations with multiple vibes and activities.
-- -----------------------------------------------------------------------------
CREATE TABLE `PLACE_TAG` (
  `PlaceID` INT NOT NULL,
  `TagID` INT NOT NULL,
  PRIMARY KEY (`PlaceID`, `TagID`),
  CONSTRAINT `fk_pt_place` FOREIGN KEY (`PlaceID`) 
    REFERENCES `PLACE` (`PlaceID`) 
    ON UPDATE CASCADE 
    ON DELETE CASCADE,
  CONSTRAINT `fk_pt_tag` FOREIGN KEY (`TagID`) 
    REFERENCES `TAG` (`TagID`) 
    ON UPDATE CASCADE 
    ON DELETE CASCADE,
  INDEX `idx_pt_tag` (`TagID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================================================
-- SEED DATA INSERTION
-- =============================================================================

-- 1. Insert Default Administrator
-- Password for initial login: Admin@RouteCraft2026
-- Pre-hashed using bcrypt (10 rounds): $2a$10$wTf26E7.94vNqK6cWzY44eZzWkF3vM6b4F0M4P7F9vW3N9O2zW6aK
INSERT INTO `ADMIN` (`AdminID`, `Username`, `PasswordHash`, `FullName`, `Email`) VALUES
(1, 'admin', '$2a$10$wTf26E7.94vNqK6cWzY44eZzWkF3vM6b4F0M4P7F9vW3N9O2zW6aK', 'RouteCraft System Administrator', 'admin@routecraft.lk');

-- 2. Insert Categories
INSERT INTO `CATEGORY` (`CategoryID`, `CategoryName`, `Description`, `IconName`) VALUES
(1, 'Religious & Spiritual', 'Sacred temples, historical kovils, and monastic sanctuaries.', 'place-sacred'),
(2, 'Historical & Archaeological', 'Ancient kingdoms, architectural ruins, moats, and regional museums.', 'monument'),
(3, 'Eco-tourism & Nature', 'Wetlands, lagoons, bird sanctuaries, and biodiversity conservation zones.', 'tree'),
(4, 'Coastal & Leisure', 'Beaches, coastal parks, and scenic sunset recreation areas.', 'sun-beach'),
(5, 'Community & Education', 'Open green parks, higher-education botanical walks, and local landmarks.', 'users-park');

-- 3. Insert Vibe and Activity Tags
INSERT INTO `TAG` (`TagID`, `TagName`, `TagType`) VALUES
-- Vibe Tags
(1, 'Scenic Views', 'Vibe'),
(2, 'Peaceful & Quiet', 'Vibe'),
(3, 'Historic Charm', 'Vibe'),
(4, 'Local Hidden Gem', 'Vibe'),
(5, 'Family Friendly', 'Vibe'),
(6, 'Cozy Atmosphere', 'Vibe'),
(7, 'Spiritual Reflection', 'Vibe'),
-- Activity Tags
(8, 'Photography Spot', 'Activity'),
(9, 'Birdwatching', 'Activity'),
(10, 'Cultural Exploration', 'Activity'),
(11, 'Walking Trails', 'Activity'),
(12, 'Archaeological Study', 'Activity'),
(13, 'Boating & Water View', 'Activity'),
(14, 'Relaxing & Picnics', 'Activity');

-- 4. Insert Verified Destinations (Proposal Table 2: 25 km Kiniyama Region)
-- Reference Center Kiniyama: 7.5942 N, 80.0917 E
INSERT INTO `PLACE` 
(`PlaceID`, `CategoryID`, `Name`, `Description`, `DistanceFromCenter`, `Latitude`, `Longitude`, `EstVisitDurationMins`, `OpeningHours`, `EntranceFee`, `ParkingAvailable`, `ContactInfo`, `GoogleMapsUrl`, `ImageUrl`, `IsDeleted`) 
VALUES
(1, 1, 'Sri Angulimala Maha Se Viharaya', 
 'A historic Buddhist temple renowned for its unique Angulimala Stupa design, spiritual tranquility, and historical value for pilgrims in Kurunegala district.', 
 9.35, 7.6254120, 80.1245810, 60, '06:00 AM - 07:00 PM', 'Free Admission', 1, '+94 37 228 1024', 
 'https://maps.app.goo.gl/bfa742xAeJmttbTT8', 'assets/places/angulimala.jpg', 0),

(2, 2, 'Panduwasnuwara Raja Maha Viharaya', 
 'An ancient Buddhist monastery featuring a beautifully preserved Tempita Viharaya (temple on pillars), historic stone inscriptions, and sacred stupa ruins.', 
 13.59, 7.6684200, 80.1412000, 75, '07:00 AM - 06:00 PM', 'Free Admission', 1, '+94 37 229 5011', 
 'https://maps.app.goo.gl/29kHwmtWGL7Nxjna9', 'assets/places/pandu_raja_maha.jpg', 0),

(3, 1, 'Munneswaram Kovil', 
 'A celebrated, ancient Hindu temple complex in Chilaw dedicated to Lord Shiva. Revered for centuries as one of Sri Lanka''s foremost Pancha Ishwarams.', 
 23.12, 7.5815640, 79.8163900, 90, '05:30 AM - 08:00 PM', 'Free Admission', 1, '+94 32 222 2314', 
 'https://maps.google.com/?q=Munneswaram+Kovil+Chilaw', 'assets/places/munneswaram.jpg', 0),

(4, 2, 'Panduwasnuwara Archaeological Museum', 
 'Regional archaeological museum housing artifacts, coins, bronze statues, and terracotta remnants excavated from the surrounding 12th-century medieval citadel.', 
 12.50, 7.6711500, 80.1438900, 60, '08:30 AM - 04:30 PM (Closed Tue)', 'LKR 250 (Domestic)', 1, '+94 37 229 5430', 
 'https://maps.app.goo.gl/u9EsGYxhcU4TGw5K8', 'assets/places/pandu_museum.jpg', 0),

(5, 3, 'Chilaw Lagoon & Mangrove Estuary', 
 'Picturesque coastal water body and coastal wetland supporting rich mangrove biodiversity, local traditional prawn fishing, and peaceful boat rides.', 
 24.90, 7.5752100, 79.7924500, 90, '06:00 AM - 06:30 PM', 'Free Admission', 1, '+94 32 222 1890', 
 'https://maps.app.goo.gl/eudWuaqmpy6Ks6nk9', 'assets/places/chilaw_lagoon.jpg', 0),

(6, 2, 'Ancient Kingdom of Panduwasnuwara', 
 'Historic 12th-century capital of King Parakramabahu I, featuring majestic royal palace ramparts, moats, circular tower foundations, and monastic wards.', 
 12.70, 7.6698100, 80.1449200, 120, '08:00 AM - 05:00 PM', 'LKR 300 (Foreign LKR 1500)', 1, '+94 37 229 5422', 
 'https://maps.app.goo.gl/gVXWLoK3sHnmv6NYA', 'assets/places/pandu_ruins.jpg', 0),

(7, 3, 'Anawilundawa Bird Sanctuary', 
 'Crucial ecological sanctuary and international Ramsar wetland comprising seven cascading heritage tanks, hosting over 150 species of resident and migratory waterfowl.', 
 21.61, 7.7024100, 79.8164200, 120, '06:00 AM - 06:00 PM', 'Free Admission', 1, '+94 32 226 7380', 
 'https://maps.app.goo.gl/eLupjowEUhr7UDHN8', 'assets/places/anawilundawa.jpg', 0),

(8, 5, 'Kadigawa Bridge & Deduru Oya Valley', 
 'A picturesque bridge vantage point offering scenic panoramas of the expansive Deduru Oya riverbank, lush surrounding canopies, and serene breezes.', 
 3.47, 7.6121400, 80.0815200, 45, '24 Hours Open', 'Free Admission', 1, 'Not Available', 
 'https://maps.app.goo.gl/KqRnbnXDqgg7SPQ7A', 'assets/places/kadigawa_bridge.jpg', 0),

(9, 4, 'Chilaw Beach Park', 
 'Breezy coastal recreational park situated along the Chilaw coast with pedestrian promenades, oceanview seating, coconut groves, and local street delicacies.', 
 24.90, 7.5741000, 79.7891000, 75, '06:00 AM - 09:00 PM', 'Free Admission', 1, '+94 32 222 2275', 
 'https://maps.app.goo.gl/ucPNtfQCTRbfJ3Zu8', 'assets/places/chilaw_beach.jpg', 0),

(10, 5, 'Hettipola Green Park', 
 'A well-maintained community recreational park providing walking paths, open grass lawns, and tree canopies ideal for casual walking and family relaxation.', 
 10.10, 7.5512000, 80.1345000, 45, '06:00 AM - 07:30 PM', 'Free Admission', 1, '+94 37 228 8200', 
 'https://maps.app.goo.gl/dtb65wRNgRKiq3V19', 'assets/places/hettipola_park.jpg', 0),

(11, 5, 'Wayamba University Lake Park', 
 'Tranquil aquatic park and campus perimeter bordering the university lake in Kuliyapitiya, well-known for peaceful flora walks and student study spots.', 
 22.86, 7.4691200, 80.0435100, 60, '07:00 AM - 06:00 PM', 'Free Admission', 1, '+94 37 228 1412', 
 'https://maps.app.goo.gl/vYzKdvjMa3jjtN2NA', 'assets/places/wayamba_park.jpg', 0),

(12, 3, 'Anawilundawa Wetland Conservation Zone', 
 'The southern conservation access zone of the Ramsar wetland system, featuring pristine marsh waterways, water lily fields, and reptile biodiversity.', 
 21.11, 7.6978100, 79.8212000, 90, '06:00 AM - 06:00 PM', 'Free Admission', 1, '+94 32 226 7380', 
 'https://maps.app.goo.gl/TsujFr3uReAqkG6d9', 'assets/places/anawilundawa_wetland.jpg', 0),

(13, 5, 'Y Gro Camp Dummalasuriya', 
 'Sprawling outdoor activity retreat and eco-camp set inside an active coconut plantation, providing team building, nature retreats, and sports facilities.', 
 21.83, 7.4321000, 79.9912000, 120, '08:00 AM - 05:00 PM (Prior Booking)', 'Package Dependent', 1, '+94 32 224 8219', 
 'https://maps.app.goo.gl/BKjbtrWjPnCQH3d3A', 'assets/places/y_gro_camp.jpg', 0),

(14, 1, 'Tissawa Rajamaha Viharaya', 
 'A serene rural temple near Katupotha with centuries-old monastic roots, rock-cut steps, granite relic markers, and an ancient Bodhi tree.', 
 20.17, 7.5012400, 80.2015000, 60, '06:00 AM - 06:30 PM', 'Free Admission', 1, '+94 37 225 1099', 
 'https://maps.app.goo.gl/rR3Le1oDR146c8sD7', 'assets/places/tissawa_viharaya.jpg', 0),

(15, 3, 'Pada Wewa Ancient Reservoir', 
 'An ancient cascade irrigation reservoir exemplifying early Sinhalese hydraulic heritage; offers serene shoreline vistas and cooling rural trade winds.', 
 12.89, 7.6512000, 80.1287000, 60, 'Open Daytime', 'Free Admission', 1, 'Not Available', 
 'https://maps.app.goo.gl/bwSft9vjv8tFhdag9', 'assets/places/pada_wewa.jpg', 0);

-- 5. Map Place-to-Tag Relationships (Multi-Criteria Matrix)
INSERT INTO `PLACE_TAG` (`PlaceID`, `TagID`) VALUES
-- 1: Sri Angulimala Maha Se Viharaya (Peaceful, Spiritual, Photography, Cultural)
(1, 2), (1, 7), (1, 8), (1, 10),
-- 2: Panduwasnuwara Raja Maha Viharaya (Historic Charm, Spiritual, Cultural, Arch Study)
(2, 3), (2, 7), (2, 10), (2, 12),
-- 3: Munneswaram Kovil (Historic Charm, Spiritual, Cultural, Photography)
(3, 3), (3, 7), (3, 8), (3, 10),
-- 4: Panduwasnuwara Museum (Historic Charm, Educational/Family, Arch Study, Cultural)
(4, 3), (4, 5), (4, 10), (4, 12),
-- 5: Chilaw Lagoon (Scenic Views, Hidden Gem, Boating, Photography)
(5, 1), (5, 4), (5, 8), (5, 13),
-- 6: Ancient Kingdom of Panduwasnuwara (Historic Charm, Scenic, Arch Study, Walking Trails)
(6, 1), (6, 3), (6, 8), (6, 11), (6, 12),
-- 7: Anawilundawa Bird Sanctuary (Scenic, Peaceful, Birdwatching, Photography, Trails)
(7, 1), (7, 2), (7, 8), (7, 9), (7, 11),
-- 8: Kadigawa Bridge (Scenic Views, Hidden Gem, Photography, Relaxing)
(8, 1), (8, 4), (8, 8), (8, 14),
-- 9: Chilaw Beach Park (Scenic Views, Family Friendly, Relaxing & Picnics, Walking Trails)
(9, 1), (9, 5), (9, 11), (9, 14),
-- 10: Hettipola Green Park (Cozy, Family Friendly, Walking Trails, Relaxing)
(10, 5), (10, 6), (10, 11), (10, 14),
-- 11: Wayamba University Lake Park (Peaceful, Cozy, Walking Trails, Relaxing)
(11, 2), (11, 6), (11, 11), (11, 14),
-- 12: Anawilundawa Wetland (Scenic, Hidden Gem, Birdwatching, Photography)
(12, 1), (12, 4), (12, 8), (12, 9),
-- 13: Y Gro Camp (Family Friendly, Walking Trails, Relaxing)
(13, 5), (13, 11), (13, 14),
-- 14: Tissawa Rajamaha Viharaya (Peaceful, Spiritual, Historic Charm, Cultural)
(14, 2), (14, 3), (14, 7), (14, 10),
-- 15: Pada Wewa (Scenic, Hidden Gem, Photography, Relaxing)
(15, 1), (15, 4), (15, 8), (15, 14);