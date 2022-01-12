-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema searchnstay_database
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema searchnstay_database
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `searchnstay_database` DEFAULT CHARACTER SET utf8 ;
USE `searchnstay_database` ;

-- -----------------------------------------------------
-- Table `searchnstay_database`.`admin`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `searchnstay_database`.`admin` (
  `admin_id` INT NOT NULL AUTO_INCREMENT,
  `admin_name` VARCHAR(100) NOT NULL,
  `admin_username` VARCHAR(100) NOT NULL,
  `admin_password` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`admin_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `searchnstay_database`.`boarding_house_owners`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `searchnstay_database`.`boarding_house_owners` (
  `bho_id` INT NOT NULL AUTO_INCREMENT,
  `bho_name` VARCHAR(100) NOT NULL,
  `bho_username` VARCHAR(100) NOT NULL,
  `bho_password` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`bho_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `searchnstay_database`.`boarding_house`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `searchnstay_database`.`boarding_house` (
  `boardinghouse_id` INT NOT NULL AUTO_INCREMENT,
  `bho_id` INT NOT NULL,
  `bh_name` VARCHAR(100) NOT NULL,
  `bh_owner` VARCHAR(100) NOT NULL,
  `bh_street_address` VARCHAR(100) NULL,
  `bh_zone_address` VARCHAR(100) NULL,
  `bh_complete_address` VARCHAR(255) NULL,
  `bh_longitude` DOUBLE NULL DEFAULT NULL,
  `bh_latitude` DOUBLE NULL DEFAULT NULL,
  `bh_contacts` VARCHAR(255) NULL DEFAULT NULL,
  `bh_popularity` INT NULL DEFAULT 0,
  `tagline` MEDIUMTEXT NULL DEFAULT NULL,
  `house_protocols` TEXT NULL DEFAULT NULL,
  `offers` TEXT NULL DEFAULT NULL,
  `price_range` VARCHAR(100) NULL DEFAULT NULL,
  `water_source` VARCHAR(255) NULL DEFAULT NULL,
  `gender_allowed` VARCHAR(45) NULL DEFAULT NULL,
  `total_rooms` INT NULL DEFAULT 0,
  PRIMARY KEY (`boardinghouse_id`),
  INDEX `fk_BOARDING_HOUSE_BOADING_HOUSE_OWNERS1_idx` (`bho_id` ASC) VISIBLE,
  CONSTRAINT `fk_BOARDING_HOUSE_BOADING_HOUSE_OWNERS1`
    FOREIGN KEY (`bho_id`)
    REFERENCES `searchnstay_database`.`boarding_house_owners` (`bho_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `searchnstay_database`.`boarding_house_seekers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `searchnstay_database`.`boarding_house_seekers` (
  `seeker_id` INT NOT NULL AUTO_INCREMENT,
  `seeker_name` VARCHAR(100) NOT NULL,
  `seeker_username` VARCHAR(45) NOT NULL,
  `seeker_password` VARCHAR(255) NULL DEFAULT NULL,
  `google_id` VARCHAR(255) NULL DEFAULT NULL,
  `facebook_id` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`seeker_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `searchnstay_database`.`rooms`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `searchnstay_database`.`rooms` (
  `room_id` INT NOT NULL AUTO_INCREMENT,
  `boardinghouse_id` INT NOT NULL,
  `room_name` VARCHAR(45) NULL DEFAULT NULL,
  `room_description` MEDIUMTEXT NULL DEFAULT NULL,
  `room_type` VARCHAR(100) NULL DEFAULT NULL,
  `room_picture` MEDIUMBLOB NULL,
  `gender_allowed` VARCHAR(45) NULL DEFAULT NULL,
  `total_slots` INT NULL DEFAULT NULL,
  `occupied_slots` INT NULL DEFAULT NULL,
  PRIMARY KEY (`room_id`),
  INDEX `fk_ROOMS_BOARDING_HOUSE1_idx` (`boardinghouse_id` ASC) VISIBLE,
  CONSTRAINT `fk_ROOMS_BOARDING_HOUSE1`
    FOREIGN KEY (`boardinghouse_id`)
    REFERENCES `searchnstay_database`.`boarding_house` (`boardinghouse_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `searchnstay_database`.`bookmarks`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `searchnstay_database`.`bookmarks` (
  `bookmark_id` INT NOT NULL AUTO_INCREMENT,
  `bookmark_date` VARCHAR(45) NOT NULL,
  `bookmark_name` VARCHAR(50) NOT NULL,
  `bookmark_type` VARCHAR(45) NOT NULL,
  `seeker_id` INT NOT NULL,
  `room_id` INT NULL,
  `boardinghouse_id` INT NULL,
  PRIMARY KEY (`bookmark_id`),
  INDEX `fk_BOOKMARKS_BOARDING_HOUSE_SEEKERS_idx` (`seeker_id` ASC) VISIBLE,
  INDEX `fk_BOOKMARKS_ROOMS1_idx` (`room_id` ASC) VISIBLE,
  INDEX `fk_BOOKMARKS_BOARDING_HOUSE1_idx` (`boardinghouse_id` ASC) VISIBLE,
  CONSTRAINT `fk_BOOKMARKS_BOARDING_HOUSE1`
    FOREIGN KEY (`boardinghouse_id`)
    REFERENCES `searchnstay_database`.`boarding_house` (`boardinghouse_id`),
  CONSTRAINT `fk_BOOKMARKS_BOARDING_HOUSE_SEEKERS`
    FOREIGN KEY (`seeker_id`)
    REFERENCES `searchnstay_database`.`boarding_house_seekers` (`seeker_id`),
  CONSTRAINT `fk_BOOKMARKS_ROOMS1`
    FOREIGN KEY (`room_id`)
    REFERENCES `searchnstay_database`.`rooms` (`room_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `searchnstay_database`.`reviews`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `searchnstay_database`.`reviews` (
  `review_id` INT NOT NULL AUTO_INCREMENT,
  `review_text` VARCHAR(255) NOT NULL,
  `seeker_id` INT NOT NULL,
  `boardinghouse_id` INT NOT NULL,
  `reviewer_name` VARCHAR(100) NOT NULL,
  `review_date` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`review_id`),
  INDEX `fk_REVIEWS_BOARDING_HOUSE_SEEKERS1_idx` (`seeker_id` ASC) VISIBLE,
  INDEX `fk_REVIEWS_BOARDING_HOUSE1_idx` (`boardinghouse_id` ASC) VISIBLE,
  CONSTRAINT `fk_REVIEWS_BOARDING_HOUSE1`
    FOREIGN KEY (`boardinghouse_id`)
    REFERENCES `searchnstay_database`.`boarding_house` (`boardinghouse_id`),
  CONSTRAINT `fk_REVIEWS_BOARDING_HOUSE_SEEKERS1`
    FOREIGN KEY (`seeker_id`)
    REFERENCES `searchnstay_database`.`boarding_house_seekers` (`seeker_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `searchnstay_database`.`stars`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `searchnstay_database`.`stars` (
  `stars_id` INT NOT NULL AUTO_INCREMENT,
  `seeker_name` VARCHAR(100) NOT NULL,
  `seeker_id` INT NOT NULL,
  `boardinghouse_id` INT NOT NULL,
  PRIMARY KEY (`stars_id`),
  INDEX `fk_stars_boarding_house_seekers1_idx` (`seeker_id` ASC) VISIBLE,
  INDEX `fk_stars_boarding_house1_idx` (`boardinghouse_id` ASC) VISIBLE,
  CONSTRAINT `fk_stars_boarding_house_seekers1`
    FOREIGN KEY (`seeker_id`)
    REFERENCES `searchnstay_database`.`boarding_house_seekers` (`seeker_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_stars_boarding_house1`
    FOREIGN KEY (`boardinghouse_id`)
    REFERENCES `searchnstay_database`.`boarding_house` (`boardinghouse_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
