import React from 'react';

const SOURCES = {
    horizontal: {
        color: '/img/logo_h.png',
        inverse: '/img/logo_h_branco.png',
    },
    vertical: {
        color: '/img/logo_v.png',
        inverse: '/img/logo_v_branco.png',
    },
};

/**
 * Componente principal de logo.
 * - variant="horizontal" (padrão) | "vertical"
 * - inverse=true  → versão branca (para fundos escuros)
 * - Padrão: horizontal → height:40px / width:auto (proporcional)
 *           vertical   → width:auto / height:100%
 * - Use style={{ height, width }} para sobrescrever quando necessário
 */
export function Brand({ variant = 'horizontal', inverse = false, className = '', style = {}, alt }) {
    const src = SOURCES[variant]?.[inverse ? 'inverse' : 'color'] ?? SOURCES.horizontal.color;
    const altText = alt ?? 'IFCE – Campus Sobral';

    const base = variant === 'vertical'
        ? { width: 'auto', height: '100%', maxWidth: '100%', display: 'block' }
        : { height: 40, width: 'auto', maxWidth: '100%', display: 'block' };

    return (
        <img
            src={src}
            alt={altText}
            className={className}
            style={{ ...base, ...style }}
        />
    );
}

/** Logo completa (símbolo + texto) — alias de Brand para compatibilidade. */
export function BrandLockup({ variant = 'horizontal', compact = false, inverse = false, className = '', style = {} }) {
    const resolvedVariant = compact ? 'vertical' : variant;
    return (
        <Brand
            variant={resolvedVariant}
            inverse={inverse}
            className={className}
            style={style}
        />
    );
}

/** Apenas o símbolo (ícone). Usa o arquivo icon.png com tamanho fixo. */
export function BrandSymbol({ size = 40, inverse = false, className = '', style = {} }) {
    return (
        <img
            src={inverse ? '/img/logo_horizontal_branco_h40.png' : '/img/icon.png'}
            alt="IFCE"
            className={className}
            style={{ width: size, height: size, objectFit: 'contain', display: 'block', ...style }}
        />
    );
}

export default Brand;
