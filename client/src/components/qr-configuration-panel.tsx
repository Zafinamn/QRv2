import { QRConfig } from "@/pages/home";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";

interface QRConfigurationPanelProps {
  config: QRConfig;
  onConfigChange: (updates: Partial<QRConfig>) => void;
}

export default function QRConfigurationPanel({ config, onConfigChange }: QRConfigurationPanelProps) {
  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <svg className="w-5 h-5 text-primary mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 15.5A3.5 3.5 0 018.5 12A3.5 3.5 0 0112 8.5a3.5 3.5 0 013.5 3.5 3.5 3.5 0 01-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97s-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0014 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1s.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66Z"/>
          </svg>
          QR Code Configuration
        </h2>
        
        <div className="space-y-4">
          {/* Content Input */}
          <div>
            <Label htmlFor="qr-content" className="text-sm font-medium text-foreground mb-2 block">
              Content to encode <span className="text-destructive">*</span>
            </Label>
            <Textarea 
              id="qr-content"
              data-testid="input-qr-content"
              placeholder="Enter text, URL, or any content to generate QR code..."
              value={config.content}
              onChange={(e) => onConfigChange({ content: e.target.value })}
              className="w-full resize-none"
              rows={3}
            />
            <p className="text-xs text-muted-foreground mt-1">
              <svg className="w-3 h-3 inline mr-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,16.5L6.5,12L7.91,10.59L11,13.67L16.59,8.09L18,9.5L11,16.5Z"/>
              </svg>
              Supports URLs, text, contact info, WiFi credentials, and more
            </p>
          </div>
          
          {/* Size Selection */}
          <div>
            <Label className="text-sm font-medium text-foreground mb-3 block">QR Code Size</Label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: 256, label: 'Small', size: '256 × 256px' },
                { value: 512, label: 'Medium', size: '512 × 512px' },
                { value: 1024, label: 'Large', size: '1024 × 1024px' },
                { value: 2048, label: 'Extra Large', size: '2048 × 2048px' }
              ].map((option) => (
                <label 
                  key={option.value}
                  className="flex items-center p-3 border border-input rounded-md cursor-pointer hover:bg-accent transition-colors"
                >
                  <input 
                    type="radio" 
                    name="size" 
                    value={option.value} 
                    checked={config.size === option.value}
                    onChange={() => onConfigChange({ size: option.value })}
                    className="sr-only peer" 
                    data-testid={`radio-size-${option.value}`}
                  />
                  <div className="w-4 h-4 border-2 border-input rounded-full peer-checked:bg-primary peer-checked:border-primary mr-3 flex items-center justify-center">
                    <div className="w-2 h-2 bg-primary-foreground rounded-full opacity-0 peer-checked:opacity-100"></div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">{option.label}</div>
                    <div className="text-xs text-muted-foreground">{option.size}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>
          
          {/* Error Correction Level */}
          <div>
            <Label className="text-sm font-medium text-foreground mb-3 block">Error Correction Level</Label>
            <div className="space-y-2">
              {[
                { value: 'L' as const, label: 'Low (L)', description: '~7% error recovery', recommended: true },
                { value: 'M' as const, label: 'Medium (M)', description: '~15% error recovery', recommended: false },
                { value: 'Q' as const, label: 'Quartile (Q)', description: '~25% error recovery', recommended: false },
                { value: 'H' as const, label: 'High (H)', description: '~30% error recovery', recommended: false }
              ].map((option) => (
                <label 
                  key={option.value}
                  className="flex items-center justify-between p-3 border border-input rounded-md cursor-pointer hover:bg-accent transition-colors"
                >
                  <div className="flex items-center">
                    <input 
                      type="radio" 
                      name="errorCorrection" 
                      value={option.value} 
                      checked={config.errorCorrectionLevel === option.value}
                      onChange={() => onConfigChange({ errorCorrectionLevel: option.value })}
                      className="sr-only peer" 
                      data-testid={`radio-error-correction-${option.value}`}
                    />
                    <div className="w-4 h-4 border-2 border-input rounded-full peer-checked:bg-primary peer-checked:border-primary mr-3 flex items-center justify-center">
                      <div className="w-2 h-2 bg-primary-foreground rounded-full opacity-0 peer-checked:opacity-100"></div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">{option.label}</div>
                      <div className="text-xs text-muted-foreground">{option.description}</div>
                    </div>
                  </div>
                  {option.recommended && (
                    <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">Recommended</span>
                  )}
                </label>
              ))}
            </div>
          </div>
          
          {/* Advanced Options */}
          <div className="border-t border-border pt-4">
            <h3 className="text-sm font-medium text-foreground mb-3">Advanced Options</h3>
            
            {/* Transparent Background Toggle */}
            <div className="flex items-center justify-between p-3 bg-accent rounded-md">
              <div>
                <div className="text-sm font-medium text-foreground">Transparent Background</div>
                <div className="text-xs text-muted-foreground">Remove white background for PNG</div>
              </div>
              <Switch
                checked={config.transparentBackground}
                onCheckedChange={(checked) => onConfigChange({ transparentBackground: checked })}
                data-testid="switch-transparent-background"
              />
            </div>
            
            {/* Pixel Density */}
            <div className="mt-3">
              <Label className="text-sm font-medium text-foreground mb-2 block">
                Pixel Density
                <span className="text-xs text-muted-foreground ml-1">(affects QR module size)</span>
              </Label>
              <div className="flex items-center space-x-3">
                <span className="text-xs text-muted-foreground">Low</span>
                <div className="flex-1">
                  <Slider
                    value={[config.pixelDensity]}
                    onValueChange={(value) => onConfigChange({ pixelDensity: value[0] })}
                    min={4}
                    max={12}
                    step={1}
                    className="w-full"
                    data-testid="slider-pixel-density"
                  />
                </div>
                <span className="text-xs text-muted-foreground">High</span>
              </div>
              <div className="text-center mt-1">
                <span className="text-xs font-medium text-primary" data-testid="text-density-value">
                  {config.pixelDensity}px modules
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
