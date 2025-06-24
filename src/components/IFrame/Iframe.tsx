// Iframe.js
import React, { ReactNode, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

interface IframeProps extends React.IframeHTMLAttributes<HTMLIFrameElement> {
    children: ReactNode;
    styles:any;
}

const Iframe: React.FC<IframeProps> = ({ children, ...props }) => {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const styles: React.CSSProperties = (props as any).styles;
  
    useEffect(() => {
      if (iframeRef.current) {
        const iframeDocument = iframeRef.current.contentDocument;
        if (iframeDocument) {
          iframeDocument.open();
          iframeDocument.close();
  
          const mountNode = iframeDocument.body;
  
          ReactDOM.render(children as any, mountNode);
  
          return () => {
            ReactDOM.unmountComponentAtNode(mountNode);
          };
        }
      }
    });
  
    return <iframe ref={iframeRef} style={styles} />;
  };
  
  export default Iframe;