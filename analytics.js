// Track enquiry events and update analytics
function trackEnquiry(name, email, message) {
  fetch('http://localhost:5001/api/analytics/enquiry', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, message })
  });
}

// Track response events
function trackResponse(response) {
  fetch('http://localhost:5001/api/analytics/response', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ response })
  });
}

// Track conversion events
function trackConversion(type) {
  fetch('http://localhost:5001/api/analytics/conversion', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type })
  });
}

export { trackEnquiry, trackResponse, trackConversion };