import React, { useState, useEffect } from 'react';
import keycloak from './keycloak';
import { placeOrder, getOrders } from './api';
import { 
  ShoppingBag, 
  CheckCircle2, 
  AlertTriangle, 
  LogOut, 
  Package, 
  Layers, 
  Send, 
  RefreshCw,
  Database
} from 'lucide-react';
import './App.css';

const SAMPLE_PRODUCTS = [
  { name: 'MacBook Pro M3', sku: 'macbook_pro_m3', price: 1999 },
  { name: 'iPhone 15 Pro', sku: 'iPhone_15', price: 999 },
  { name: 'Samsung Galaxy S24', sku: 'samsung_galaxy_s24', price: 899 },
  { name: 'Sony WH-1000XM5', sku: 'sony_wh1000xm5', price: 399 },
  { name: 'iPad Air M2', sku: 'ipad_air_m2', price: 599 },
];

function App() {
  const [skuCode, setSkuCode] = useState(SAMPLE_PRODUCTS[0].sku);
  const [price, setPrice] = useState(SAMPLE_PRODUCTS[0].price);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [fetchingOrders, setFetchingOrders] = useState(false);

  const fetchOrders = async () => {
    setFetchingOrders(true);
    try {
      await keycloak.updateToken(70);
      const res = await getOrders();
      setOrders(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error('Failed to load orders', err);
    } finally {
      setFetchingOrders(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleProductSelect = (e) => {
    const selected = SAMPLE_PRODUCTS.find((p) => p.sku === e.target.value);
    if (selected) {
      setSkuCode(selected.sku);
      setPrice(selected.price);
    } else {
      setSkuCode(e.target.value);
    }
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await keycloak.updateToken(70);
      const response = await placeOrder({
        skuCode,
        price: Number(price),
        quantity: Number(quantity),
      });

      if (typeof response.data === 'string' && (response.data.includes('Oops!') || response.data.toLowerCase().includes('wrong'))) {
        setMessage(response.data);
        setMessageType('error');
      } else {
        setMessage(typeof response.data === 'string' ? response.data : 'Order Placed Successfully!');
        setMessageType('success');
        fetchOrders();
      }
    } catch (err) {
      const errorMsg = err.response?.data || 'Service unavailable (Circuit breaker active)';
      setMessage(typeof errorMsg === 'string' ? errorMsg : 'Failed to place order');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      {/* Header without subtitle */}
      <header className="dashboard-header">
        <div className="brand-section">
          <div className="brand-icon">
            <Layers size={24} />
          </div>
          <div>
            <div className="brand-title">OrderOps Microservices</div>
          </div>
        </div>

        <div className="user-profile">
          <div className="user-pill">
            <span className="user-dot"></span>
            {keycloak.tokenParsed?.preferred_username || 'Active User'}
          </div>
          <button className="btn-logout" onClick={() => keycloak.logout()}>
            <LogOut size={14} /> Logout
          </button>
        </div>
      </header>

      {/* Main Form & Records Grid */}
      <div className="main-grid" style={{ marginTop: '24px' }}>
        {/* Order Form */}
        <div className="card">
          <div className="card-title-row">
            <div className="card-title">
              <Package size={18} color="var(--primary)" />
              New Order Request
            </div>
          </div>

          <form onSubmit={handlePlaceOrder}>
            <div className="form-group">
              <label className="form-label">Select Product</label>
              <select className="form-control" value={skuCode} onChange={handleProductSelect}>
                {SAMPLE_PRODUCTS.map((prod) => (
                  <option key={prod.sku} value={prod.sku}>
                    {prod.name} (${prod.price})
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Product SKU Code</label>
              <input
                type="text"
                className="form-control"
                value={skuCode}
                onChange={(e) => setSkuCode(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Price per Unit ($)</label>
              <input
                type="number"
                className="form-control"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Quantity</label>
              <input
                type="number"
                min="1"
                className="form-control"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? (
                <>
                  <RefreshCw size={16} className="spin" /> Processing...
                </>
              ) : (
                <>
                  <Send size={16} /> Place Order via Gateway
                </>
              )}
            </button>
          </form>

          {message && (
            <div className={`feedback-alert feedback-${messageType}`}>
              {messageType === 'success' ? <CheckCircle2 size={18} /> : <AlertTriangle size={18} />}
              <span>{message}</span>
            </div>
          )}
        </div>

        {/* Live Orders Table */}
        <div className="card">
          <div className="card-title-row">
            <div className="card-title">
              <Database size={18} color="var(--primary)" />
              Order Database Records
            </div>

            <button
              type="button"
              onClick={fetchOrders}
              disabled={fetchingOrders}
              title="Refresh Records"
              style={{
                background: 'transparent',
                border: 'none',
                color: '#64748b',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                padding: '6px'
              }}
            >
              <RefreshCw size={18} className={fetchingOrders ? 'spin' : ''} />
            </button>
          </div>

          <div className="table-wrapper">
            {orders.length === 0 ? (
              <div className="empty-state" style={{ padding: '60px 20px', textAlign: 'center' }}>
                <ShoppingBag size={40} style={{ margin: '0 auto 12px auto', display: 'block', opacity: 0.3 }} />
                <p style={{ fontWeight: 600, color: '#334155' }}>No orders placed yet</p>
                <p style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>
                  Submit an order request on the left to sync live data.
                </p>
              </div>
            ) : (
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Tracking Number</th>
                    <th>Product SKU</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, idx) => (
                    <tr key={order.id || order.orderNumber || idx}>
                      <td>
                        <span className="order-badge">
                          {(order.orderNumber || `ORD-${idx + 1}`).substring(0, 18)}...
                        </span>
                      </td>
                      <td>{order.skuCode}</td>
                      <td>${order.price}</td>
                      <td>{order.quantity}</td>
                      <td>
                        <span className="status-pill">
                          <CheckCircle2 size={12} /> Confirmed
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;