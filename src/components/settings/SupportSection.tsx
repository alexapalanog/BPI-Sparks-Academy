import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { HelpCircle, MessageSquare, Download, ChevronRight } from 'lucide-react';

export function SupportSection() {
  return (
    <Card className="border-0 shadow-md">
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-[#6f42c1]" />
          Support & Help
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button
          variant="ghost"
          onClick={() => console.log('Help Center clicked')}
          className="w-full justify-start hover:bg-gray-50 p-3 h-auto"
        >
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <HelpCircle className="w-5 h-5 text-[#17a2b8] flex-shrink-0" />
            <div className="text-left flex-1 min-w-0">
              <p className="font-medium text-sm break-words">Help Center</p>
              <p className="text-xs text-gray-600 break-words">Find answers to common questions</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
        </Button>

        <Button
          variant="ghost"
          onClick={() => console.log('Contact Support clicked')}
          className="w-full justify-start hover:bg-gray-50 p-3 h-auto"
        >
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <MessageSquare className="w-5 h-5 text-[#28a745] flex-shrink-0" />
            <div className="text-left flex-1 min-w-0">
              <p className="font-medium text-sm break-words">Contact Support</p>
              <p className="text-xs text-gray-600 break-words">Get help from our team</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
        </Button>

        <Button
          variant="ghost"
          onClick={() => console.log('App Version clicked')}
          className="w-full justify-start hover:bg-gray-50 p-3 h-auto"
        >
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <Download className="w-5 h-5 text-[#f6b60b] flex-shrink-0" />
            <div className="text-left flex-1 min-w-0">
              <p className="font-medium text-sm break-words">App Version</p>
              <p className="text-xs text-gray-600 break-words">v2.1.0 - Check for updates</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
        </Button>
      </CardContent>
    </Card>
  );
}