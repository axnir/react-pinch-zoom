# react-pinch-zoom

**English** | [中文](./README.zh-CN.md)

A simple pinch-zoom component for React, Support dragging and zooming elements.

## Install

```sh
pnpm add @lsbcc/react-pinch-zoom
```

## Usage

- `ZoomImage` Component

  Support dragging and zooming images.

```typescript
import { ZoomImage } from '@lsbcc/react-pinch-zoom';

function App() {
  const imgUrl = 'https://www.example.com/a.png';

  return (
    <ZoomImage
      style={{ width: '100vw' }}
      maxScale={10}
      minScale={0.5}
      src={imgUrl}
    />
  );
}

export default App;
```

## API

- `ZoomImage` Component

  |   Name   |        Description         |  Type  | Default |
  | :------: | :------------------------: | :----: | :-----: |
  |   src    |         Image path         | string |    -    |
  | maxScale | Maximum scale of the image | number |    3    |
  | minScale | Minimum scale of the image | number |    1    |
