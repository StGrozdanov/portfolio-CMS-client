export type BrowserIconKey = keyof typeof browserIcons;

export const browserIcons = {
    Chrome: <i className="fa-brands fa-chrome" style={{color: "#e94738"}} />,
    'Postman Runtime': <i className="fa-solid fa-keyboard" style={{color: "#ff6c37"}} />,
    Safari: <i className="fa-brands fa-safari" style={{color: "#1e81eb"}} />,
    Firefox: <i className="fa-brands fa-firefox-browser" style={{color: '#f8ad1e'}} />,
    Edge: <i className="fa-brands fa-edge" style={{color: '#579edb'}} />,
    Default: <i className="fa-solid fa-user-secret" />,
}

export type DeviceIconKey = keyof typeof devicesIcons;

export const devicesIcons = {
    Mobile: <i className="fa-solid fa-mobile-screen-button" style={{color: '#6f42c1'}} />,
    Tablet: <i className="fa-solid fa-tablet-screen-button" style={{color: '#2d80ee'}} />,
    'Laptop / Desktop': <i className="fa-solid fa-house-laptop" style={{color: '#636161'}} />,
}