import React, { useState } from 'react'
import '@google/model-viewer';
import { useParams } from 'next/navigation';
import { products } from '@/config/products';

interface ModelViewerProps {
  src: string;
  poster: string;
}

export const ModelViewer: React.FC<ModelViewerProps> = ({ src, poster }) => {
  const { id } = useParams();
  const product = products.find((product) => product.id === parseInt(id as string));

  // Avoid using hooks conditionally by defining them outside of conditionals
  const [loading3D, setLoading3D] = useState(true);

  if (!product) {
    return <p>Product not found</p>;
  }
  return (
    <div className="w-full flex items-center justify-center h-full">
      {loading3D && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-t-4 border-gray-200 rounded-full animate-spin"></div>
        </div>
      )}
      <model-viewer
        src={src}
        ar
        ar-modes="webxr scene-viewer quick-look"
        camera-controls
        tone-mapping="neutral"
        poster={poster}
        shadow-intensity="1"
        style={{ width: '100%', height: '350px' }}
        onLoad={() => setLoading3D(false)}
        className="w-full h-full"
      >
        <div className="progress-bar hide" slot="progress-bar">
          <div className="update-bar"></div>
        </div>
        <div id="ar-prompt" className="pt-0 px-10">
          <img src="https://modelviewer.dev/shared-assets/icons/hand.png" alt="AR Prompt" />
        </div>
      </model-viewer>
    </div>
  )
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': any
    }
  }
}