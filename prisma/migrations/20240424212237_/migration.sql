-- DropIndex
DROP INDEX `Imagenes_propiedadId_fkey` ON `imagenes`;

-- DropIndex
DROP INDEX `Localidades_provinciaId_fkey` ON `localidades`;

-- DropIndex
DROP INDEX `Propiedades_usuarioId_fkey` ON `propiedades`;

-- DropIndex
DROP INDEX `Provincias_paisId_fkey` ON `provincias`;

-- DropIndex
DROP INDEX `Ubicaciones_localidadId_fkey` ON `ubicaciones`;

-- DropIndex
DROP INDEX `Usuario_empresaId_fkey` ON `usuario`;

-- CreateTable
CREATE TABLE `Account` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `provider` VARCHAR(191) NOT NULL,
    `providerAccountId` VARCHAR(191) NOT NULL,
    `refresh_token` TEXT NULL,
    `access_token` TEXT NULL,
    `expires_at` INTEGER NULL,
    `token_type` VARCHAR(191) NULL,
    `scope` VARCHAR(191) NULL,
    `id_token` TEXT NULL,
    `session_state` VARCHAR(191) NULL,
    `refresh_token_expires_in` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Account_userId_key`(`userId`),
    INDEX `Account_userId_idx`(`userId`),
    UNIQUE INDEX `Account_provider_providerAccountId_key`(`provider`, `providerAccountId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `username` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `emailVerified` DATETIME(3) NULL,
    `image` VARCHAR(191) NULL,
    `password` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_username_key`(`username`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Usuario` ADD CONSTRAINT `Usuario_empresaId_fkey` FOREIGN KEY (`empresaId`) REFERENCES `Empresa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Provincias` ADD CONSTRAINT `Provincias_paisId_fkey` FOREIGN KEY (`paisId`) REFERENCES `Paises`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Localidades` ADD CONSTRAINT `Localidades_provinciaId_fkey` FOREIGN KEY (`provinciaId`) REFERENCES `Provincias`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ubicaciones` ADD CONSTRAINT `Ubicaciones_localidadId_fkey` FOREIGN KEY (`localidadId`) REFERENCES `Localidades`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ubicaciones` ADD CONSTRAINT `Ubicaciones_propiedadId_fkey` FOREIGN KEY (`propiedadId`) REFERENCES `Propiedades`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Propiedades` ADD CONSTRAINT `Propiedades_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Imagenes` ADD CONSTRAINT `Imagenes_propiedadId_fkey` FOREIGN KEY (`propiedadId`) REFERENCES `Propiedades`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Account` ADD CONSTRAINT `Account_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PropiedadesToServicios` ADD CONSTRAINT `_PropiedadesToServicios_A_fkey` FOREIGN KEY (`A`) REFERENCES `Propiedades`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PropiedadesToServicios` ADD CONSTRAINT `_PropiedadesToServicios_B_fkey` FOREIGN KEY (`B`) REFERENCES `Servicios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
