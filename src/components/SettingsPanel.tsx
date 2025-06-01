
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X, Palette, Bot, Zap } from 'lucide-react';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  settings: {
    aiName: string;
    theme: string;
    temperature: number;
    maxTokens: number;
    nsfw: boolean;
    responseStyle: string;
  };
  onSettingsChange: (settings: any) => void;
}

const SettingsPanel = ({ isOpen, onClose, settings, onSettingsChange }: SettingsPanelProps) => {
  const updateSetting = (key: string, value: any) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-start pt-8">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">Einstellungen</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="p-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bot className="h-5 w-5" />
                <span>AI Einstellungen</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="aiName">AI Name</Label>
                <Input
                  id="aiName"
                  value={settings.aiName}
                  onChange={(e) => updateSetting('aiName', e.target.value)}
                  placeholder="AI Assistant"
                />
              </div>
              
              <div>
                <Label htmlFor="responseStyle">Response Style</Label>
                <Select
                  value={settings.responseStyle}
                  onValueChange={(value) => updateSetting('responseStyle', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="flirty">Flirty</SelectItem>
                    <SelectItem value="romantic">Romantic</SelectItem>
                    <SelectItem value="playful">Playful</SelectItem>
                    <SelectItem value="dominant">Dominant</SelectItem>
                    <SelectItem value="submissive">Submissive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>Temperature: {settings.temperature}</Label>
                <Slider
                  value={[settings.temperature]}
                  onValueChange={(value) => updateSetting('temperature', value[0])}
                  max={1}
                  min={0}
                  step={0.1}
                  className="mt-2"
                />
                <p className="text-xs text-gray-500 mt-1">Höhere Werte = Kreativer</p>
              </div>
              
              <div>
                <Label>Max Tokens: {settings.maxTokens}</Label>
                <Slider
                  value={[settings.maxTokens]}
                  onValueChange={(value) => updateSetting('maxTokens', value[0])}
                  max={2000}
                  min={100}
                  step={50}
                  className="mt-2"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="nsfw">NSFW Content</Label>
                <Switch
                  id="nsfw"
                  checked={settings.nsfw}
                  onCheckedChange={(checked) => updateSetting('nsfw', checked)}
                />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Palette className="h-5 w-5" />
                <span>Aussehen</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <Label htmlFor="theme">Theme</Label>
                <Select
                  value={settings.theme}
                  onValueChange={(value) => updateSetting('theme', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="purple">Purple Gradient</SelectItem>
                    <SelectItem value="blue">Blue Ocean</SelectItem>
                    <SelectItem value="red">Passionate Red</SelectItem>
                    <SelectItem value="green">Nature Green</SelectItem>
                    <SelectItem value="dark">Dark Mode</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
