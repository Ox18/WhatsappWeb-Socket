-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema uni
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema uni
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `uni` DEFAULT CHARACTER SET utf8 ;
USE `uni` ;

-- -----------------------------------------------------
-- Table `uni`.`asesors`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `uni`.`asesors` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(270) NULL DEFAULT NULL,
  `lastname` VARCHAR(270) NULL DEFAULT NULL,
  `email` VARCHAR(170) NULL DEFAULT NULL,
  `cip` VARCHAR(120) NULL DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `uni`.`chats`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `uni`.`chats` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `author` VARCHAR(170) NULL DEFAULT NULL,
  `phone` VARCHAR(120) NULL DEFAULT NULL,
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status` VARCHAR(45) NULL DEFAULT 'talking',
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `uni`.`messages`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `uni`.`messages` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `message` VARCHAR(270) NULL DEFAULT NULL,
  `chatID` INT(11) NULL DEFAULT NULL,
  `type` VARCHAR(20) NULL DEFAULT NULL,
  `author` VARCHAR(170) NULL DEFAULT NULL,
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 35
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
