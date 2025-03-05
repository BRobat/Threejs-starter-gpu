void main () {

    vec2 uv = gl_FragCoord.xy / resolution.xy;

    vec4 particle = texture (uParticles, uv);
    vec4 velocity = texture (uVelocities, uv);
    
    gl_FragColor = particle + vec4((velocity.xyz / 100000.0), particle.w);
}