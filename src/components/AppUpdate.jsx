
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const currentAppId = 1;

const AppUpdate = () => {
  const [appVersion, setAppVersion] = useState();
console.log(appVersion)

// Fetch app version from the backend
const fetchAppVersion = async () => {
    try {
      const response = await fetch('https://www.cwmsrfupre.com.ng/api/get_app_version.php'); // URL to the PHP backend
      const data = await response.json();
  
      if (!data.success || !data.app_versions || data.app_versions.length === 0) {
        console.error('Invalid response from backend');
        return;
      }
  
      const latestVersion = data.app_versions[0].version;
      const appId = data.app_versions[0].appId;
  
      console.log('Fetched version:', latestVersion);
      setAppVersion(latestVersion);
  
      // Retrieve stored versions
      const stored = localStorage.getItem('app_versions');
      const storedVersions = stored ? JSON.parse(stored) : {};
  
      const prevVersion = storedVersions[appId];
  
      // If version changed, alert the user
      if (prevVersion && prevVersion !== latestVersion) {
        Swal.fire({
          title: 'Update Available!',
          text: `This site has a new update by the Developer, Kindly click the 'UPDATE" button to catch up`,
          icon: 'info',
          showCancelButton: true,
          confirmButtonText: 'Update',
          cancelButtonText: 'Remind me later',
        }).then((result) => {
          if (result.isConfirmed) {
            // Save new version and reload
            storedVersions[appId] = latestVersion;
            localStorage.setItem('app_versions', JSON.stringify(storedVersions));
            window.location.reload();
          }
        });
      } else {
        // No previous version or it's the same — just save it
        storedVersions[appId] = latestVersion;
        localStorage.setItem('app_versions', JSON.stringify(storedVersions));
      }
    } catch (error) {
      console.error('Error fetching app version:', error);
    }
  };



  
  useEffect(() => {
    fetchAppVersion(); // Fetch app version on load and check for updates
    const interval = setInterval(() => fetchAppVersion(),5*60*1000); // Poll every 5 minutes
    return () => clearInterval(interval);
  }, []); // Empty dependency array ensures it only runs once on mount

  return (
    <div>
  
    </div>
  );
};

export default AppUpdate;
