import React, { useEffect } from 'react';
import axios from 'axios';


function initFacebookSdk() {
  return new Promise((resolve) => {
    // Wait for the Facebook SDK to initialize
    window.fbAsyncInit = function() {
      window.FB.init({
        appId: import.meta.env.VITE_APP_ID,
        cookie: true,
        xfbml: true,
        version: 'v21.0'
      });
      resolve();
    };

    // Load the Facebook SDK script
    (function(d, s, id) {
      let js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  });
}

function ConnectToWhatsApp() {
  useEffect(() => {
    initFacebookSdk().then(() => {
      console.log('Facebook SDK loaded');
    }).catch((error) => {
      console.error('Error loading Facebook SDK:', error);
    });

    const messageListener = (event) => {
      if (event.origin !== "https://www.facebook.com" && event.origin !== "https://web.facebook.com") {
        return;
      }
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'WA_EMBEDDED_SIGNUP') {
          if (data.event === 'FINISH') {
            const { phone_number_id, waba_id } = data.data;
            console.log("Phone number ID ", phone_number_id, " WhatsApp business account ID ", waba_id);
          } else if (data.event === 'CANCEL') {
            const { current_step } = data.data;
            console.warn("Cancel at ", current_step);
          } else if (data.event === 'ERROR') {
            const { error_message } = data.data;
            console.error("error ", error_message);
          }
        }
        document.getElementById("session-info-response").textContent = JSON.stringify(data, null, 2);
      } catch {
        console.log('Non JSON Responses', event.data);
      }
    };

    window.addEventListener('message', messageListener);

    return () => {
      window.removeEventListener('message', messageListener);
    };
  }, []);

  const fbLoginCallback = (response) => {
    if (response.authResponse) {
      const code = response.authResponse.code;
      // Send the code to your backend using axios
      axios.post(`${import.meta.env.VITE_BACKEND_URL}/chat/whatsapp/exchange-code/`, 
        { code },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          }
        }
      )
      .then(response => {
        console.log('Success:', response.data);
        // Handle success response
      })
      .catch(error => {
        console.error('Error:', error);
        // Handle error response
      });
    }
    document.getElementById("sdk-response").textContent = JSON.stringify(response, null, 2);
  };

  const launchWhatsAppSignup = () => {
    if (typeof FB !== 'undefined') {
      window.FB.login(fbLoginCallback, {
        config_id: import.meta.env.VITE_CONFIG_ID,
        response_type: 'code',
        override_default_response_type: true,
        extras: {
          setup: {},
          featureType: '',
          sessionInfoVersion: '2',
        }
      });
    } else {
      console.error('Facebook SDK not loaded');
    }
  };

  return (
    <div>
      <div id="fb-root"></div>
      <button onClick={launchWhatsAppSignup} style={{
        backgroundColor: '#1877f2',
        border: 0,
        borderRadius: '4px',
        color: '#fff',
        cursor: 'pointer',
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontSize: '16px',
        fontWeight: 'bold',
        height: '40px',
        padding: '0 24px'
      }}>
        Login with Facebook
      </button>
      <p>Session info response:</p>
      <pre id="session-info-response"></pre>
      <br />
      <p>SDK response:</p>
      <pre id="sdk-response"></pre>
    </div>
  );
}

export default ConnectToWhatsApp;