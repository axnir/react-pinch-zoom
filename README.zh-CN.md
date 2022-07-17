# react-pinch-zoom

**中文** | [English](./README.md)

一款用于双指缩放的 React 组件，支持缩放、拖动元素。

## 安装

```sh
pnpm add @lsbcc/react-pinch-zoom
```

## 使用

- `ZoomImage` 组件

  支持对图片进行拖动或者缩放。

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

- `ZoomImage` 组件

  |   字段   |    描述    |  类型  | 默认值 |
  | :------: | :--------: | :----: | :----: |
  |   src    |  图片地址  | string |   -    |
  | maxScale | 最大缩放比 | number |   3    |
  | minScale | 最小缩放比 | number |   1    |
