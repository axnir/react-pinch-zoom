interface PointType {
  x: number;
  y: number;
}

export interface RecordType {
  isPointerDown: boolean;
  pointers: PointerEvent[];
  point1: PointType;
  point2: PointType;
  lastPointerMove: PointType;
  lastPoint1: PointType;
  lastPoint2: PointType;
  lastCenter: PointType;
  diff: PointType;
  singlePoint: PointType;
  elementSize: { width: number; height: number };
  scale: number;
}

/**
 * 获取两点间距离
 * @param {PointType} a 第一个点坐标
 * @param {PointType} b 第二个点坐标
 * @returns {number} distance 距离
 */
export const getDistance = (a: PointType, b: PointType): number => {
  const x = a.x - b.x;
  const y = a.y - b.y;
  return Math.hypot(x, y);
};

/**
 * 获取中点坐标
 * @param {PointType} a 第一个点坐标
 * @param {PointType} b 第二个点坐标
 * @returns {PointType} center 中点坐标
 */
export const getCenter = (a: PointType, b: PointType): PointType => {
  const x = (a.x + b.x) / 2;
  const y = (a.y + b.y) / 2;
  return { x, y };
};

/**
 * 获取元素尺寸
 * @param {HTMLElement} element 元素
 * @returns
 */
export const getElementSize = (
  element: HTMLElement
): {
  width: number;
  height: number;
} => {
  const { width, height } = element.getBoundingClientRect();
  return { width, height };
};

/**
 * 创建一个新的 Record 对象
 * @param element 元素
 * @returns RecordType
 */
export const createRecord = (element: HTMLElement): RecordType => {
  const elementSize = getElementSize(element);

  return {
    isPointerDown: false,
    pointers: [],
    point1: { x: 0, y: 0 },
    point2: { x: 0, y: 0 },
    lastPointerMove: { x: 0, y: 0 },
    lastPoint1: { x: 0, y: 0 },
    lastPoint2: { x: 0, y: 0 },
    lastCenter: { x: 0, y: 0 },
    diff: { x: 0, y: 0 },
    singlePoint: { x: 0, y: 0 },
    scale: 1,
    elementSize,
  };
};
