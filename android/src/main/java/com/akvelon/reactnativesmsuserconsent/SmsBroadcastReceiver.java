package com.akvelon.reactnativesmsuserconsent;

import android.app.Activity;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;

import com.facebook.react.bridge.ReactApplicationContext;
import com.google.android.gms.auth.api.phone.SmsRetriever;
import com.google.android.gms.common.api.CommonStatusCodes;
import com.google.android.gms.common.api.Status;

public class SmsBroadcastReceiver extends BroadcastReceiver {
    public static final int SMS_CONSENT_REQUEST = 2;

    private Activity activity;
    private ReactNativeSmsUserConsentModule moduleInstance;

    public SmsBroadcastReceiver(Activity activity, ReactNativeSmsUserConsentModule moduleInstance) {
        super();
        this.activity = activity;
        this.moduleInstance = moduleInstance;
    }

    @Override
    public void onReceive(Context context, Intent intent) {
        Bundle extras = intent.getExtras();
        if (extras == null) {
            moduleInstance.handleError(new RNSmsUserConsentException(Errors.COULD_NOT_HANDLE_BROADCAST, "Intent extras are null"));
            return;
        }

        Status smsRetrieverStatus = (Status) extras.get(SmsRetriever.EXTRA_STATUS);
        if (smsRetrieverStatus == null) {
            moduleInstance.handleError(new RNSmsUserConsentException(Errors.COULD_NOT_HANDLE_BROADCAST, "SMS retriever status is null"));
            return;
        }

        Intent consentIntent = extras.getParcelable(SmsRetriever.EXTRA_CONSENT_INTENT);

        switch (smsRetrieverStatus.getStatusCode()) {
            case CommonStatusCodes.SUCCESS:
                try {
                    activity.startActivityForResult(consentIntent, SMS_CONSENT_REQUEST);
                } catch (Exception e) {
                    moduleInstance.handleError(new RNSmsUserConsentException(Errors.COULD_NOT_HANDLE_BROADCAST, "'startActivityForResult' failed"));
                }
                break;
            case CommonStatusCodes.TIMEOUT:
                moduleInstance.handleError(new RNSmsUserConsentException(Errors.CONSENT_TIMEOUT, "SMS was not retrieved in 5 minutes"));
                break;
        }
    }
}
