import { useEffect, useState, RefObject } from "react";
import { QRConfig } from "@/pages/home";
import { Button } from "@/components/ui/button";
import QRCode from "qrcode";

interface QRPreviewPanelProps {
  config: QRConfig;
  canvasRef: RefObject<HTMLCanvasElement>;
}

export default function QRPreviewPanel({ config, canvasRef }: QRPreviewPanelProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [fileSize, setFileSize] = useState("~2.1 KB");

  useEffect(() => {
    generateQRCode();
  }, [config]);

  const generateQRCode = async () => {
    if (!config.content.trim() || !canvasRef.current) {
      return;
    }

    setIsGenerating(true);

    try {
      await QRCode.toCanvas(canvasRef.current, config.content, {
        width: config.size,
        margin: 2,
        color: {
          dark: '#000000',
          light: config.transparentBackground ? '#00000000' : '#FFFFFF'
        },
        errorCorrectionLevel: config.errorCorrectionLevel
      });

      // Estimate file size
      const canvas = canvasRef.current;
      const dataURL = canvas.toDataURL('image/png');
      const base64Length = dataURL.split(',')[1].length;
      const sizeInBytes = (base64Length * 3) / 4;
      const sizeInKB = Math.round(sizeInBytes / 1024);
      setFileSize(`~${sizeInKB < 1 ? '< 1' : sizeInKB} KB`);
    } catch (error) {
      console.error('QR Generation Error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadQR = () => {
    if (!config.content.trim() || !canvasRef.current) {
      alert('Please enter content to generate QR code');
      return;
    }

    const link = document.createElement('a');
    link.download = `qr-code-${Date.now()}.png`;
    link.href = canvasRef.current.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <svg className="w-5 h-5 text-primary mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
          </svg>
          Live Preview
        </h2>
        
        {/* QR Code Preview */}
        <div 
          className="qr-preview-container p-8 mb-4 min-h-[320px] flex items-center justify-center rounded-lg"
          style={{
            background: `repeating-conic-gradient(hsl(var(--muted)) 0% 25%, transparent 0% 50%) 50% / 20px 20px`
          }}
        >
          <div className="text-center">
            <canvas 
              ref={canvasRef}
              width={config.size} 
              height={config.size} 
              className="mx-auto shadow-lg rounded-lg bg-white"
              data-testid="canvas-qr-preview"
            />
            {isGenerating && (
              <div className="mt-4 text-muted-foreground text-sm" data-testid="text-generating">
                <svg className="w-4 h-4 animate-spin inline mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z"/>
                </svg>
                Generating QR code...
              </div>
            )}
          </div>
        </div>
        
        {/* QR Code Info */}
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div className="bg-muted rounded-md p-3">
            <div className="text-muted-foreground">Dimensions</div>
            <div className="font-semibold" data-testid="text-qr-dimensions">
              {config.size} × {config.size}px
            </div>
          </div>
          <div className="bg-muted rounded-md p-3">
            <div className="text-muted-foreground">File Size</div>
            <div className="font-semibold" data-testid="text-qr-filesize">
              {fileSize}
            </div>
          </div>
        </div>
        
        {/* Download Button */}
        <Button 
          onClick={downloadQR}
          className="w-full"
          size="lg"
          data-testid="button-download-qr"
        >
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z"/>
          </svg>
          Download PNG
        </Button>
        
        <div className="mt-3 text-center">
          <p className="text-xs text-muted-foreground">
            High-quality PNG with your selected settings
          </p>
        </div>
      </div>
      
      {/* Usage Statistics */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
        <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center">
          <svg className="w-4 h-4 text-primary mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M22,21H2V3H4V19H6V10H10V19H12V6H16V19H18V14H22V21Z"/>
          </svg>
          Quick Stats
        </h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-primary">∞</div>
            <div className="text-xs text-muted-foreground">QR Codes Generated</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary">100%</div>
            <div className="text-xs text-muted-foreground">Success Rate</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary">&lt;1s</div>
            <div className="text-xs text-muted-foreground">Avg Generation Time</div>
          </div>
        </div>
      </div>
    </div>
  );
}
