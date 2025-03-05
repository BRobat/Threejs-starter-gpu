vec3 centralPullForce(vec3 pos) {
    float r = length(pos);
    if (r>0.01) {
        return 0.1 * pos /( r*r);
    } else {
        return vec3(0.0);
    }
}

void main() {
    // uv is THE position on texture;
    // so basically this is the coordinate
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    // position is the value of the texel;
    vec4 position = texture(uParticles, uv);
    vec4 velocity = texture(uVelocities, uv);
    // vec4 velocity = vec4(0.0);
    float mass = velocity.w;


    // collision detection




    // update velocity
    velocity.xyz -= centralPullForce(position.xyz);
    // velocity.xyz += 0.0;


    // // update position

    // position.xyz += velocity.xyz / 1000.0;






    
    gl_FragColor = vec4(velocity);
}