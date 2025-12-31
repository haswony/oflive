import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function FirebaseSetupAlert() {
  return (
    <Alert variant="destructive" className="mb-4">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle className="text-lg font-bold">⚠️ مطلوب: إعداد Firebase</AlertTitle>
      <AlertDescription className="mt-2 space-y-3">
        <p className="font-semibold text-base">
          لتفعيل الدردشة بالفيديو، يجب تحديث قواعد Firebase (3 خطوات فقط)
        </p>
        
        <div className="bg-destructive/10 p-3 rounded-md space-y-2 text-sm">
          <p className="font-semibold">الخطوات السريعة:</p>
          <ol className="list-decimal list-inside space-y-1 mr-2">
            <li>افتح Firebase Console (الرابط أدناه)</li>
            <li>احذف القواعد القديمة وانسخ القواعد الجديدة من ملف QUICK_FIX_AR.md</li>
            <li>انقر "Publish" وانتظر دقيقة</li>
          </ol>
        </div>

        <div className="flex flex-col gap-2 mt-3">
          <Button
            variant="outline"
            size="sm"
            asChild
            className="w-full xl:w-auto bg-background hover:bg-accent"
          >
            <a
              href="https://console.firebase.google.com/project/atttt-a94d2/database/atttt-a94d2-default-rtdb/rules"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              افتح Firebase Console
            </a>
          </Button>
          
          <details className="text-xs">
            <summary className="cursor-pointer hover:text-foreground font-semibold">
              📖 عرض القواعد المطلوبة
            </summary>
            <div className="mt-2 p-3 bg-muted rounded-md">
              <p className="font-semibold mb-2">انسخ هذه القواعد:</p>
              <pre className="text-[10px] overflow-x-auto bg-background p-2 rounded">
{`{
  "rules": {
    "status": {
      "$userId": {
        ".read": true,
        ".write": true
      }
    },
    "queue": {
      "$userId": {
        ".read": true,
        ".write": true
      }
    },
    "signals": {
      "$matchId": {
        ".read": true,
        ".write": true
      }
    },
    "matches": {
      "$matchId": {
        ".read": true,
        ".write": true
      }
    },
    "active_matches": {
      "$matchId": {
        ".read": true,
        ".write": true
      }
    }
  }
}`}
              </pre>
              <p className="text-xs mt-2 text-muted-foreground">
                ⚠️ تأكد أن جميع .read و .write تساوي true (وليس "auth != null")
              </p>
            </div>
          </details>
        </div>

        <div className="mt-3 p-2 bg-muted rounded text-xs">
          <p className="font-semibold">💡 لماذا هذا ضروري؟</p>
          <p className="mt-1">
            التطبيق يستخدم Supabase للمصادقة، لذلك Firebase لا يعرف المستخدمين. 
            القواعد الحالية تمنع الوصول لأنها تتطلب Firebase Auth.
          </p>
        </div>
      </AlertDescription>
    </Alert>
  );
}
