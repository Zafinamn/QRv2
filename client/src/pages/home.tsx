import { useState, useRef, useCallback } from "react";
import QRConfigurationPanel from "@/components/qr-configuration-panel";
import QRPreviewPanel from "@/components/qr-preview-panel";

export interface QRConfig {
  content: string;
  size: number;
  errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H';
  pixelDensity: number;
  transparentBackground: boolean;
}

export default function Home() {
  const [qrConfig, setQRConfig] = useState<QRConfig>({
    content: 'https://example.com',
    size: 256,
    errorCorrectionLevel: 'M',
    pixelDensity: 8,
    transparentBackground: false
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const updateConfig = useCallback((updates: Partial<QRConfig>) => {
    setQRConfig(prev => ({ ...prev, ...updates }));
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-primary text-primary-foreground p-2 rounded-lg">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 11h8V3H3v8zm2-6h4v4H5V5zM3 21h8v-8H3v8zm2-6h4v4H5v-4zM13 3v8h8V3h-8zm6 6h-4V5h4v4zM19 13h2v2h-2v-2zM13 13h2v2h-2v-2zM15 15h2v2h-2v-2zM13 17h2v2h-2v-2zM15 19h2v2h-2v-2zM17 15h2v2h-2v-2zM19 17h2v2h-2v-2zM17 13h2v2h-2v-2z"/>
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">QR Generator</h1>
                <p className="text-muted-foreground text-sm">Professional QR code creation tool</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">High-quality PNG export</span>
              <div className="h-4 w-px bg-border"></div>
              <span className="text-sm text-muted-foreground">Transparent backgrounds</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <QRConfigurationPanel 
            config={qrConfig} 
            onConfigChange={updateConfig} 
          />
          <QRPreviewPanel 
            config={qrConfig} 
            canvasRef={canvasRef} 
          />
        </div>
        
        {/* Features Section */}
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">Powerful QR Generation Features</h2>
            <p className="text-muted-foreground">Everything you need for professional QR code creation</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-card border border-border rounded-lg p-6 text-center shadow-sm">
              <div className="bg-primary/10 text-primary w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.828 14.828a4 4 0 010-5.656l-1.414-1.414a6 6 0 000 8.485l1.414-1.415zm4.242 4.242a8 8 0 000-11.314l-1.414 1.414a6 6 0 010 8.486l1.414 1.414zm-12.728 0l1.414-1.414a6 6 0 010-8.486l-1.414-1.414a8 8 0 000 11.314zm2.828-2.828a4 4 0 010-5.656l1.414-1.414a6 6 0 000 8.485l-1.414-1.415z"/>
                </svg>
              </div>
              <h3 className="font-semibold text-foreground mb-2">Instant Generation</h3>
              <p className="text-sm text-muted-foreground">Real-time QR code generation as you type with immediate visual feedback</p>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-6 text-center shadow-sm">
              <div className="bg-primary/10 text-primary w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h3 className="font-semibold text-foreground mb-2">Transparent Backgrounds</h3>
              <p className="text-sm text-muted-foreground">Export QR codes with transparent backgrounds for seamless integration</p>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-6 text-center shadow-sm">
              <div className="bg-primary/10 text-primary w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 15.5A3.5 3.5 0 018.5 12A3.5 3.5 0 0112 8.5a3.5 3.5 0 013.5 3.5 3.5 3.5 0 01-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97s-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0014 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1s.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66Z"/>
                </svg>
              </div>
              <h3 className="font-semibold text-foreground mb-2">Customizable Settings</h3>
              <p className="text-sm text-muted-foreground">Adjust size, error correction, and pixel density for optimal results</p>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-6 text-center shadow-sm">
              <div className="bg-primary/10 text-primary w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11H16V18H8V11H9.2V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.4,8.7 10.4,10V11H13.6V10C13.6,8.7 12.8,8.2 12,8.2Z"/>
                </svg>
              </div>
              <h3 className="font-semibold text-foreground mb-2">Error Correction</h3>
              <p className="text-sm text-muted-foreground">Multiple error correction levels ensure reliable scanning even when damaged</p>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-6 text-center shadow-sm">
              <div className="bg-primary/10 text-primary w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                </svg>
              </div>
              <h3 className="font-semibold text-foreground mb-2">High-Quality PNG</h3>
              <p className="text-sm text-muted-foreground">Export crisp, scalable PNG files perfect for print and digital use</p>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-6 text-center shadow-sm">
              <div className="bg-primary/10 text-primary w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17,19H7V5H17M17,1H7C5.89,1 5,1.89 5,3V21C5,22.11 5.89,23 7,23H17C18.11,23 19,22.11 19,21V3C19,1.89 18.11,1 17,1Z"/>
                </svg>
              </div>
              <h3 className="font-semibold text-foreground mb-2">Mobile Optimized</h3>
              <p className="text-sm text-muted-foreground">Responsive design works perfectly on all devices and screen sizes</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-16 py-8 bg-card">
        <div className="container mx-auto px-6 text-center">
          <p className="text-muted-foreground text-sm">
            © 2024 QR Generator. Professional QR code generation tool for all your needs.
          </p>
        </div>
      </footer>
    </div>
  );
}
