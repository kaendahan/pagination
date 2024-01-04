# @kaendahan/react-pagination

**Versi Terbaru:** [![npm version](https://badge.fury.io/js/%40kaendahan%2Freact-pagination.svg)](https://www.npmjs.com/package/@kaendahan/react-pagination)

Paket paginasi React yang menggunakan Tailwind CSS. Memerlukan Tailwind CSS minimal versi 3.4.0 dan React versi minimal 18.2.0.

## Instalasi

```bash
npm install @kaendahan/react-pagination
```

Untuk menggunakan paket ini, pastikan Anda sudah menginstal Tailwind CSS. Untuk panduan instalasi Tailwind CSS dengan versi minimal 3.4.0, silakan lihat [dokumentasi resmi Tailwind CSS](https://tailwindcss.com/docs/installation/framework-guides) untuk informasi lebih lanjut.

## Penggunaan

```javascript
import { Pagination, PaginationSimple } from '@kaendahan/react-pagination';

// Contoh Penggunaan
const MyComponent = () => {
  return (
    <div>
      <Pagination total={100} current={1} onChangePage={(page, pageSize) => console.log(page, pageSize)} />
      <!-- atau -->
      <PaginationSimple total={50} current={2} />
    </div>
  );
};
```

## Properti

### Pagination

```javascript
interface PaginationProps extends IPaginationBaseProps {
    skipPage?: number;
}
```

### PaginationSimple

```javascript
interface IPaginationBaseProps extends PaginationVariantProps {
    disabled?: boolean;
    size?: TSize;
    shape?: TShape;
    className?: string;
    total?: number;
    current?: number;
    pageSize?: number;
    onChangePage?: (page: number, pageSize: number) => void;
    itemRender?: (page: number, type: "page" | "prev" | "next" | "skip-prev" | "skip-next", element: ReactNode) => ReactNode;
}

interface PaginationProps extends IPaginationBaseProps {
    skipPage?: number;
}
```

## Konfigurasi Tailwind CSS

```javascript
import color from "tailwindcss/colors";

export default {
  content: [
    // ... Other code lines
    "node_modules/@kaendahan/react-pagination/*.js"
    // ... Other code LINES
    ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: color.blue[700],
          light: color.blue[50],
          emphasis: color.white,
        },
        secondary: {
          DEFAULT: color.gray[800],
          emphasis: color.white,
        },
        gray: {
          DEFAULT: color.gray[700],
          subtle: color.gray[400],
        },
      },
    },
  },
  plugins: [],
};
```

## Lisensi

MIT License