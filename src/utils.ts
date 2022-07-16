interface PointType {
  x: number;
  y: number;
}

export interface RecordType {
  /** 是否按下 */
  isPointerDown: boolean;
  /** 指针数组 */
  pointers: PointerEvent[];
  /** 第一个指针点坐标 */
  point1: PointType;
  /** 第二个指针点坐标 */
  point2: PointType;
  /** 用于 diff 的计算 */
  lastPointerMove: PointType;
  /** 上次第一个指针点坐标 */
  lastPoint1: PointType;
  /** 上次第二个指针点坐标 */
  lastPoint2: PointType;
  /** 上次中心点的位置 */
  lastCenter: PointType;
  /** 相对于上一次 pointermove 移动差值 */
  diff: PointType;
  /** 单击时的位置 */
  singlePoint: PointType;
  /** 保存宽高尺寸 */
  size: { width: number; height: number };
  /** 默认缩放比 */
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

/** 创建初始信息 */
export const createRecord = (element: HTMLElement): RecordType => {
  const size = getElementSize(element);

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
    size,
  };
};
