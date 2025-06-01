
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
    <div className="fixed inset-0 bg-black/70 z-50 flex justify-center items-start pt-8 backdrop-blur-sm">
      <div className="bg-gray-800 rounded-lg shadow-2xl w-full max-w-md mx-4 max-h-[80vh] overflow-y-auto border border-gray-700">
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-xl font-semibold text-gray-100">Einstellungen</h2>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-400 hover:text-white hover:bg-gray-700">
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="p-4 space-y-6">
          <Card className="bg-gray-700/50 border-gray-600">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-gray-100">
                <Bot className="h-5 w-5" />
                <span>AI Einstellungen</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="aiName" className="text-gray-200">AI Name</Label>
                <Input
                  id="aiName"
                  value={settings.aiName}
                  onChange={(e) => updateSetting('aiName', e.target.value)}
                  placeholder="AI Assistant"
                  className="bg-gray-600/50 border-gray-500 text-gray-100 placeholder-gray-400 focus:border-purple-500"
                />
              </div>
              
              <div>
                <Label htmlFor="responseStyle" className="text-gray-200">Response Style</Label>
                <Select
                  value={settings.responseStyle}
                  onValueChange={(value) => updateSetting('responseStyle', value)}
                >
                  <SelectTrigger className="bg-gray-600/50 border-gray-500 text-gray-100">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    <SelectItem value="flirty" className="text-gray-100 hover:bg-gray-600">Flirty</SelectItem>
                    <SelectItem value="romantic" className="text-gray-100 hover:bg-gray-600">Romantic</SelectItem>
                    <SelectItem value="playful" className="text-gray-100 hover:bg-gray-600">Playful</SelectItem>
                    <SelectItem value="dominant" className="text-gray-100 hover:bg-gray-600">Dominant</SelectItem>
                    <SelectItem value="submissive" className="text-gray-100 hover:bg-gray-600">Submissive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label className="text-gray-200">Temperature: {settings.temperature}</Label>
                <Slider
                  value={[settings.temperature]}
                  onValueChange={(value) => updateSetting('temperature', value[0])}
                  max={1}
                  min={0}
                  step={0.1}
                  className="mt-2"
                />
                <p className="text-xs text-gray-400 mt-1">Höhere Werte = Kreativer</p>
              </div>
              
              <div>
                <Label className="text-gray-200">Max Tokens: {settings.maxTokens}</Label>
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
                <Label htmlFor="nsfw" className="text-gray-200">NSFW Content</Label>
                <Switch
                  id="nsfw"
                  checked={settings.nsfw}
                  onCheckedChange={(checked) => updateSetting('nsfw', checked)}
                />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-700/50 border-gray-600">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-gray-100">
                <Palette className="h-5 w-5" />
                <span>Aussehen</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <Label htmlFor="theme" className="text-gray-200">Theme</Label>
                <Select
                  value={settings.theme}
                  onValueChange={(value) => updateSetting('theme', value)}
                >
                  <SelectTrigger className="bg-gray-600/50 border-gray-500 text-gray-100">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    <SelectItem value="dark" className="text-gray-100 hover:bg-gray-600">Dark Mode</SelectItem>
                    <SelectItem value="purple" className="text-gray-100 hover:bg-gray-600">Purple Gradient</SelectItem>
                    <SelectItem value="blue" className="text-gray-100 hover:bg-gray-600">Blue Ocean</SelectItem>
                    <SelectItem value="red" className="text-gray-100 hover:bg-gray-600">Passionate Red</SelectItem>
                    <SelectItem value="green" className="text-gray-100 hover:bg-gray-600">Nature Green</SelectItem>
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
