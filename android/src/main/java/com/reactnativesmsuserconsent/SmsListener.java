package com.reactnativesmsuserconsent;

import android.app.Activity;
import android.content.Intent;

import com.facebook.react.bridge.BaseActivityEventListener;
import com.google.android.gms.auth.api.phone.SmsRetriever;

import static android.app.Activity.RESULT_OK;
import static com.reactnativesmsuserconsent.SmsBroadcastReceiver.SMS_CONSENT_REQUEST;

public class SmsListener extends BaseActivityEventListener {
    private SmsUserConsentModule moduleInstance;

    SmsListener(SmsUserConsentModule moduleInstance) {
        super();
        this.moduleInstance = moduleInstance;
    }

    @Override
    public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent intent) {
        super.onActivityResult(activity, requestCode, resultCode, intent);

        if (requestCode != SMS_CONSENT_REQUEST) return;

        if (resultCode == RESULT_OK) {
            String sms = intent.getStringExtra(SmsRetriever.EXTRA_SMS_MESSAGE);
            moduleInstance.handleSms(sms);
        } else {
            moduleInstance.handleError(new RNSmsUserConsentException(Errors.CONSENT_CANCELED, "Consent was canceled"));
        }
    }
}
