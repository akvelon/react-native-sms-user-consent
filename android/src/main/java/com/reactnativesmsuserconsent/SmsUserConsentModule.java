package com.reactnativesmsuserconsent;

import android.app.Activity;
import android.content.IntentFilter;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.google.android.gms.auth.api.phone.SmsRetriever;

import java.util.HashMap;
import java.util.Map;

public class SmsUserConsentModule extends ReactContextBaseJavaModule {
    private static final String SMS_RETRIEVED = "SMS_RETRIEVED";
    private static final String SMS_RETRIEVE_ERROR = "SMS_RETRIEVE_ERROR";

    public ReactApplicationContext reactContext;
    private SmsBroadcastReceiver broadcastReceiver;
    private SmsListener listener;

    SmsUserConsentModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
        listener = new SmsListener(this);
    }

    private void subscribe() throws RNSmsUserConsentException {
        Activity activity = getCurrentActivity();
        if (activity == null) {
            throw new RNSmsUserConsentException(
                Errors.NULL_ACTIVITY,
                "Could not subscribe, activity is null"
            );
        }

        SmsRetriever.getClient(getCurrentActivity()).startSmsUserConsent(null);

        broadcastReceiver = new SmsBroadcastReceiver(getCurrentActivity(), this);
        getCurrentActivity().registerReceiver(
            broadcastReceiver,
            new IntentFilter(SmsRetriever.SMS_RETRIEVED_ACTION)
        );

        reactContext.addActivityEventListener(listener);
    }

    private void unsubscribe() throws RNSmsUserConsentException {
        Activity activity = getCurrentActivity();

        if (activity == null) {
            throw new RNSmsUserConsentException(
                Errors.NULL_ACTIVITY,
                "Could not unsubscribe, activity is null"
            );
        }

        if (broadcastReceiver == null) {
            throw new RNSmsUserConsentException(
                Errors.NULL_BROADCAST_RECEIVER,
                "Could not unsubscribe, broadcastReceiver is null"
            );
        }

        activity.unregisterReceiver(broadcastReceiver);
        broadcastReceiver = null;

        reactContext.removeActivityEventListener(listener);
    }

    private void resubscribe() {
        try {
            unsubscribe();
        } catch (RNSmsUserConsentException e) {
            sendErrorEventToJs(e);
            return;
        }

        try {
            subscribe();
        } catch (RNSmsUserConsentException e) {
            sendErrorEventToJs(e);
        }
    }

    public void handleSms(String sms) {
        sendSmsEventToJs(sms);
        resubscribe();
    }

    public void handleError(RNSmsUserConsentException e) {
        sendErrorEventToJs(e);
        resubscribe();
    }

    private void sendSmsEventToJs(String sms) {
        WritableMap params = Arguments.createMap();
        params.putString("sms", sms);
        reactContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
            .emit(SMS_RETRIEVED, params);
    }

    private void sendErrorEventToJs(RNSmsUserConsentException e) {
        WritableMap params = Arguments.createMap();
        params.putString(e.code, e.getMessage());
        reactContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
            .emit(SMS_RETRIEVE_ERROR, params);
    }

    @ReactMethod
    public void startSmsHandling(Promise promise) {
        try {
            subscribe();
            promise.resolve(null);
        } catch (RNSmsUserConsentException e) {
            promise.reject(e.code, e.getMessage());
        }
    }

    @ReactMethod
    public void stopSmsHandling(Promise promise) {
        try {
            unsubscribe();
            promise.resolve(null);
        } catch (RNSmsUserConsentException e) {
            promise.reject(e.code, e.getMessage());
        }
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();

        for (Errors error : Errors.values()) {
            constants.put(error.toString(), error.toString());
        }

        return constants;
    }

    @Override
    @NonNull
    public String getName() {
        return "SmsUserConsent";
    }
}
