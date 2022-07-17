import Zoom, { ZoomInterface } from './zoom';
import { CSSProperties, FC, PointerEvent, useEffect, useRef } from 'react';

type Props = Pick<ZoomInterface, 'maxScale' | 'minScale'> & {
  src: string;
  style?: CSSProperties;
  className?: string;
};

const ZoomImage: FC<Props> = ({
  src,
  maxScale = 3,
  minScale = 1,
  className,
  style,
}) => {
  const zoomRef = useRef<Zoom>();
  const imageRef = useRef<HTMLImageElement>(null);

  const imgStyle = { ...style, touchAction: 'none' };

  const initialZoom = (): void => {
    if (imageRef.current) {
      zoomRef.current = new Zoom({
        maxScale,
        minScale,
        element: imageRef.current,
      });
    }
  };

  const handlePointerDown = (e: PointerEvent): void => {
    if (!zoomRef.current) {
      return;
    }

    zoomRef.current.handlePointerDown(e.nativeEvent);
  };

  const handlePointerMove = (e: PointerEvent): void => {
    if (!zoomRef.current) {
      return;
    }

    zoomRef.current.handlePointerMove(e.nativeEvent);
  };

  const handlePointerUp = (e: PointerEvent): void => {
    if (!zoomRef.current) {
      return;
    }

    zoomRef.current.handlePointerUp(e.nativeEvent);
  };

  const handlePointerCancel = (): void => {
    if (!zoomRef.current) {
      return;
    }

    zoomRef.current.handlePointerCancel();
  };

  useEffect(() => {
    initialZoom();
  }, []);

  return (
    <img
      src={src}
      ref={imageRef}
      style={imgStyle}
      className={className}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
    />
  );
};

export default ZoomImage;
