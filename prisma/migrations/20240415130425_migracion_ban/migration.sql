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
ALTER TABLE `_PropiedadesToServicios` ADD CONSTRAINT `_PropiedadesToServicios_A_fkey` FOREIGN KEY (`A`) REFERENCES `Propiedades`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PropiedadesToServicios` ADD CONSTRAINT `_PropiedadesToServicios_B_fkey` FOREIGN KEY (`B`) REFERENCES `Servicios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
