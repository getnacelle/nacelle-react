// NOTE: @index directives are for the 'Generate Index' VSCode extension (jayfong.generate-index)
//  If you have the Generate Index VSCode extension installed, you can
//  cmd + shift + P => 'Generate Index' to re-generate the exports.

// EXPORT SERVICES
// @index('./*.js', (f, _) => `export { default as ${_.camelCase(f.name)} } from '${f.path}';`)
export { default as nacelleClient } from './nacelleClient';
// @endindex
