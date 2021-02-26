export default function handler(_req, res) {
  // Clears the preview mode cookies.
  console.info('[nacelle] exiting preview mode');
  res.clearPreviewData();
  res.redirect('/');
}
