import React, { useState, useRef, useEffect } from 'react';

const DraggableWindow = ({ title = 'Window', width = 300, height = 200, children } : any) => {
  const windowRef = useRef(null);

  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });

  const [collapsed, setCollapsed] = useState(false);
  const [closed, setClosed] = useState(false);

  const onDragMouseDown = (e : React.MouseEvent) => {
    e.preventDefault();
    setDragging(true);
    dragStart.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  useEffect(() => {
    const onMouseMove = (e : React.MouseEvent) => {
      if (dragging) {
        setPosition({
          x: e.clientX - dragStart.current.x,
          y: e.clientY - dragStart.current.y,
        });
      }
    };

    const onMouseUp = () => {
      setDragging(false);
    };

    window.addEventListener('mousemove', onMouseMove as any);
    window.addEventListener('mouseup', onMouseUp as any);

    return () => {
      window.removeEventListener('mousemove', onMouseMove as any);
      window.removeEventListener('mouseup', onMouseUp as any);
    };
  }, [dragging]);

  if (closed) return null;

  return (
    <div
      ref={windowRef}
      style={{
        position: 'fixed',
        top: position.y,
        left: position.x,
        width,
        boxShadow: '0 0 10px rgba(0,0,0,0.2)',
        borderRadius: 6,
        background: 'white',
        userSelect: dragging ? 'none' : 'auto',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        onMouseDown={onDragMouseDown}
        style={{
          padding: '8px 12px',
          backgroundColor: '#4f46e5',
          color: 'white',
          cursor: 'grab',
          borderTopLeftRadius: 6,
          borderTopRightRadius: 6,
          fontWeight: 'bold',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          userSelect: 'none',
        }}
      >
        <span>{title}</span>

        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={() => setCollapsed((c) => !c)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              fontSize: 18,
              lineHeight: 1,
              userSelect: 'none',
            }}
            aria-label={collapsed ? 'Expand window' : 'Collapse window'}
            onMouseDown={(e) => e.stopPropagation()} // prevent drag on button click
          >
            {collapsed ? '▸' : '▾'}
          </button>

          <button
            onClick={() => setClosed(true)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              fontSize: 18,
              lineHeight: 1,
              userSelect: 'none',
              fontWeight: 'bold',
            }}
            aria-label="Close window"
            onMouseDown={(e) => e.stopPropagation()} // prevent drag on button click
          >
            ×
          </button>
        </div>
      </div>

      {!collapsed && (
        <div
          style={{
            padding: 12,
            overflow: 'auto',
            maxHeight: height,
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default DraggableWindow;