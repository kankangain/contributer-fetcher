const Chai4Me = () => {
    return (
        <div>
            <a
                href="https://chai4.me/kankangain"
                target="_blank"
                rel="noopener noreferrer"
                title="Support on Chai4Me"
                style={{
                    display: 'inline-flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#ffffff',
                    padding: '8px 32px',
                    borderRadius: '16px',
                    textDecoration: 'none',
                    border: '1px solid #e5e7eb',
                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -2px rgba(0,0,0,0.05)',
                    transition: 'transform 0.2s'
                }}
            >
                <img
                    src="https://chai4.me/icons/wordmark.png"
                    alt="Chai4Me"
                    style={{
                        height: '32px',
                        objectFit: 'contain',
                        marginBottom: '4px'
                    }}
                />
                <span style={{
                    color: '#6b7280',
                    fontFamily: 'sans-serif',
                    fontSize: '14px',
                    fontWeight: 600
                }}>
                    @kankangain
                </span>
            </a>
        </div>
    );
};

export default Chai4Me;
