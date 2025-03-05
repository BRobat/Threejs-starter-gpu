attribute vec2 aParticlesUv;
uniform sampler2D uParticlesTexture;
uniform sampler2D uVelocitiesTexture;
varying vec3 vPosition;
varying vec2 vUv;

void main() {
    // TODO: should differenitate particle and position cause particlesUV is the same for all data, and particle is a position of a particle
    vec4 particle = texture(uParticlesTexture, aParticlesUv);
    vec4 velocity = texture(uVelocitiesTexture, aParticlesUv);
    float mass = velocity.w * 10.0;

    vec4 modelPosition = modelMatrix * vec4(particle.xyz, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;
    // TODO: implement point size relative to the particle size
    gl_PointSize = mass/3.0;
    vUv = (particle.xy+1.0)/2.0;
    vPosition = modelPosition.xyz;
}


