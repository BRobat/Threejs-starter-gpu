varying vec3 vPosition;
varying vec2 vUv;

uniform sampler2D uBaseTexture;

void main() {


    vec4 color = texture(uBaseTexture, vUv);
    gl_FragColor = vec4(color);

    // gl_FragColor = vec4( 1.0, 0.8,0.1,1.0);
}