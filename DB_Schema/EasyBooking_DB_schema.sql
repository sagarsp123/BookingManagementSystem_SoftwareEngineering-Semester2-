-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema Easy_Booking
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema Easy_Booking
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `Easy_Booking` ;
USE `Easy_Booking` ;

-- -----------------------------------------------------
-- Table `Easy_Booking`.`USER_CRED`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Easy_Booking`.`USER_CRED` (
  `USER_ID` INT NOT NULL AUTO_INCREMENT,
  `USERNAME` VARCHAR(16) NOT NULL,
  `PASSWORD` VARCHAR(32) NOT NULL,
  `EMAIL` VARCHAR(255) NULL,
  `ADDRESS` VARCHAR(255) NULL,
  `MOBILE_NUM` VARCHAR(45) NULL,
  `SEC_Q_1` VARCHAR(255) NULL COMMENT 'Security Question 1',
  `SEC_Q_2` VARCHAR(255) NULL,
  `SEC_A_1` VARCHAR(100) NULL,
  `SEC_A_2` VARCHAR(100) NULL,
  PRIMARY KEY (`USER_ID`),
  UNIQUE INDEX `USERNAME_UNIQUE` (`USERNAME` ASC) VISIBLE,
  UNIQUE INDEX `EMAIL_UNIQUE` (`EMAIL` ASC) VISIBLE,
  UNIQUE INDEX `MOBILE_NUM_UNIQUE` (`MOBILE_NUM` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Easy_Booking`.`USER_INFO`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Easy_Booking`.`USER_INFO` (
  `USER_ID` INT NOT NULL,
  `FIRST_NAME` VARCHAR(50) NULL,
  `LAST_NAME` VARCHAR(50) NULL,
  `AGE` INT NULL,
  `GENDER` VARCHAR(15) NULL,
  PRIMARY KEY (`USER_ID`),
  CONSTRAINT `FK_USER_ID_1`
    FOREIGN KEY (`USER_ID`)
    REFERENCES `Easy_Booking`.`USER_CRED` (`USER_ID`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Easy_Booking`.`USER_PAYMENT_INFO`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Easy_Booking`.`USER_PAYMENT_INFO` (
  `USER_ID` INT NOT NULL,
  `CARD_TYPE` VARCHAR(30) NOT NULL,
  `CARD_NUM` VARCHAR(100) NOT NULL,
  `EXP_DATE` VARCHAR(4) NOT NULL,
  `CCV` VARCHAR(3) NOT NULL,
  `COUNTRY` VARCHAR(100) NOT NULL,
  `ZIPCODE` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`USER_ID`),
  CONSTRAINT `FK_USER_ID_2`
    FOREIGN KEY (`USER_ID`)
    REFERENCES `Easy_Booking`.`USER_CRED` (`USER_ID`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Easy_Booking`.`HOTELS`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Easy_Booking`.`HOTELS` (
  `HOTEL_NAME` VARCHAR(50) NOT NULL,
  `HOTEL_CITY` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`HOTEL_NAME`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Easy_Booking`.`LISTINGS`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Easy_Booking`.`LISTINGS` (
  `ROOM_ID` INT NOT NULL AUTO_INCREMENT,
  `HOTEL_NAME` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`ROOM_ID`),
  INDEX `HOTEL_NAME_idx` (`HOTEL_NAME` ASC) VISIBLE,
  CONSTRAINT `FK_HOTEL_NAME_1`
    FOREIGN KEY (`HOTEL_NAME`)
    REFERENCES `Easy_Booking`.`HOTELS` (`HOTEL_NAME`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Easy_Booking`.`BOOKINGS`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Easy_Booking`.`BOOKINGS` (
  `BOOKING_ID` INT NOT NULL AUTO_INCREMENT,
  `ROOM_ID` INT NOT NULL,
  `USER_ID` INT NOT NULL,
  `TIMESTAMP` TIMESTAMP(2) NOT NULL DEFAULT CURRENT_TIMESTAMP(2) ON UPDATE CURRENT_TIMESTAMP(2),
  `DATE_START` DATE NOT NULL,
  `DATE_END` DATE NOT NULL,
  `SALE_AMOUNT` DECIMAL(10,2) NOT NULL COMMENT 'Amount charged to customer for booking',
  PRIMARY KEY (`BOOKING_ID`),
  INDEX `USER_ID_idx` (`USER_ID` ASC) VISIBLE,
  UNIQUE INDEX `TIMESTAMP_UNIQUE` (`TIMESTAMP` ASC) VISIBLE,
  CONSTRAINT `FK_ROOM_ID_1`
    FOREIGN KEY (`ROOM_ID`)
    REFERENCES `Easy_Booking`.`LISTINGS` (`ROOM_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_USER_ID_3`
    FOREIGN KEY (`USER_ID`)
    REFERENCES `Easy_Booking`.`USER_CRED` (`USER_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
