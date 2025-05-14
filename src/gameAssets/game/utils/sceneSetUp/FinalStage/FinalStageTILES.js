export const INIT_TILES_FST = [
    // Plataforma inicial
    { type: 'grassLeftHEL', x: 0, y: 600 - 64 },
    { type: 'grassMidHEL', x: 64, y: 600 - 64 },
    { type: 'grassMidHEL', x: 128, y: 600 - 64 },
    { type: 'grassMidHEL', x: 192, y: 600 - 64 },
    { type: 'grassRightHEL', x: 256, y: 600 - 64 },
    
    // Salto desafiante a plataforma pequeña
    { type: 'grassLeftHEL', x: 384, y: 600 - 128 },
    { type: 'grassRightHEL', x: 448, y: 600 - 128 },
    { type: 'grassMidHEL', x: 512, y: 600 - 64 },
    
    // Serie de plataformas pequeñas con saltos difíciles
    { type: 'grassLeftHEL', x: 576, y: 600 - 128 },
    { type: 'grassRightHEL', x: 640, y: 600 - 128 },
    
    { type: 'grassLeftHEL', x: 768, y: 600 - 192 },
    { type: 'grassRightHEL', x: 832, y: 600 - 192 },
    
    // Plataforma elevada desafiante
    { type: 'grassLeftHEL', x: 960, y: 600 - 256 },
    { type: 'grassMidHEL', x: 1024, y: 600 - 256 },
    { type: 'grassRightHEL', x: 1088, y: 600 - 256 },
    
    // Descenso rápido
    { type: 'grassLeftHEL', x: 1216, y: 600 - 128 },
    { type: 'grassRightHEL', x: 1280, y: 600 - 128 },
    
    // Plataforma más baja para descanso
    { type: 'grassLeftHEL', x: 1408, y: 600 - 64 },
    { type: 'grassMidHEL', x: 1472, y: 600 - 64 },
    { type: 'grassMidHEL', x: 1536, y: 600 - 64 },
    { type: 'grassRightHEL', x: 1600, y: 600 - 64 },
    
    // Sección de ascenso vertical - nivel 1
    { type: 'grassLeftHEL', x: 1728, y: 600 - 128 },
    { type: 'grassRightHEL', x: 1792, y: 600 - 128 },
    
    // Sección de ascenso vertical - nivel 2
    { type: 'grassLeftHEL', x: 1856, y: 600 - 192 },
    { type: 'grassRightHEL', x: 1920, y: 600 - 192 },
    
    // Sección de ascenso vertical - nivel 3
    { type: 'grassLeftHEL', x: 1984, y: 600 - 256 },
    { type: 'grassRightHEL', x: 2048, y: 600 - 256 },
    
    // Sección de ascenso vertical - nivel 4 (máxima altura)
    { type: 'grassLeftHEL', x: 2112, y: 600 - 320 },
    { type: 'grassRightHEL', x: 2176, y: 600 - 320 },
    
    // Plataforma alta extendida
    { type: 'grassLeftHEL', x: 2304, y: 600 - 384 },
    { type: 'grassMidHEL', x: 2368, y: 600 - 384 },
    { type: 'grassMidHEL', x: 2432, y: 600 - 384 },
    { type: 'grassRightHEL', x: 2496, y: 600 - 384 },
    
    // Sección de saltos largos en altura
    { type: 'grassLeftHEL', x: 2688, y: 600 - 320 },
    { type: 'grassRightHEL', x: 2752, y: 600 - 320 },
    
    { type: 'grassLeftHEL', x: 2944, y: 600 - 256 },
    { type: 'grassRightHEL', x: 3008, y: 600 - 256 },
    
    { type: 'grassLeftHEL', x: 3200, y: 600 - 256 },
    { type: 'grassRightHEL', x: 3264, y: 600 - 256 },
    
    // Plataforma con descenso en zig-zag
    { type: 'grassLeftHEL', x: 3456, y: 600 - 256 },
    { type: 'grassMidHEL', x: 3520, y: 600 - 256 },
    { type: 'grassRightHEL', x: 3584, y: 600 - 256 },
    
    // Descenso en zig-zag - nivel 1
    { type: 'grassLeftHEL', x: 3712, y: 600 - 192 },
    { type: 'grassRightHEL', x: 3776, y: 600 - 192 },
    
    // Descenso en zig-zag - nivel 2
    { type: 'grassLeftHEL', x: 3904, y: 600 - 192 },
    { type: 'grassRightHEL', x: 3968, y: 600 - 192 },
    
    // Descenso en zig-zag - nivel 3
    { type: 'grassLeftHEL', x: 4096, y: 600 - 128 },
    { type: 'grassRightHEL', x: 4160, y: 600 - 128 },
    
    // Sección de plataformas flotantes
    { type: 'grassLeftHEL', x: 4288, y: 600 - 192 },
    { type: 'grassRightHEL', x: 4352, y: 600 - 192 },
    { type: 'grassMidHEL', x: 4416, y: 600 - 128 },
    { type: 'grassLeftHEL', x: 4480, y: 600 - 192 },
    { type: 'grassRightHEL', x: 4544, y: 600 - 192 },
    
    { type: 'grassLeftHEL', x: 4672, y: 600 - 256 },
    { type: 'grassRightHEL', x: 4736, y: 600 - 256 },
    
    // Plataforma alta final antes del descenso
    { type: 'grassLeftHEL', x: 4864, y: 600 - 256 },
    { type: 'grassMidHEL', x: 4928, y: 600 - 256 },
    { type: 'grassMidHEL', x: 4992, y: 600 - 256 },
    { type: 'grassRightHEL', x: 5056, y: 600 - 256 },
    
    // Descenso hacia el área del jefe - nivel 1
    { type: 'grassLeftHEL', x: 5184, y: 600 - 192 },
    { type: 'grassMidHEL', x: 5248, y: 600 - 192 },
    { type: 'grassRightHEL', x: 5312, y: 600 - 192 },
    { type: 'grassRightHEL', x: 5312, y: 600 - 128 },

    //Plataforma del jefe
    { type: 'grassMidHEL', x: 5376, y: 600 - 64 },
    { type: 'grassMidHEL', x: 5440, y: 600 - 64 },
    { type: 'grassMidHEL', x: 5504, y: 600 - 64 },
    { type: 'grassMidHEL', x: 5568, y: 600 - 64 },
    { type: 'grassMidHEL', x: 5632, y: 600 - 64 },
    { type: 'grassMidHEL', x: 5696, y: 600 - 64 },
    { type: 'grassMidHEL', x: 5760, y: 600 - 64 },
    { type: 'grassMidHEL', x: 5824, y: 600 - 64 },
    { type: 'grassMidHEL', x: 5888, y: 600 - 64 },
    { type: 'grassMidHEL', x: 5952, y: 600 - 64 },
    { type: 'grassMidHEL', x: 6016, y: 600 - 64 },
    { type: 'grassMidHEL', x: 6080, y: 600 - 64 },
];