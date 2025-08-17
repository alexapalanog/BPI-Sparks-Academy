import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';
import { ChevronRight, ChevronDown } from 'lucide-react';

interface SettingsCategoryProps {
  category: {
    title: string;
    icon: any;
    color: string;
    items: Array<{
      id: string;
      label: string;
      description: string;
      hasArrow?: boolean;
      isToggle?: boolean;
      enabled?: boolean;
      value?: string;
    }>;
  };
  getToggleValue: (itemId: string) => boolean;
  getPreferenceValue?: (itemId: string) => string;
  onToggle: (settingId: string) => void;
  onPreferenceChange?: (settingId: string, value: string) => void;
  onSettingClick: (itemId: string) => void;
}

// Dropdown options for preference settings
const dropdownOptions: Record<string, string[]> = {
  'learning-style': ['Visual & Interactive', 'Audio-Based', 'Reading & Writing', 'Hands-on Practice'],
  'assessment-format': ['Mixed Format', 'Multiple Choice', 'True/False', 'Short Answer', 'Essay Questions'],
  'session-length': ['5-10 minutes', '15-20 minutes', '30-45 minutes', '60+ minutes'],
  'daily-goal': ['15 minutes', '30 minutes', '45 minutes', '60 minutes', '90+ minutes'],
  'difficulty-preference': ['Gradual increase', 'Steady level', 'Challenge immediately', 'Adaptive difficulty'],
  'feedback-style': ['Detailed explanations', 'Brief summaries', 'Visual feedback', 'Audio feedback'],
  'estimated-usage': ['15 minutes', '30 minutes', '45 minutes', '60 minutes', '90+ minutes'],
  'peak-hours': ['6:00 AM - 8:00 AM', '9:00 AM - 11:00 AM', '12:00 PM - 2:00 PM', '3:00 PM - 5:00 PM', '6:00 PM - 8:00 PM', '9:00 PM - 11:00 PM']
};

export function SettingsCategory({ 
  category, 
  getToggleValue, 
  getPreferenceValue, 
  onToggle, 
  onPreferenceChange, 
  onSettingClick 
}: SettingsCategoryProps) {
  const IconComponent = category.icon;
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({});

  const toggleDropdown = (itemId: string) => {
    setOpenDropdowns(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const handleOptionSelect = (itemId: string, value: string) => {
    if (onPreferenceChange) {
      onPreferenceChange(itemId, value);
    }
    // Close dropdown after selection
    setOpenDropdowns(prev => ({
      ...prev,
      [itemId]: false
    }));
  };

  const hasDropdownOptions = (itemId: string) => {
    return dropdownOptions[itemId] && dropdownOptions[itemId].length > 0;
  };

  return (
    <Card className="border-0 shadow-md">
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <IconComponent className="w-5 h-5" style={{ color: category.color }} />
          {category.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {category.items.map((item) => (
          <div key={item.id} className="relative">
            {item.isToggle ? (
              // For toggle items, make the entire area clickable
              <div 
                className="w-full p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
                onClick={() => onToggle(item.id)}
              >
                <div className="flex items-center justify-between w-full gap-3">
                  <div className="flex-1 min-w-0 text-left">
                    <h4 className="font-medium text-sm break-words leading-tight">{item.label}</h4>
                    <p className="text-xs text-gray-600 mt-1 break-words leading-relaxed">{item.description}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Switch
                      checked={getToggleValue(item.id)}
                      onCheckedChange={(checked) => onToggle(item.id)}
                      className="data-[state=checked]:bg-[#aa0000] data-[state=unchecked]:bg-gray-300"
                    />
                  </div>
                </div>
              </div>
            ) : (
              // For non-toggle items
              <Button
                variant="ghost"
                onClick={() => {
                  if (hasDropdownOptions(item.id)) {
                    toggleDropdown(item.id);
                  } else {
                    onSettingClick(item.id);
                  }
                }}
                className="w-full justify-start hover:bg-gray-50 p-3 h-auto"
              >
                <div className="flex items-center justify-between w-full gap-3">
                  <div className="flex-1 min-w-0 text-left">
                    <h4 className="font-medium text-sm break-words leading-tight">{item.label}</h4>
                    <p className="text-xs text-gray-600 mt-1 break-words leading-relaxed">{item.description}</p>
                    {/* Show current selection for dropdown items */}
                    {hasDropdownOptions(item.id) && getPreferenceValue && (
                      <p className="text-xs text-[#aa0000] mt-1 font-medium">
                        Current: {getPreferenceValue(item.id)}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {hasDropdownOptions(item.id) ? (
                      <ChevronDown 
                        className={`w-4 h-4 text-gray-400 transition-transform ${
                          openDropdowns[item.id] ? 'rotate-180' : ''
                        }`} 
                      />
                    ) : item.hasArrow ? (
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    ) : null}
                  </div>
                </div>
              </Button>
            )}
            
            {/* Dropdown Options */}
            {hasDropdownOptions(item.id) && openDropdowns[item.id] && (
              <div className="mt-2 ml-3 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto z-30">
                {dropdownOptions[item.id].map((option, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOptionSelect(item.id, option);
                    }}
                    className={`w-full justify-start p-3 h-auto text-sm hover:bg-gray-50 ${
                      getPreferenceValue && getPreferenceValue(item.id) === option 
                        ? 'bg-[#aa0000]/5 text-[#aa0000] border-l-2 border-l-[#aa0000]' 
                        : ''
                    }`}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}