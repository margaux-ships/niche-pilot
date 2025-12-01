import React from 'react';

function AccountsSection({ accounts }) {
  const handleOpenProfile = (handle) => {
    const url = `https://x.com/${handle.replace('@', '')}`;
    window.open(url, '_blank');
  };

  return (
    <div className="section">
      <h2 className="section-title">Accounts to Follow ({accounts.length})</h2>
      
      {accounts.length === 0 ? (
        <div className="empty-state">No accounts loaded yet</div>
      ) : (
        <div>
          {accounts.slice(0, 20).map((account, index) => (
            <div key={index} className="account-item">
              <div className="account-handle">{account.handle}</div>
              {account.bio && (
                <div className="account-bio">{account.bio}</div>
              )}
              <button
                className="button-small"
                onClick={() => handleOpenProfile(account.handle)}
              >
                Open Profile
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AccountsSection;

