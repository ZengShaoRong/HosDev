"use strict";(self["webpackChunkvue_arcgis_0905"]=self["webpackChunkvue_arcgis_0905"]||[]).push([[9082],{7681:function(e,t,r){r.d(t,{D:function(){return G},b:function(){return V}});var n=r(4468),i=r(76354),o=r(35277),a=r(65117),s=r(91595),l=r(85273),c=r(39102),u=r(86286),d=r(84284),h=r(66856),f=r(98774),m=r(99426),p=r(95866),v=r(59691),g=r(5921),_=r(78378),x=r(16054),T=r(11565),b=r(43297),y=r(67848),A=r(45018),E=r(12391),S=r(30341),w=r(36664),M=r(44077),C=r(29155),O=r(60047),I=r(20056),R=r(18967),N=r(4357),P=r(43494),L=r(7606),H=r(76527),D=r(53051),B=r(93687),F=r(84205),z=r(814);function V(e){const t=new D.N5,{vertex:r,fragment:V,varyings:G}=t;if((0,R.NB)(r,e),t.include(u.I),G.add("vpos","vec3"),t.include(M.A,e),t.include(l.BK,e),t.include(p.G,e),t.include(w.q2,e),e.output===o.V.Color){t.include(w.Sx,e),t.include(w.MU,e),t.include(w.O1,e),t.include(w.QM,e),(0,R.yu)(r,e),t.include(c.Y,e),t.include(s.d,e);const o=e.normalType===c.W.Attribute||e.normalType===c.W.Compressed;o&&e.offsetBackfaces&&t.include(i.M),t.include(g.W,e),t.include(m.Mh,e),e.instancedColor&&t.attributes.add(z.r.INSTANCECOLOR,"vec4"),G.add("vPositionLocal","vec3"),t.include(h.U,e),t.include(n.oD,e),t.include(d.K,e),t.include(f.c,e),r.uniforms.add(new P.E("externalColor",(e=>e.externalColor))),G.add("vcolorExt","vec4"),e.multipassEnabled&&G.add("depth","float"),r.code.add(H.H`
      void main(void) {
        forwardNormalizedVertexColor();
        vcolorExt = externalColor;
        ${e.instancedColor?"vcolorExt *= instanceColor * 0.003921568627451;":""}
        vcolorExt *= vvColor();
        vcolorExt *= getSymbolColor();
        forwardColorMixMode();

        if (vcolorExt.a < ${H.H.float(C.y)}) {
          gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
        } else {
          vpos = getVertexInLocalOriginSpace();
          vPositionLocal = vpos - view[3].xyz;
          vpos = subtractOrigin(vpos);
          ${o?H.H`vNormalWorld = dpNormal(vvLocalNormal(normalModel()));`:""}
          vpos = addVerticalOffset(vpos, localOrigin);
          ${e.hasVertexTangents?"vTangent = dpTransformVertexTangent(tangent);":""}
          gl_Position = transformPosition(proj, view, vpos);
          ${o&&e.offsetBackfaces?"gl_Position = offsetBackfacingClipPosition(gl_Position, vpos, vNormalWorld, cameraPosition);":""}
        }

        ${e.multipassEnabled?"depth = (view * vec4(vpos, 1.0)).z;":""}
        forwardLinearDepth();
        forwardTextureCoordinates();
        forwardColorUV();
        forwardNormalUV();
        forwardEmissiveUV();
        forwardOcclusionUV();
        forwardMetallicRoughnessUV();
      }
    `),t.include(a.HQ,e),t.include(x.kA,e),t.include(_.n,e),t.include(O.S,e),t.include(e.instancedDoublePrecision?S.G:S.Bz,e),t.include(b.Q,e),(0,R.yu)(V,e),V.uniforms.add(r.uniforms.get("localOrigin"),new N.t("ambient",(e=>e.ambient)),new N.t("diffuse",(e=>e.diffuse)),new L.m("opacity",(e=>e.opacity)),new L.m("layerOpacity",(e=>e.layerOpacity))),e.hasColorTexture&&V.uniforms.add(new B.N("tex",(e=>e.texture))),t.include(E._Z,e),t.include(A.c,e),V.include(I.N),t.include(y.r,e),(0,x.a8)(V),(0,x.eU)(V),(0,T.O4)(V),e.transparencyPassType===F.y.ColorAlpha&&(t.outputs.add("fragColor","vec4",0),t.outputs.add("fragAlpha","float",1)),V.code.add(H.H`
      void main() {
        discardBySlice(vpos);
        ${e.multipassEnabled?"terrainDepthTest(depth);":""}
        ${e.hasColorTexture?H.H`
                vec4 texColor = texture(tex, ${e.hasColorTextureTransform?H.H`colorUV`:H.H`vuv0`});
                ${e.textureAlphaPremultiplied?"texColor.rgb /= texColor.a;":""}
                discardOrAdjustAlpha(texColor);`:H.H`vec4 texColor = vec4(1.0);`}
        shadingParams.viewDirection = normalize(vpos - cameraPosition);
        ${e.normalType===c.W.ScreenDerivative?H.H`
                vec3 normal = screenDerivativeNormal(vPositionLocal);`:H.H`
                shadingParams.normalView = vNormalWorld;
                vec3 normal = shadingNormal(shadingParams);`}
        ${e.pbrMode===E.A9.Normal?"applyPBRFactors();":""}
        float ssao = evaluateAmbientOcclusionInverse() * getBakedOcclusion();

        vec3 posWorld = vpos + localOrigin;

        float additionalAmbientScale = additionalDirectedAmbientLight(posWorld);
        float shadow = ${e.receiveShadows?"readShadowMap(vpos, linearDepth)":e.spherical?"lightingGlobalFactor * (1.0 - additionalAmbientScale)":"0.0"};

        vec3 matColor = max(ambient, diffuse);
        ${e.hasVertexColors?H.H`
                vec3 albedo = mixExternalColor(vColor.rgb * matColor, texColor.rgb, vcolorExt.rgb, int(colorMixMode));
                float opacity_ = layerOpacity * mixExternalOpacity(vColor.a * opacity, texColor.a, vcolorExt.a, int(colorMixMode));`:H.H`
                vec3 albedo = mixExternalColor(matColor, texColor.rgb, vcolorExt.rgb, int(colorMixMode));
                float opacity_ = layerOpacity * mixExternalOpacity(opacity, texColor.a, vcolorExt.a, int(colorMixMode));`}
        ${e.hasNormalTexture?H.H`
                mat3 tangentSpace = ${e.hasVertexTangents?"computeTangentSpace(normal);":"computeTangentSpace(normal, vpos, vuv0);"}
                vec3 shadingNormal = computeTextureNormal(tangentSpace, ${e.hasNormalTextureTransform?H.H`normalUV`:"vuv0"});`:H.H`vec3 shadingNormal = normal;`}
        vec3 normalGround = ${e.spherical?H.H`normalize(posWorld);`:H.H`vec3(0.0, 0.0, 1.0);`}

        ${e.snowCover?H.H`
                float snow = smoothstep(0.5, 0.55, dot(normal, normalGround));
                albedo = mix(albedo, vec3(1), snow);
                shadingNormal = mix(shadingNormal, normal, snow);
                ssao = mix(ssao, 1.0, snow);`:""}

        vec3 additionalLight = ssao * mainLightIntensity * additionalAmbientScale * ambientBoostFactor * lightingGlobalFactor;

        ${e.pbrMode===E.A9.Normal||e.pbrMode===E.A9.Schematic?H.H`
                float additionalAmbientIrradiance = additionalAmbientIrradianceFactor * mainLightIntensity[2];
                ${e.snowCover?H.H`
                        mrr = mix(mrr, vec3(0.0, 1.0, 0.04), snow);
                        emission = mix(emission, vec3(0.0), snow);`:""}

                vec3 shadedColor = evaluateSceneLightingPBR(shadingNormal, albedo, shadow, 1.0 - ssao, additionalLight, shadingParams.viewDirection, normalGround, mrr, emission, additionalAmbientIrradiance);`:H.H`vec3 shadedColor = evaluateSceneLighting(shadingNormal, albedo, shadow, 1.0 - ssao, additionalLight);`}
        fragColor = highlightSlice(vec4(shadedColor, opacity_), vpos);
        ${e.transparencyPassType===F.y.ColorAlpha?H.H`
                  fragColor = premultiplyAlpha(fragColor);
                  fragAlpha = fragColor.a;`:""}
      }
    `)}return t.include(v.E,e),t}const G=Object.freeze(Object.defineProperty({__proto__:null,build:V},Symbol.toStringTag,{value:"Module"}))},90873:function(e,t,r){r.d(t,{R:function(){return B},b:function(){return D}});var n=r(4468),i=r(76354),o=r(35277),a=r(65117),s=r(91595),l=r(85273),c=r(39102),u=r(86286),d=r(84284),h=r(66856),f=r(98774),m=r(95866),p=r(59691),v=r(78378),g=r(16054),_=r(11565),x=r(43297),T=r(45018),b=r(12391),y=r(30341),A=r(44077),E=r(29155),S=r(60047),w=r(20056),M=r(18967),C=r(4357),O=r(43494),I=r(7606),R=r(76527),N=r(53051),P=r(93687),L=r(84205),H=r(814);function D(e){const t=new N.N5,{vertex:r,fragment:D,varyings:B}=t;return(0,M.NB)(r,e),t.include(u.I),B.add("vpos","vec3"),t.include(A.A,e),t.include(l.BK,e),t.include(m.G,e),e.output===o.V.Color&&((0,M.yu)(t.vertex,e),t.include(c.Y,e),t.include(s.d,e),e.offsetBackfaces&&t.include(i.M),e.instancedColor&&t.attributes.add(H.r.INSTANCECOLOR,"vec4"),B.add("vNormalWorld","vec3"),B.add("localvpos","vec3"),e.multipassEnabled&&B.add("depth","float"),t.include(h.U,e),t.include(n.oD,e),t.include(d.K,e),t.include(f.c,e),r.uniforms.add(new O.E("externalColor",(e=>e.externalColor))),B.add("vcolorExt","vec4"),r.code.add(R.H`
        void main(void) {
          forwardNormalizedVertexColor();
          vcolorExt = externalColor;
          ${e.instancedColor?"vcolorExt *= instanceColor * 0.003921568627451;":""}
          vcolorExt *= vvColor();
          vcolorExt *= getSymbolColor();
          forwardColorMixMode();

          if (vcolorExt.a < ${R.H.float(E.y)}) {
            gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
          } else {
            vpos = getVertexInLocalOriginSpace();
            localvpos = vpos - view[3].xyz;
            vpos = subtractOrigin(vpos);
            vNormalWorld = dpNormal(vvLocalNormal(normalModel()));
            vpos = addVerticalOffset(vpos, localOrigin);
            gl_Position = transformPosition(proj, view, vpos);
            ${e.offsetBackfaces?"gl_Position = offsetBackfacingClipPosition(gl_Position, vpos, vNormalWorld, cameraPosition);":""}
          }
          ${e.multipassEnabled?R.H`depth = (view * vec4(vpos, 1.0)).z;`:""}
          forwardLinearDepth();
          forwardTextureCoordinates();
        }
      `)),e.output===o.V.Color&&(t.include(a.HQ,e),t.include(g.kA,e),t.include(v.n,e),t.include(S.S,e),t.include(e.instancedDoublePrecision?y.G:y.Bz,e),t.include(x.Q,e),(0,M.yu)(t.fragment,e),(0,_.Gc)(D),(0,g.a8)(D),(0,g.eU)(D),D.uniforms.add(r.uniforms.get("localOrigin"),r.uniforms.get("view"),new C.t("ambient",(e=>e.ambient)),new C.t("diffuse",(e=>e.diffuse)),new I.m("opacity",(e=>e.opacity)),new I.m("layerOpacity",(e=>e.layerOpacity))),e.hasColorTexture&&D.uniforms.add(new P.N("tex",(e=>e.texture))),t.include(b._Z,e),t.include(T.c,e),D.include(w.N),e.transparencyPassType===L.y.ColorAlpha&&(t.outputs.add("fragColor","vec4",0),t.outputs.add("fragAlpha","float",1)),(0,_.O4)(D),D.code.add(R.H`
      void main() {
        discardBySlice(vpos);
        ${e.multipassEnabled?R.H`terrainDepthTest(depth);`:""}
        ${e.hasColorTexture?R.H`
                vec4 texColor = texture(tex, ${e.hasColorTextureTransform?R.H`colorUV`:R.H`vuv0`});
                ${e.textureAlphaPremultiplied?"texColor.rgb /= texColor.a;":""}
                discardOrAdjustAlpha(texColor);`:R.H`vec4 texColor = vec4(1.0);`}
        vec3 viewDirection = normalize(vpos - cameraPosition);
        ${e.pbrMode===b.A9.Normal?"applyPBRFactors();":""}
        float ssao = evaluateAmbientOcclusionInverse();
        ssao *= getBakedOcclusion();

        float additionalAmbientScale = additionalDirectedAmbientLight(vpos + localOrigin);
        vec3 additionalLight = ssao * mainLightIntensity * additionalAmbientScale * ambientBoostFactor * lightingGlobalFactor;
        ${e.receiveShadows?"float shadow = readShadowMap(vpos, linearDepth);":e.spherical?"float shadow = lightingGlobalFactor * (1.0 - additionalAmbientScale);":"float shadow = 0.0;"}
        vec3 matColor = max(ambient, diffuse);
        ${e.hasVertexColors?R.H`
                vec3 albedo = mixExternalColor(vColor.rgb * matColor, texColor.rgb, vcolorExt.rgb, int(colorMixMode));
                float opacity_ = layerOpacity * mixExternalOpacity(vColor.a * opacity, texColor.a, vcolorExt.a, int(colorMixMode));`:R.H`
                vec3 albedo = mixExternalColor(matColor, texColor.rgb, vcolorExt.rgb, int(colorMixMode));
                float opacity_ = layerOpacity * mixExternalOpacity(opacity, texColor.a, vcolorExt.a, int(colorMixMode));`}
        ${e.snowCover?R.H`albedo = mix(albedo, vec3(1), 0.9);`:R.H``}
        ${R.H`
            vec3 shadingNormal = normalize(vNormalWorld);
            albedo *= 1.2;
            vec3 viewForward = vec3(view[0][2], view[1][2], view[2][2]);
            float alignmentLightView = clamp(dot(viewForward, -mainLightDirection), 0.0, 1.0);
            float transmittance = 1.0 - clamp(dot(viewForward, shadingNormal), 0.0, 1.0);
            float treeRadialFalloff = vColor.r;
            float backLightFactor = 0.5 * treeRadialFalloff * alignmentLightView * transmittance * (1.0 - shadow);
            additionalLight += backLightFactor * mainLightIntensity;`}
        ${e.pbrMode===b.A9.Normal||e.pbrMode===b.A9.Schematic?e.spherical?R.H`vec3 normalGround = normalize(vpos + localOrigin);`:R.H`vec3 normalGround = vec3(0.0, 0.0, 1.0);`:R.H``}
        ${e.pbrMode===b.A9.Normal||e.pbrMode===b.A9.Schematic?R.H`
                float additionalAmbientIrradiance = additionalAmbientIrradianceFactor * mainLightIntensity[2];
                ${e.snowCover?R.H`
                        mrr = vec3(0.0, 1.0, 0.04);
                        emission = vec3(0.0);`:""}

                vec3 shadedColor = evaluateSceneLightingPBR(shadingNormal, albedo, shadow, 1.0 - ssao, additionalLight, viewDirection, normalGround, mrr, emission, additionalAmbientIrradiance);`:R.H`vec3 shadedColor = evaluateSceneLighting(shadingNormal, albedo, shadow, 1.0 - ssao, additionalLight);`}
        fragColor = highlightSlice(vec4(shadedColor, opacity_), vpos);
        ${e.transparencyPassType===L.y.ColorAlpha?R.H`
                fragColor = premultiplyAlpha(fragColor);
                fragAlpha = fragColor.a;`:""}
      }
    `)),t.include(p.E,e),t}const B=Object.freeze(Object.defineProperty({__proto__:null,build:D},Symbol.toStringTag,{value:"Module"}))},37595:function(e,t,r){r.d(t,{S:function(){return g},b:function(){return m},g:function(){return p}});var n=r(24667),i=r(3009),o=r(24030),a=r(75930),s=r(70243),l=r(93348),c=r(7606),u=r(76527),d=r(53051),h=r(93687);const f=16;function m(){const e=new d.N5,t=e.fragment;return e.include(o.c),e.include(s.Ir),t.include(a.E),t.uniforms.add(new c.m("radius",((e,t)=>p(t.camera)))).code.add(u.H`vec3 sphere[16] = vec3[16](
vec3(0.186937, 0.0, 0.0),
vec3(0.700542, 0.0, 0.0),
vec3(-0.864858, -0.481795, -0.111713),
vec3(-0.624773, 0.102853, -0.730153),
vec3(-0.387172, 0.260319, 0.007229),
vec3(-0.222367, -0.642631, -0.707697),
vec3(-0.01336, -0.014956, 0.169662),
vec3(0.122575, 0.1544, -0.456944),
vec3(-0.177141, 0.85997, -0.42346),
vec3(-0.131631, 0.814545, 0.524355),
vec3(-0.779469, 0.007991, 0.624833),
vec3(0.308092, 0.209288,0.35969),
vec3(0.359331, -0.184533, -0.377458),
vec3(0.192633, -0.482999, -0.065284),
vec3(0.233538, 0.293706, -0.055139),
vec3(0.417709, -0.386701, 0.442449)
);
float fallOffFunction(float vv, float vn, float bias) {
float f = max(radius * radius - vv, 0.0);
return f * f * f * max(vn - bias, 0.0);
}`),t.code.add(u.H`float aoValueFromPositionsAndNormal(vec3 C, vec3 n_C, vec3 Q) {
vec3 v = Q - C;
float vv = dot(v, v);
float vn = dot(normalize(v), n_C);
return fallOffFunction(vv, vn, 0.1);
}`),t.uniforms.add(new h.N("normalMap",(e=>e.normalTexture)),new h.N("depthMap",(e=>e.depthTexture)),new c.m("projScale",(e=>e.projScale)),new h.N("rnm",(e=>e.noiseTexture)),new l.G("rnmScale",((e,t)=>(0,n.hZ)(v,t.camera.fullWidth/e.noiseTexture.descriptor.width,t.camera.fullHeight/e.noiseTexture.descriptor.height))),new c.m("intensity",(e=>e.intensity)),new l.G("screenSize",((e,t)=>(0,n.hZ)(v,t.camera.fullWidth,t.camera.fullHeight)))),e.outputs.add("fragOcclusion","float"),t.code.add(u.H`
    void main(void) {
      float depth = depthFromTexture(depthMap, uv);

      // Early out if depth is out of range, such as in the sky
      if (depth >= 1.0 || depth <= 0.0) {
        fragOcclusion = 1.0;
        return;
      }

      // get the normal of current fragment
      vec4 norm4 = texture(normalMap, uv);
      if(norm4.a != 1.0) {
        fragOcclusion = 1.0;
        return;
      }
      vec3 norm = vec3(-1.0) + 2.0 * norm4.xyz;

      float currentPixelDepth = linearizeDepth(depth);
      vec3 currentPixelPos = reconstructPosition(gl_FragCoord.xy, currentPixelDepth);

      float sum = 0.0;
      vec3 tapPixelPos;

      vec3 fres = normalize(2.0 * texture(rnm, uv * rnmScale).xyz - 1.0);

      // note: the factor 2.0 should not be necessary, but makes ssao much nicer.
      // bug or deviation from CE somewhere else?
      float ps = projScale / (2.0 * currentPixelPos.z * zScale.x + zScale.y);

      for(int i = 0; i < ${u.H.int(f)}; ++i) {
        vec2 unitOffset = reflect(sphere[i], fres).xy;
        vec2 offset = vec2(-unitOffset * radius * ps);

        // don't use current or very nearby samples
        if( abs(offset.x) < 2.0 || abs(offset.y) < 2.0){
          continue;
        }

        vec2 tc = vec2(gl_FragCoord.xy + offset);
        if (tc.x < 0.0 || tc.y < 0.0 || tc.x > screenSize.x || tc.y > screenSize.y) continue;
        vec2 tcTap = tc / screenSize;
        float occluderFragmentDepth = linearDepthFromTexture(depthMap, tcTap);

        tapPixelPos = reconstructPosition(tc, occluderFragmentDepth);

        sum += aoValueFromPositionsAndNormal(currentPixelPos, norm, tapPixelPos);
      }

      // output the result
      float A = max(1.0 - sum * intensity / float(${u.H.int(f)}), 0.0);

      // Anti-tone map to reduce contrast and drag dark region farther: (x^0.2 + 1.2 * x^4) / 2.2
      A = (pow(A, 0.2) + 1.2 * A*A*A*A) / 2.2;

      fragOcclusion = A;
    }
  `),e}function p(e){return Math.max(10,20*e.computeScreenPixelSizeAtDist(Math.abs(4*e.relativeElevation)))}const v=(0,i.vt)(),g=Object.freeze(Object.defineProperty({__proto__:null,build:m,getRadius:p},Symbol.toStringTag,{value:"Module"}))},70836:function(e,t,r){r.d(t,{S:function(){return m},b:function(){return f}});var n=r(3568),i=r(24030),o=r(75930),a=r(57977),s=r(7606),l=r(76527),c=r(53051),u=r(62054),d=r(93687);const h=4;function f(){const e=new c.N5,t=e.fragment;e.include(i.c);const r=(h+1)/2,f=1/(2*r*r);return t.include(o.E),t.uniforms.add(new d.N("depthMap",(e=>e.depthTexture)),new u.o("tex",(e=>e.colorTexture)),new a.t("blurSize",(e=>e.blurSize)),new s.m("projScale",((e,t)=>{const r=(0,n.p)(t.camera.eye,t.camera.center);return r>5e4?Math.max(0,e.projScale-(r-5e4)):e.projScale}))),t.code.add(l.H`
    void blurFunction(vec2 uv, float r, float center_d, float sharpness, inout float wTotal, inout float bTotal) {
      float c = texture(tex, uv).r;
      float d = linearDepthFromTexture(depthMap, uv);

      float ddiff = d - center_d;

      float w = exp(-r * r * ${l.H.float(f)} - ddiff * ddiff * sharpness);
      wTotal += w;
      bTotal += w * c;
    }
  `),e.outputs.add("fragBlur","float"),t.code.add(l.H`
    void main(void) {
      float b = 0.0;
      float w_total = 0.0;

      float center_d = linearDepthFromTexture(depthMap, uv);

      float sharpness = -0.05 * projScale / center_d;
      for (int r = -${l.H.int(h)}; r <= ${l.H.int(h)}; ++r) {
        float rf = float(r);
        vec2 uvOffset = uv + rf * blurSize;
        blurFunction(uvOffset, rf, center_d, sharpness, w_total, b);
      }

      fragBlur = b / w_total;
    }
  `),e}const m=Object.freeze(Object.defineProperty({__proto__:null,build:f},Symbol.toStringTag,{value:"Module"}))},65720:function(e,t,r){r.d(t,{a:function(){return i},b:function(){return c},c:function(){return o},d:function(){return n},e:function(){return u},f:function(){return s},n:function(){return d},s:function(){return l},t:function(){return a}});r(9302),r(8660);function n(e,t,r){i(e.typedBuffer,t.typedBuffer,r,e.typedBufferStride,t.typedBufferStride)}function i(e,t,r,n=3,i=n){if(e.length/n!==Math.ceil(t.length/i))return e;const o=e.length/n,a=r[0],s=r[1],l=r[2],c=r[4],u=r[5],d=r[6],h=r[8],f=r[9],m=r[10],p=r[12],v=r[13],g=r[14];let _=0,x=0;for(let T=0;T<o;T++){const r=t[_],o=t[_+1],T=t[_+2];e[x]=a*r+c*o+h*T+p,e[x+1]=s*r+u*o+f*T+v,e[x+2]=l*r+d*o+m*T+g,_+=i,x+=n}return e}function o(e,t,r){a(e.typedBuffer,t.typedBuffer,r,e.typedBufferStride,t.typedBufferStride)}function a(e,t,r,n=3,i=n){if(e.length/n!==Math.ceil(t.length/i))return;const o=e.length/n,a=r[0],s=r[1],l=r[2],c=r[3],u=r[4],d=r[5],h=r[6],f=r[7],m=r[8];let p=0,v=0;for(let g=0;g<o;g++){const r=t[p],o=t[p+1],g=t[p+2];e[v]=a*r+c*o+h*g,e[v+1]=s*r+u*o+f*g,e[v+2]=l*r+d*o+m*g,p+=i,v+=n}}function s(e,t,r){l(e.typedBuffer,t.typedBuffer,r,e.typedBufferStride,t.typedBufferStride)}function l(e,t,r,n=3,i=n){const o=Math.min(e.length/n,t.length/i);let a=0,s=0;for(let l=0;l<o;l++)e[s]=r*t[a],e[s+1]=r*t[a+1],e[s+2]=r*t[a+2],a+=i,s+=n;return e}function c(e,t,r,n=3,i=n){const o=e.length/n;if(o!==Math.ceil(t.length/i))return e;let a=0,s=0;for(let l=0;l<o;l++)e[s]=t[a]+r[0],e[s+1]=t[a+1]+r[1],e[s+2]=t[a+2]+r[2],a+=i,s+=n;return e}function u(e,t){d(e.typedBuffer,t.typedBuffer,e.typedBufferStride,t.typedBufferStride)}function d(e,t,r=3,n=r){const i=Math.min(e.length/r,t.length/n);let o=0,a=0;for(let s=0;s<i;s++){const i=t[o],s=t[o+1],l=t[o+2],c=i*i+s*s+l*l;if(c>0){const t=1/Math.sqrt(c);e[a]=t*i,e[a+1]=t*s,e[a+2]=t*l}o+=n,a+=r}}function h(e,t,r){const n=Math.min(e.count,t.count),i=e.typedBuffer,o=e.typedBufferStride,a=t.typedBuffer,s=t.typedBufferStride;let l=0,c=0;for(let u=0;u<n;u++)i[c]=a[l]>>r,i[c+1]=a[l+1]>>r,i[c+2]=a[l+2]>>r,l+=s,c+=o}Object.freeze(Object.defineProperty({__proto__:null,normalize:d,normalizeView:u,scale:l,scaleView:s,shiftRight:h,transformMat3:a,transformMat3View:o,transformMat4:i,transformMat4View:n,translate:c},Symbol.toStringTag,{value:"Module"}))},75656:function(e,t,r){r.d(t,{a:function(){return s},b:function(){return u},n:function(){return c},s:function(){return d},t:function(){return l}});r(9302);var n=r(8660);const i=()=>n.A.getLogger("esri.views.3d.support.buffer.math");function o(e,t,r){if(e.count!==t.count)return;const n=e.count,i=r[0],o=r[1],a=r[2],s=r[3],l=r[4],c=r[5],u=r[6],d=r[7],h=r[8],f=r[9],m=r[10],p=r[11],v=r[12],g=r[13],_=r[14],x=r[15],T=e.typedBuffer,b=e.typedBufferStride,y=t.typedBuffer,A=t.typedBufferStride;for(let E=0;E<n;E++){const e=E*b,t=E*A,r=y[t],n=y[t+1],S=y[t+2],w=y[t+3];T[e]=i*r+l*n+h*S+v*w,T[e+1]=o*r+c*n+f*S+g*w,T[e+2]=a*r+u*n+m*S+_*w,T[e+3]=s*r+d*n+p*S+x*w}}function a(e,t,r,n=4,o=n){if(e.length/n!=t.length/o)return void i().error("source and destination buffers need to have the same number of elements");const a=e.length/n,s=r[0],l=r[1],c=r[2],u=r[3],d=r[4],h=r[5],f=r[6],m=r[7],p=r[8],v=r[9],g=r[10],_=r[11],x=r[12],T=r[13],b=r[14],y=r[15];let A=0,E=0;for(let i=0;i<a;i++){const r=t[A],i=t[A+1],a=t[A+2],S=t[A+3];e[E]=s*r+d*i+p*a+x*S,e[E+1]=l*r+h*i+v*a+T*S,e[E+2]=c*r+f*i+g*a+b*S,e[E+3]=u*r+m*i+_*a+y*S,A+=o,E+=n}}function s(e,t,r){l(e.typedBuffer,t.typedBuffer,r,e.typedBufferStride,t.typedBufferStride)}function l(e,t,r,n=4,i=n){if(e.length/n!=t.length/i)return;const o=e.length/n,a=r[0],s=r[1],l=r[2],c=r[3],u=r[4],d=r[5],h=r[6],f=r[7],m=r[8];let p=0,v=0;for(let g=0;g<o;g++){const r=t[p],o=t[p+1],g=t[p+2],_=t[p+3];e[v]=a*r+c*o+h*g,e[v+1]=s*r+u*o+f*g,e[v+2]=l*r+d*o+m*g,e[v+3]=_,p+=i,v+=n}}function c(e,t){const r=Math.min(e.count,t.count),n=e.typedBuffer,i=e.typedBufferStride,o=t.typedBuffer,a=t.typedBufferStride;for(let s=0;s<r;s++){const e=s*i,t=s*a,r=o[t],l=o[t+1],c=o[t+2],u=r*r+l*l+c*c;if(u>0){const t=1/Math.sqrt(u);n[e]=t*r,n[e+1]=t*l,n[e+2]=t*c}}}function u(e,t,r){d(e.typedBuffer,t,r,e.typedBufferStride)}function d(e,t,r,n=4){const i=Math.min(e.length/n,t.count),o=t.typedBuffer,a=t.typedBufferStride;let s=0,l=0;for(let c=0;c<i;c++)e[l]=r*o[s],e[l+1]=r*o[s+1],e[l+2]=r*o[s+2],e[l+3]=r*o[s+3],s+=a,l+=n}Object.freeze(Object.defineProperty({__proto__:null,normalize:c,scale:d,scaleView:u,transformMat3:l,transformMat3View:s,transformMat4:a,transformMat4View:o},Symbol.toStringTag,{value:"Module"}))},157:function(e,t,r){r.d(t,{O:function(){return n}});class n{constructor(){this._outer=new Map}clear(){this._outer.clear()}get empty(){return 0===this._outer.size}get(e,t){return this._outer.get(e)?.get(t)}set(e,t,r){const n=this._outer.get(e);n?n.set(t,r):this._outer.set(e,new Map([[t,r]]))}delete(e,t){const r=this._outer.get(e);r&&(r.delete(t),0===r.size&&this._outer.delete(e))}forEach(e){this._outer.forEach(((t,r)=>e(t,r)))}}},5186:function(e,t,r){r.d(t,{R:function(){return i}});var n=r(18244);let i=class e{constructor(e,t,r=""){this.major=e,this.minor=t,this._context=r}lessThan(e,t){return this.major<e||e===this.major&&this.minor<t}since(e,t){return!this.lessThan(e,t)}validate(e){if(this.major!==e.major){const t=this._context&&this._context+":",r=this._context&&this._context+" ";throw new n.A(t+"unsupported-version",`Required major ${r}version is '${this.major}', but got '\${version.major}.\${version.minor}'`,{version:e})}}clone(){return new e(this.major,this.minor,this._context)}static parse(t,r=""){const[i,o]=t.split("."),a=/^\s*\d+\s*$/;if(!i?.match||!a.test(i))throw new n.A((r&&r+":")+"invalid-version","Expected major version to be a number, but got '${version}'",{version:t});if(!o?.match||!a.test(o))throw new n.A((r&&r+":")+"invalid-version","Expected minor version to be a number, but got '${version}'",{version:t});const s=parseInt(i,10),l=parseInt(o,10);return new e(s,l,r)}}},97787:function(e,t,r){function n(e){return e=e||globalThis.location.hostname,c.some((t=>null!=e?.match(t)))}function i(e,t){return e&&(t=t||globalThis.location.hostname)?null!=t.match(o)||null!=t.match(s)?e.replace("static.arcgis.com","staticdev.arcgis.com"):null!=t.match(a)||null!=t.match(l)?e.replace("static.arcgis.com","staticqa.arcgis.com"):e:e}r.d(t,{EM:function(){return i},b5:function(){return n}});const o=/^devext\.arcgis\.com$/,a=/^qaext\.arcgis\.com$/,s=/^[\w-]*\.mapsdevext\.arcgis\.com$/,l=/^[\w-]*\.mapsqa\.arcgis\.com$/,c=[/^([\w-]*\.)?[\w-]*\.zrh-dev-local\.esri\.com$/,o,a,/^jsapps\.esri\.com$/,s,l]},21842:function(e,t,r){r.d(t,{oe:function(){return i}});r(16573),r(78100),r(77936),r(37467),r(44732),r(79577);var n=r(22721);function i(e,t=!1){return e<=n.y9?t?new Array(e).fill(0):new Array(e):new Float32Array(e)}},61832:function(e,t,r){r.d(t,{Dg:function(){return i},my:function(){return a},tM:function(){return u}});r(16573),r(78100),r(77936),r(37467),r(44732),r(79577);var n=r(22721);function i(e){if((0,n.cy)(e)){if(e.length<n.y9)return e}else if(e.length<n.y9)return Array.from(e);let t=!0,r=!0;return e.some(((e,n)=>(t=t&&0===e,r=r&&e===n,!t&&!r))),t?h(e.length):r?u(e.length):(0,n.cy)(e)||e.BYTES_PER_ELEMENT!==Uint16Array.BYTES_PER_ELEMENT?o(e):e}function o(e){let t=!0;for(const r of e){if(r>=65536)return(0,n.cy)(e)?new Uint32Array(e):e;r>=256&&(t=!1)}return t?new Uint8Array(e):new Uint16Array(e)}function a(e){return e<=n.y9?new Array(e):e<=65536?new Uint16Array(e):new Uint32Array(e)}let s=(()=>{const e=new Uint32Array(131072);for(let t=0;t<e.length;++t)e[t]=t;return e})();const l=[0],c=(()=>{const e=new Uint16Array(65536);for(let t=0;t<e.length;++t)e[t]=t;return e})();function u(e){if(1===e)return l;if(e<n.y9)return Array.from(new Uint16Array(c.buffer,0,e));if(e<c.length)return new Uint16Array(c.buffer,0,e);if(e>s.length){const t=Math.max(2*s.length,e);s=new Uint32Array(t);for(let e=0;e<s.length;e++)s[e]=e}return new Uint32Array(s.buffer,0,e)}let d=new Uint8Array(65536);function h(e){if(1===e)return l;if(e<n.y9)return new Array(e).fill(0);if(e>d.length){const t=Math.max(2*d.length,e);d=new Uint8Array(t)}return new Uint8Array(d.buffer,0,e)}},85998:function(e,t,r){r.d(t,{Cr:function(){return c},H6:function(){return h},_I:function(){return d},kb:function(){return u},vt:function(){return l}});var n=r(27165),i=r(73635),o=r(3568),a=r(74344),s=r(383);function l(e){return e?{origin:(0,a.o8)(e.origin),vector:(0,a.o8)(e.vector)}:{origin:(0,a.vt)(),vector:(0,a.vt)()}}function c(e,t,r=l()){return(0,o.c)(r.origin,e),(0,o.f)(r.vector,t,e),r}function u(e,t){const r=(0,o.f)(s.rq.get(),t,e.origin),i=(0,o.m)(e.vector,r),a=(0,o.m)(e.vector,e.vector),l=(0,n.qE)(i/a,0,1),c=(0,o.f)(s.rq.get(),(0,o.j)(s.rq.get(),e.vector,l),r);return(0,o.m)(c,c)}function d(e,t,r){return h(e,t,0,1,r)}function h(e,t,r,i,a){const{vector:l,origin:c}=e,u=(0,o.f)(s.rq.get(),t,c),d=(0,o.m)(l,u)/(0,o.q)(l);return(0,o.j)(a,l,(0,n.qE)(d,r,i)),(0,o.g)(a,a,e.origin)}(0,a.vt)(),(0,a.vt)(),new i.I((()=>l()))},8499:function(e,t,r){r.d(t,{D:function(){return i}});var n=r(5049);async function i(e,t){const{data:r}=await(0,n.A)(e,{responseType:"image",...t});return r}},39082:function(e,t,r){r.d(t,{fetch:function(){return Sn}});r(44114),r(16573),r(78100),r(77936),r(37467),r(44732),r(79577);var n=r(97787),i=r(27165),o=r(4260),a=r(36816),s=r(44337),l=r(17455),c=r(3009),u=r(3568),d=r(74344),h=r(16686),f=r(21842),m=r(67008),p=r(65720),v=r(75656),g=r(93295),_=r(27719),x=r(53416),T=r(95773),b=r(30940),y=r(46236),A=r(76600),E=r(1206);function S(e){if(null==e)return null;const t=null!=e.offset?e.offset:E.uY,r=null!=e.rotation?e.rotation:0,n=null!=e.scale?e.scale:E.Un,i=(0,a.fA)(1,0,0,0,1,0,t[0],t[1],1),s=(0,a.fA)(Math.cos(r),-Math.sin(r),0,Math.sin(r),Math.cos(r),0,0,0,1),l=(0,a.fA)(n[0],0,0,0,n[1],0,0,0,1),c=(0,a.vt)();return(0,o.lw)(c,s,l),(0,o.lw)(c,i,c),c}class w{constructor(){this.geometries=new Array,this.materials=new Array,this.textures=new Array}}class M{constructor(e,t,r){this.name=e,this.lodThreshold=t,this.pivotOffset=r,this.stageResources=new w,this.numberOfVertices=0}}var C=r(5049),O=r(26461),I=r(3315),R=r(18244),N=r(8660),P=r(157),L=r(13570),H=r(5186),D=r(61832),B=r(8499),F=r(62620),z=r(53338),V=r(22721);function G(e){if(e.length<V.y9)return Array.from(e);if((0,V.cy)(e))return Float64Array.from(e);if(!("BYTES_PER_ELEMENT"in e))return Array.from(e);switch(e.BYTES_PER_ELEMENT){case 1:return Uint8Array.from(e);case 2:return(0,V.jq)(e)?Uint16Array.from(e):Int16Array.from(e);case 4:return Float32Array.from(e);default:return Float64Array.from(e)}}var W=r(73405),U=r(24394);class j{constructor(e,t,r){this.primitiveIndices=e,this._numIndexPerPrimitive=t,this.position=r,this._children=void 0,(0,U.vA)(e.length>=1),(0,U.vA)(3===r.size||4===r.size);const{data:n,size:i,indices:o}=r;(0,U.vA)(o.length%this._numIndexPerPrimitive==0),(0,U.vA)(o.length>=e.length*this._numIndexPerPrimitive);const a=e.length;let s=i*o[this._numIndexPerPrimitive*e[0]];q.clear(),q.push(s);const l=(0,d.fA)(n[s],n[s+1],n[s+2]),c=(0,d.o8)(l);for(let u=0;u<a;++u){const t=this._numIndexPerPrimitive*e[u];for(let e=0;e<this._numIndexPerPrimitive;++e){s=i*o[t+e],q.push(s);let r=n[s];l[0]=Math.min(r,l[0]),c[0]=Math.max(r,c[0]),r=n[s+1],l[1]=Math.min(r,l[1]),c[1]=Math.max(r,c[1]),r=n[s+2],l[2]=Math.min(r,l[2]),c[2]=Math.max(r,c[2])}}this.bbMin=l,this.bbMax=c;const h=(0,u.o)((0,d.vt)(),this.bbMin,this.bbMax,.5);this.radius=.5*Math.max(Math.max(c[0]-l[0],c[1]-l[1]),c[2]-l[2]);let f=this.radius*this.radius;for(let u=0;u<q.length;++u){s=q.at(u);const e=n[s]-h[0],t=n[s+1]-h[1],r=n[s+2]-h[2],i=e*e+t*t+r*r;if(i<=f)continue;const o=Math.sqrt(i),a=.5*(o-this.radius);this.radius=this.radius+a,f=this.radius*this.radius;const l=a/o;h[0]+=e*l,h[1]+=t*l,h[2]+=r*l}this.center=h,q.clear()}getChildren(){if(this._children||(0,u.a)(this.bbMin,this.bbMax)<=1)return this._children;const e=(0,u.o)((0,d.vt)(),this.bbMin,this.bbMax,.5),t=this.primitiveIndices.length,r=new Uint8Array(t),n=new Array(8);for(let c=0;c<8;++c)n[c]=0;const{data:i,size:o,indices:a}=this.position;for(let c=0;c<t;++c){let t=0;const s=this._numIndexPerPrimitive*this.primitiveIndices[c];let l=o*a[s],u=i[l],d=i[l+1],h=i[l+2];for(let e=1;e<this._numIndexPerPrimitive;++e){l=o*a[s+e];const t=i[l],r=i[l+1],n=i[l+2];t<u&&(u=t),r<d&&(d=r),n<h&&(h=n)}u<e[0]&&(t|=1),d<e[1]&&(t|=2),h<e[2]&&(t|=4),r[c]=t,++n[t]}let s=0;for(let c=0;c<8;++c)n[c]>0&&++s;if(s<2)return;const l=new Array(8);for(let c=0;c<8;++c)l[c]=n[c]>0?new Uint32Array(n[c]):void 0;for(let c=0;c<8;++c)n[c]=0;for(let c=0;c<t;++c){const e=r[c];l[e][n[e]++]=this.primitiveIndices[c]}this._children=new Array;for(let c=0;c<8;++c)void 0!==l[c]&&this._children.push(new j(l[c],this._numIndexPerPrimitive,this.position));return this._children}static prune(){q.prune()}}const q=new W.A({deallocator:null});var k=r(8530),$=r(29658),Y=r(73635),X=r(85998);r(383);function Z(e){return e?{p0:(0,d.o8)(e.p0),p1:(0,d.o8)(e.p1),p2:(0,d.o8)(e.p2)}:{p0:(0,d.vt)(),p1:(0,d.vt)(),p2:(0,d.vt)()}}function J(e,t,r){return(0,u.f)(K,t,e),(0,u.f)(Q,r,e),.5*(0,u.l)((0,u.b)(K,K,Q))}new Y.I(X.vt),new Y.I((()=>Z()));const K=(0,d.vt)(),Q=(0,d.vt)();function ee(e,t){if(!e)return!1;const{size:r,data:n,indices:i}=e;(0,u.s)(t,0,0,0),(0,u.s)(ae,0,0,0);let o=0,a=0;for(let s=0;s<i.length-2;s+=3){const e=i[s]*r,l=i[s+1]*r,c=i[s+2]*r;(0,u.s)(ne,n[e],n[e+1],n[e+2]),(0,u.s)(ie,n[l],n[l+1],n[l+2]),(0,u.s)(oe,n[c],n[c+1],n[c+2]);const d=J(ne,ie,oe);d?((0,u.g)(ne,ne,ie),(0,u.g)(ne,ne,oe),(0,u.j)(ne,ne,1/3*d),(0,u.g)(t,t,ne),o+=d):((0,u.g)(ae,ae,ne),(0,u.g)(ae,ae,ie),(0,u.g)(ae,ae,oe),a+=3)}return(0!==a||0!==o)&&(0!==o?((0,u.j)(t,t,1/o),!0):0!==a&&((0,u.j)(t,ae,1/a),!0))}function te(e,t){if(!e)return!1;const{size:r,data:n,indices:i}=e;(0,u.s)(t,0,0,0);let o=-1,a=0;for(let s=0;s<i.length;s++){const e=i[s]*r;o!==e&&(t[0]+=n[e],t[1]+=n[e+1],t[2]+=n[e+2],a++),o=e}return a>1&&(0,u.j)(t,t,1/a),a>0}function re(e,t,r){if(!e)return!1;(0,u.s)(r,0,0,0),(0,u.s)(ae,0,0,0);let n=0,i=0;const{size:o,data:a,indices:s}=e,l=s.length-1,c=l+(t?2:0);for(let d=0;d<c;d+=2){const e=d<l?d+1:0,t=s[d<l?d:l]*o,c=s[e]*o;ne[0]=a[t],ne[1]=a[t+1],ne[2]=a[t+2],ie[0]=a[c],ie[1]=a[c+1],ie[2]=a[c+2],(0,u.j)(ne,(0,u.g)(ne,ne,ie),.5);const h=(0,u.F)(ne,ie);h>0?((0,u.g)(r,r,(0,u.j)(ne,ne,h)),n+=h):0===n&&((0,u.g)(ae,ae,ne),i++)}return 0!==n?((0,u.j)(r,r,1/n),!0):0!==i&&((0,u.j)(r,ae,1/i),!0)}const ne=(0,d.vt)(),ie=(0,d.vt)(),oe=(0,d.vt)(),ae=(0,d.vt)();var se=r(30864);class le{constructor(e){this.channel=e,this.id=(0,se.c)()}}var ce=r(814);r(24051);function ue(e,t){return null==e&&(e=[]),e.push(t),e}function de(e,t){if(null==e)return null;const r=e.filter((e=>e!==t));return 0===r.length?null:r}(0,d.vt)(),new Float32Array(6);class he extends k.J{constructor(e,t,r=null,n=$.X.Mesh,i=null,o=-1){super(),this.material=e,this.mapPositions=r,this.type=n,this.objectAndLayerIdColor=i,this.edgeIndicesLength=o,this.visible=!0,this._attributes=new Map,this._boundingInfo=null;for(const[a,s]of t)this._attributes.set(a,{...s,indices:(0,D.Dg)(s.indices)}),a===ce.r.POSITION&&(this.edgeIndicesLength=this.edgeIndicesLength<0?this._attributes.get(a).indices.length:this.edgeIndicesLength)}instantiate(e={}){const t=new he(e.material||this.material,[],this.mapPositions,this.type,this.objectAndLayerIdColor,this.edgeIndicesLength);return this._attributes.forEach(((e,r)=>{e.exclusive=!1,t._attributes.set(r,e)})),t._boundingInfo=this._boundingInfo,t.transformation=e.transformation||this.transformation,t}get attributes(){return this._attributes}getMutableAttribute(e){let t=this._attributes.get(e);return t&&!t.exclusive&&(t={...t,exclusive:!0,data:G(t.data)},this._attributes.set(e,t)),t}setAttributeData(e,t){const r=this._attributes.get(e);r&&this._attributes.set(e,{...r,exclusive:!0,data:t})}get indexCount(){const e=this._attributes.values().next().value.indices;return e?.length??0}get faceCount(){return this.indexCount/3}get boundingInfo(){return null==this._boundingInfo&&(this._boundingInfo=this._calculateBoundingInfo()),this._boundingInfo}computeAttachmentOrigin(e){return!!(this.type===$.X.Mesh?this._computeAttachmentOriginTriangles(e):this.type===$.X.Line?this._computeAttachmentOriginLines(e):this._computeAttachmentOriginPoints(e))&&(null!=this._transformation&&(0,u.h)(e,e,this._transformation),!0)}_computeAttachmentOriginTriangles(e){const t=this.attributes.get(ce.r.POSITION);return ee(t,e)}_computeAttachmentOriginLines(e){const t=this.attributes.get(ce.r.POSITION);return re(t,fe(this.material.parameters,t),e)}_computeAttachmentOriginPoints(e){const t=this.attributes.get(ce.r.POSITION);return te(t,e)}invalidateBoundingInfo(){this._boundingInfo=null}_calculateBoundingInfo(){const e=this.attributes.get(ce.r.POSITION);if(!e||0===e.indices.length)return null;const t=this.type===$.X.Mesh?3:1;(0,U.vA)(e.indices.length%t==0,"Indexing error: "+e.indices.length+" not divisible by "+t);const r=(0,D.tM)(e.indices.length/t);return new j(r,t,e)}get transformation(){return this._transformation??l.zK}set transformation(e){this._transformation=e&&e!==l.zK?(0,l.o8)(e):null}addHighlight(){const e=new le(z.Mg.Highlight);return this.highlights=ue(this.highlights,e),e}removeHighlight(e){this.highlights=de(this.highlights,e)}}function fe(e,t){return!(!("isClosed"in e)||!e.isClosed)&&t.indices.length>2}var me=r(9302),pe=r(41755),ve=r(50942),ge=r(94),_e=r(81776),xe=r(47771);function Te(){return be??=(async()=>{const e=await r.e(5347).then(r.bind(r,65347)),t=await e.default({locateFile:e=>(0,xe.s)(`esri/libs/basisu/${e}`)});return t.initializeBasis(),t})(),be}let be;var ye;!function(e){e[e.ETC1_RGB=0]="ETC1_RGB",e[e.ETC2_RGBA=1]="ETC2_RGBA",e[e.BC1_RGB=2]="BC1_RGB",e[e.BC3_RGBA=3]="BC3_RGBA",e[e.BC4_R=4]="BC4_R",e[e.BC5_RG=5]="BC5_RG",e[e.BC7_M6_RGB=6]="BC7_M6_RGB",e[e.BC7_M5_RGBA=7]="BC7_M5_RGBA",e[e.PVRTC1_4_RGB=8]="PVRTC1_4_RGB",e[e.PVRTC1_4_RGBA=9]="PVRTC1_4_RGBA",e[e.ASTC_4x4_RGBA=10]="ASTC_4x4_RGBA",e[e.ATC_RGB=11]="ATC_RGB",e[e.ATC_RGBA=12]="ATC_RGBA",e[e.FXT1_RGB=17]="FXT1_RGB",e[e.PVRTC2_4_RGB=18]="PVRTC2_4_RGB",e[e.PVRTC2_4_RGBA=19]="PVRTC2_4_RGBA",e[e.ETC2_EAC_R11=20]="ETC2_EAC_R11",e[e.ETC2_EAC_RG11=21]="ETC2_EAC_RG11",e[e.RGBA32=13]="RGBA32",e[e.RGB565=14]="RGB565",e[e.BGR565=15]="BGR565",e[e.RGBA4444=16]="RGBA4444"}(ye||(ye={}));var Ae=r(79721),Ee=r(87501),Se=r(92799);let we=null,Me=null;async function Ce(){return null==Me&&(Me=Te(),we=await Me),Me}function Oe(e,t){if(null==we)return e.byteLength;const r=new we.BasisFile(new Uint8Array(e)),n=Ne(r)?Re(r.getNumLevels(0),r.getHasAlpha(),r.getImageWidth(0,0),r.getImageHeight(0,0),t):0;return r.close(),r.delete(),n}function Ie(e,t){if(null==we)return e.byteLength;const r=new we.KTX2File(new Uint8Array(e)),n=Pe(r)?Re(r.getLevels(),r.getHasAlpha(),r.getWidth(),r.getHeight(),t):0;return r.close(),r.delete(),n}function Re(e,t,r,n,i){const o=(0,Se.IB)(t?Ae.CQ.COMPRESSED_RGBA8_ETC2_EAC:Ae.CQ.COMPRESSED_RGB8_ETC2),a=i&&e>1?(4**e-1)/(3*4**(e-1)):1;return Math.ceil(r*n*o*a)}function Ne(e){return e.getNumImages()>=1&&!e.isUASTC()}function Pe(e){return e.getFaces()>=1&&e.isETC1S()}async function Le(e,t,r){null==we&&(we=await Ce());const n=new we.BasisFile(new Uint8Array(r));if(!Ne(n))return null;n.startTranscoding();const i=De(e,t,n.getNumLevels(0),n.getHasAlpha(),n.getImageWidth(0,0),n.getImageHeight(0,0),((e,t)=>n.getImageTranscodedSizeInBytes(0,e,t)),((e,t,r)=>n.transcodeImage(r,0,e,t,0,0)));return n.close(),n.delete(),i}async function He(e,t,r){null==we&&(we=await Ce());const n=new we.KTX2File(new Uint8Array(r));if(!Pe(n))return null;n.startTranscoding();const i=De(e,t,n.getLevels(),n.getHasAlpha(),n.getWidth(),n.getHeight(),((e,t)=>n.getImageTranscodedSizeInBytes(e,0,0,t)),((e,t,r)=>n.transcodeImage(r,e,0,0,t,0,-1,-1)));return n.close(),n.delete(),i}function De(e,t,r,n,i,o,a,s){const{compressedTextureETC:l,compressedTextureS3TC:c}=e.capabilities,[u,d]=l?n?[ye.ETC2_RGBA,Ae.CQ.COMPRESSED_RGBA8_ETC2_EAC]:[ye.ETC1_RGB,Ae.CQ.COMPRESSED_RGB8_ETC2]:c?n?[ye.BC3_RGBA,Ae.CQ.COMPRESSED_RGBA_S3TC_DXT5_EXT]:[ye.BC1_RGB,Ae.CQ.COMPRESSED_RGB_S3TC_DXT1_EXT]:[ye.RGBA32,Ae.Ab.RGBA],h=t.hasMipmap?r:Math.min(1,r),f=[];for(let m=0;m<h;m++)f.push(new Uint8Array(a(m,u))),s(m,u,f[m]);return t.internalFormat=d,t.hasMipmap=f.length>1,t.samplingMode=t.hasMipmap?Ae.Cj.LINEAR_MIPMAP_LINEAR:Ae.Cj.LINEAR,t.width=i,t.height=o,new Ee.g(e,t,{type:"compressed",levels:f})}const Be=()=>N.A.getLogger("esri.views.3d.webgl-engine.lib.DDSUtil"),Fe=542327876,ze=131072,Ve=4;function Ge(e){return e.charCodeAt(0)+(e.charCodeAt(1)<<8)+(e.charCodeAt(2)<<16)+(e.charCodeAt(3)<<24)}function We(e){return String.fromCharCode(255&e,e>>8&255,e>>16&255,e>>24&255)}const Ue=Ge("DXT1"),je=Ge("DXT3"),qe=Ge("DXT5"),ke=31,$e=0,Ye=1,Xe=2,Ze=3,Je=4,Ke=7,Qe=20,et=21;function tt(e,t,r){const n=rt(r,t.hasMipmap??!1);if(null==n)throw new Error("DDS texture data is null");const{textureData:i,internalFormat:o,width:a,height:s}=n;return t.samplingMode=i.levels.length>1?Ae.Cj.LINEAR_MIPMAP_LINEAR:Ae.Cj.LINEAR,t.hasMipmap=i.levels.length>1,t.internalFormat=o,t.width=a,t.height=s,new Ee.g(e,t,i)}function rt(e,t){const r=new Int32Array(e,0,ke);if(r[$e]!==Fe)return Be().error("Invalid magic number in DDS header"),null;if(!(r[Qe]&Ve))return Be().error("Unsupported format, must contain a FourCC code"),null;const n=r[et];let i,o;switch(n){case Ue:i=8,o=Ae.CQ.COMPRESSED_RGB_S3TC_DXT1_EXT;break;case je:i=16,o=Ae.CQ.COMPRESSED_RGBA_S3TC_DXT3_EXT;break;case qe:i=16,o=Ae.CQ.COMPRESSED_RGBA_S3TC_DXT5_EXT;break;default:return Be().error("Unsupported FourCC code:",We(n)),null}let a=1,s=r[Je],l=r[Ze];(3&s||3&l)&&(Be().warn("Rounding up compressed texture size to nearest multiple of 4."),s=s+3&-4,l=l+3&-4);const c=s,u=l;let d,h;r[Xe]&ze&&!1!==t&&(a=Math.max(1,r[Ke]));let f=r[Ye]+4;const m=[];for(let p=0;p<a;++p)h=(s+3>>2)*(l+3>>2)*i,d=new Uint8Array(e,f,h),m.push(d),f+=h,s=Math.max(1,s>>1),l=Math.max(1,l>>1);return{textureData:{type:"compressed",levels:m},internalFormat:o,width:c,height:u}}function nt(e,t){const r=1048576,n=4096,i=2;let o=e.width*e.height;if(o<n)return e instanceof ImageData?at(e):e;let a=e.width,s=e.height;do{a=Math.ceil(a/i),s=Math.ceil(s/i),o=a*s}while(o>r||null!=t&&(a>t||s>t));return ot(e,a,s)}function it(e,t){const r=Math.max(e.width,e.height);if(r<=t)return e;const n=t/r;return ot(e,Math.round(e.width*n),Math.round(e.height*n))}function ot(e,t,r){if(e instanceof ImageData)return ot(at(e),t,r);const n=document.createElement("canvas");return n.width=t,n.height=r,n.getContext("2d").drawImage(e,0,0,n.width,n.height),n}function at(e){const t=document.createElement("canvas");t.width=e.width,t.height=e.height;const r=t.getContext("2d");if(null==r)throw new R.A("Failed to create 2d context from HTMLCanvasElement");return r.putImageData(e,0,0),t}var st,lt=r(54361);class ct extends k.J{get parameters(){return this._parameters}constructor(e,t){super(),this._data=e,this.type=$.X.Texture,this._glTexture=null,this._loadingPromise=null,this._loadingController=null,this.events=new pe.A,this._parameters={...ht,...t},this._startPreload(e)}dispose(){this.unload(),this._data=this.frameUpdate=void 0}_startPreload(e){null!=e&&(e instanceof HTMLVideoElement?(this.frameUpdate=t=>this._frameUpdate(e,t),this._startPreloadVideoElement(e)):e instanceof HTMLImageElement&&this._startPreloadImageElement(e))}_startPreloadVideoElement(e){if(!((0,ge.w8)(e.src)||"auto"===e.preload&&e.crossOrigin)){e.preload="auto",e.crossOrigin="anonymous";const t=!e.paused;if(e.src=e.src,t&&e.autoplay){const t=()=>{e.removeEventListener("canplay",t),e.play()};e.addEventListener("canplay",t)}}}_startPreloadImageElement(e){(0,ge.DB)(e.src)||(0,ge.w8)(e.src)||e.crossOrigin||(e.crossOrigin="anonymous",e.src=e.src)}_createDescriptor(e){const t=new lt.R;return t.wrapMode=this._parameters.wrap??Ae.pF.REPEAT,t.flipped=!this._parameters.noUnpackFlip,t.samplingMode=this._parameters.mipmap?Ae.Cj.LINEAR_MIPMAP_LINEAR:Ae.Cj.LINEAR,t.hasMipmap=!!this._parameters.mipmap,t.preMultiplyAlpha=!!this._parameters.preMultiplyAlpha,t.maxAnisotropy=this._parameters.maxAnisotropy??(this._parameters.mipmap?e.parameters.maxMaxAnisotropy:1),t}get glTexture(){return this._glTexture}get memoryEstimate(){return this._glTexture?.usedMemory||ut(this._data,this._parameters)}load(e){if(this._glTexture)return this._glTexture;if(this._loadingPromise)return this._loadingPromise;const t=this._data;return null==t?(this._glTexture=new Ee.g(e,this._createDescriptor(e),null),this._glTexture):(this._parameters.reloadable||(this._data=void 0),"string"==typeof t?this._loadFromURL(e,t):t instanceof Image?this._loadFromImageElement(e,t):t instanceof HTMLVideoElement?this._loadFromVideoElement(e,t):t instanceof ImageData||t instanceof HTMLCanvasElement?this._loadFromImage(e,t):((0,V.mw)(t)||(0,V.mg)(t))&&this._parameters.encoding===z.JS.DDS_ENCODING?this._loadFromDDSData(e,t):((0,V.mw)(t)||(0,V.mg)(t))&&this._parameters.encoding===z.JS.KTX2_ENCODING?this._loadFromKTX2(e,t):((0,V.mw)(t)||(0,V.mg)(t))&&this._parameters.encoding===z.JS.BASIS_ENCODING?this._loadFromBasis(e,t):(0,V.mg)(t)?this._loadFromPixelData(e,t):(0,V.mw)(t)?this._loadFromPixelData(e,new Uint8Array(t)):null)}_frameUpdate(e,t){return null==this._glTexture||e.readyState<st.HAVE_CURRENT_DATA||t===e.currentTime?t:(this._glTexture.setData(e),this._glTexture.descriptor.hasMipmap&&this._glTexture.generateMipmap(),this._parameters.updateCallback&&this._parameters.updateCallback(),e.currentTime)}_loadFromDDSData(e,t){return this._glTexture=tt(e,this._createDescriptor(e),t),this._glTexture}_loadFromKTX2(e,t){return this._loadAsync((()=>He(e,this._createDescriptor(e),t).then((e=>(this._glTexture=e,e)))))}_loadFromBasis(e,t){return this._loadAsync((()=>Le(e,this._createDescriptor(e),t).then((e=>(this._glTexture=e,e)))))}_loadFromPixelData(e,t){(0,U.vA)(this._parameters.width>0&&this._parameters.height>0);const r=this._createDescriptor(e);return r.pixelFormat=1===this._parameters.components?Ae.Ab.LUMINANCE:3===this._parameters.components?Ae.Ab.RGB:Ae.Ab.RGBA,r.width=this._parameters.width??0,r.height=this._parameters.height??0,this._glTexture=new Ee.g(e,r,t),this._glTexture}_loadFromURL(e,t){return this._loadAsync((async r=>{const n=await(0,B.D)(t,{signal:r});return(0,L.Te)(r),this._loadFromImage(e,n)}))}_loadFromImageElement(e,t){return t.complete?this._loadFromImage(e,t):this._loadAsync((async r=>{const n=await(0,_e.Sx)(t,t.src,!1,r);return(0,L.Te)(r),this._loadFromImage(e,n)}))}_loadFromVideoElement(e,t){return t.readyState>=st.HAVE_CURRENT_DATA?this._loadFromImage(e,t):this._loadFromVideoElementAsync(e,t)}_loadFromVideoElementAsync(e,t){return this._loadAsync((r=>new Promise(((n,i)=>{const o=()=>{t.removeEventListener("loadeddata",a),t.removeEventListener("error",s),(0,ve.xt)(l)},a=()=>{t.readyState>=st.HAVE_CURRENT_DATA&&(o(),n(this._loadFromImage(e,t)))},s=e=>{o(),i(e||new R.A("Failed to load video"))};t.addEventListener("loadeddata",a),t.addEventListener("error",s);const l=(0,L.u7)(r,(()=>s((0,L.NK)())))}))))}_loadFromImage(e,t){let r=t;if(!(r instanceof HTMLVideoElement)){const{maxTextureSize:t}=e.parameters;r=this._parameters.downsampleUncompressed?nt(r,t):it(r,t)}const n=dt(r);this._parameters.width=n.width,this._parameters.height=n.height;const i=this._createDescriptor(e);return i.pixelFormat=3===this._parameters.components?Ae.Ab.RGB:Ae.Ab.RGBA,i.width=n.width,i.height=n.height,this._glTexture=new Ee.g(e,i,r),this._glTexture}_loadAsync(e){const t=new AbortController;this._loadingController=t;const r=e(t.signal);this._loadingPromise=r;const n=()=>{this._loadingController===t&&(this._loadingController=null),this._loadingPromise===r&&(this._loadingPromise=null)};return r.then(n,n),r}unload(){if(this._glTexture=(0,ve.WD)(this._glTexture),null!=this._loadingController){const e=this._loadingController;this._loadingController=null,this._loadingPromise=null,e.abort()}this.events.emit("unloaded")}}function ut(e,t){if(null==e)return 0;if((0,V.mw)(e)||(0,V.mg)(e))return t.encoding===z.JS.KTX2_ENCODING?Ie(e,!!t.mipmap):t.encoding===z.JS.BASIS_ENCODING?Oe(e,!!t.mipmap):e.byteLength;const{width:r,height:n}=e instanceof Image||e instanceof ImageData||e instanceof HTMLCanvasElement||e instanceof HTMLVideoElement?dt(e):t;return(t.mipmap?4/3:1)*r*n*(t.components||4)||0}function dt(e){return e instanceof HTMLVideoElement?{width:e.videoWidth,height:e.videoHeight}:e}!function(e){e[e.HAVE_NOTHING=0]="HAVE_NOTHING",e[e.HAVE_METADATA=1]="HAVE_METADATA",e[e.HAVE_CURRENT_DATA=2]="HAVE_CURRENT_DATA",e[e.HAVE_FUTURE_DATA=3]="HAVE_FUTURE_DATA",e[e.HAVE_ENOUGH_DATA=4]="HAVE_ENOUGH_DATA"}(st||(st={}));const ht={wrap:{s:Ae.pF.REPEAT,t:Ae.pF.REPEAT},mipmap:!0,noUnpackFlip:!1,preMultiplyAlpha:!1,downsampleUncompressed:!1};var ft=r(98537),mt=r(84749),pt=r(35277),vt=r(39102),gt=r(67848),_t=r(12391),xt=r(7869),Tt=r(37973),bt=r(84205),yt=r(47362);const At=(0,yt.p3)(Ae.dn.SRC_ALPHA,Ae.dn.ONE,Ae.dn.ONE_MINUS_SRC_ALPHA,Ae.dn.ONE_MINUS_SRC_ALPHA),Et=(0,yt.p3)(Ae.dn.ONE,Ae.dn.ZERO,Ae.dn.ONE,Ae.dn.ONE_MINUS_SRC_ALPHA);function St(e){return e===bt.y.FrontFace?null:Et}const wt=5e5,Mt={factor:-1,units:-2};function Ct(e){return e?Mt:null}function Ot(e,t=Ae.MT.LESS){return e===bt.y.NONE||e===bt.y.FrontFace?t:Ae.MT.LEQUAL}function It(e){return e===bt.y.ColorAlpha?{buffers:[Ae.Nm.COLOR_ATTACHMENT0,Ae.Nm.COLOR_ATTACHMENT1]}:null}class Rt{constructor(e=!1,t=!0){this.isVerticalRay=e,this.normalRequired=t}}const Nt=(0,h.vt)();function Pt(e,t,r,n,i,o){if(!e.visible)return;const a=(0,u.z)(Jt,n,r),s=(e,t,r)=>{o(e,r,t,!1)},l=new Rt(!1,t.options.normalRequired);if(e.boundingInfo){(0,U.vA)(e.type===$.X.Mesh);const n=t.tolerance;Ht(e.boundingInfo,r,a,n,i,l,s)}else{const t=e.attributes.get(ce.r.POSITION),n=t.indices;Ft(r,a,0,n.length/3,n,t.data,t.stride,i,l,s)}}const Lt=(0,d.vt)();function Ht(e,t,r,n,i,o,a){if(null==e)return;const s=kt(r,Lt);if((0,h.Ne)(Nt,e.bbMin),(0,h.vI)(Nt,e.bbMax),null!=i&&i.applyToAabb(Nt),$t(Nt,t,s,n)){const{primitiveIndices:s,position:l}=e,c=s?s.length:l.indices.length/3;if(c>Xt){const s=e.getChildren();if(void 0!==s){for(const e of s)Ht(e,t,r,n,i,o,a);return}}Bt(t,r,0,c,l.indices,l.data,l.stride,s,i,o,a)}}const Dt=(0,d.vt)();function Bt(e,t,r,n,i,o,a,s,l,c,u){const d=e[0],h=e[1],f=e[2],m=t[0],p=t[1],v=t[2],{normalRequired:g}=c;for(let _=r;_<n;++_){const e=s[_],t=3*e,r=a*i[t];let n=o[r],c=o[r+1],x=o[r+2];const T=a*i[t+1];let b=o[T],y=o[T+1],A=o[T+2];const E=a*i[t+2];let S=o[E],w=o[E+1],M=o[E+2];null!=l&&([n,c,x]=l.applyToVertex(n,c,x,_),[b,y,A]=l.applyToVertex(b,y,A,_),[S,w,M]=l.applyToVertex(S,w,M,_));const C=b-n,O=y-c,I=A-x,R=S-n,N=w-c,P=M-x,L=p*P-N*v,H=v*R-P*m,D=m*N-R*p,B=C*L+O*H+I*D;if(Math.abs(B)<=Zt)continue;const F=d-n,z=h-c,V=f-x,G=F*L+z*H+V*D;if(B>0){if(G<0||G>B)continue}else if(G>0||G<B)continue;const W=z*I-O*V,U=V*C-I*F,j=F*O-C*z,q=m*W+p*U+v*j;if(B>0){if(q<0||G+q>B)continue}else if(q>0||G+q<B)continue;const k=(R*W+N*U+P*j)/B;k>=0&&u(k,e,g?Wt(C,O,I,R,N,P,Dt):null)}}function Ft(e,t,r,n,i,o,a,s,l,c){const d=t,h=Kt,f=Math.abs(d[0]),m=Math.abs(d[1]),p=Math.abs(d[2]),v=f>=m?f>=p?0:2:m>=p?1:2,g=v,_=d[g]<0?2:1,x=(v+_)%3,T=(v+(3-_))%3,b=d[x]/d[g],y=d[T]/d[g],A=1/d[g],E=zt,S=Vt,w=Gt,{normalRequired:M}=l;for(let C=r;C<n;++C){const t=3*C,r=a*i[t];(0,u.s)(h[0],o[r+0],o[r+1],o[r+2]);const n=a*i[t+1];(0,u.s)(h[1],o[n+0],o[n+1],o[n+2]);const l=a*i[t+2];(0,u.s)(h[2],o[l+0],o[l+1],o[l+2]),s&&((0,u.c)(h[0],s.applyToVertex(h[0][0],h[0][1],h[0][2],C)),(0,u.c)(h[1],s.applyToVertex(h[1][0],h[1][1],h[1][2],C)),(0,u.c)(h[2],s.applyToVertex(h[2][0],h[2][1],h[2][2],C))),(0,u.z)(E,h[0],e),(0,u.z)(S,h[1],e),(0,u.z)(w,h[2],e);const d=E[x]-b*E[g],f=E[T]-y*E[g],m=S[x]-b*S[g],p=S[T]-y*S[g],v=w[x]-b*w[g],_=w[T]-y*w[g],O=v*p-_*m,I=d*_-f*v,R=m*f-p*d;if((O<0||I<0||R<0)&&(O>0||I>0||R>0))continue;const N=O+I+R;if(0===N)continue;const P=O*(A*E[g])+I*(A*S[g])+R*(A*w[g]);if(P*Math.sign(N)<0)continue;const L=P/N;L>=0&&c(L,C,M?Ut(h):null)}}const zt=(0,d.vt)(),Vt=(0,d.vt)(),Gt=(0,d.vt)();function Wt(e,t,r,n,i,o,a){return(0,u.s)(jt,e,t,r),(0,u.s)(qt,n,i,o),(0,u.b)(a,jt,qt),(0,u.n)(a,a),a}function Ut(e){return(0,u.z)(jt,e[1],e[0]),(0,u.z)(qt,e[2],e[0]),(0,u.b)(Dt,jt,qt),(0,u.n)(Dt,Dt),Dt}const jt=(0,d.vt)(),qt=(0,d.vt)();function kt(e,t){return(0,u.s)(t,1/e[0],1/e[1],1/e[2])}function $t(e,t,r,n){return Yt(e,t,r,n,1/0)}function Yt(e,t,r,n,i){const o=(e[0]-n-t[0])*r[0],a=(e[3]+n-t[0])*r[0];let s=Math.min(o,a),l=Math.max(o,a);const c=(e[1]-n-t[1])*r[1],u=(e[4]+n-t[1])*r[1];if(l=Math.min(l,Math.max(c,u)),l<0)return!1;if(s=Math.max(s,Math.min(c,u)),s>l)return!1;const d=(e[2]-n-t[2])*r[2],h=(e[5]+n-t[2])*r[2];return l=Math.min(l,Math.max(d,h)),!(l<0)&&(s=Math.max(s,Math.min(d,h)),!(s>l)&&s<i)}const Xt=1e3,Zt=1e-7,Jt=(0,d.vt)(),Kt=[(0,d.vt)(),(0,d.vt)(),(0,d.vt)()];var Qt;!function(e){e[e.INTEGRATED_MESH=0]="INTEGRATED_MESH",e[e.OPAQUE_TERRAIN=1]="OPAQUE_TERRAIN",e[e.OPAQUE_MATERIAL=2]="OPAQUE_MATERIAL",e[e.OPAQUE_NO_SSAO_DEPTH=3]="OPAQUE_NO_SSAO_DEPTH",e[e.TRANSPARENT_MATERIAL=4]="TRANSPARENT_MATERIAL",e[e.TRANSPARENT_NO_SSAO_DEPTH=5]="TRANSPARENT_NO_SSAO_DEPTH",e[e.TRANSPARENT_TERRAIN=6]="TRANSPARENT_TERRAIN",e[e.TRANSPARENT_DEPTH_WRITE_DISABLED_MATERIAL=7]="TRANSPARENT_DEPTH_WRITE_DISABLED_MATERIAL",e[e.OCCLUDED_TERRAIN=8]="OCCLUDED_TERRAIN",e[e.OCCLUDER_MATERIAL=9]="OCCLUDER_MATERIAL",e[e.TRANSPARENT_OCCLUDER_MATERIAL=10]="TRANSPARENT_OCCLUDER_MATERIAL",e[e.OCCLUSION_PIXELS=11]="OCCLUSION_PIXELS",e[e.OPAQUE_ENVIRONMENT=12]="OPAQUE_ENVIRONMENT",e[e.TRANSPARENT_ENVIRONMENT=13]="TRANSPARENT_ENVIRONMENT",e[e.LASERLINES=14]="LASERLINES",e[e.LASERLINES_CONTRAST_CONTROL=15]="LASERLINES_CONTRAST_CONTROL",e[e.HUD_MATERIAL=16]="HUD_MATERIAL",e[e.LABEL_MATERIAL=17]="LABEL_MATERIAL",e[e.LINE_CALLOUTS=18]="LINE_CALLOUTS",e[e.LINE_CALLOUTS_HUD_DEPTH=19]="LINE_CALLOUTS_HUD_DEPTH",e[e.DRAPED_MATERIAL=20]="DRAPED_MATERIAL",e[e.DRAPED_WATER=21]="DRAPED_WATER",e[e.VIEWSHED=22]="VIEWSHED",e[e.VOXEL=23]="VOXEL",e[e.MAX_SLOTS=24]="MAX_SLOTS"}(Qt||(Qt={}));var er=r(76102),tr=r(30963);class rr{constructor(e=0){this.offset=e,this.tmpVertex=(0,d.vt)()}applyToVertex(e,t,r){const n=(0,u.s)(sr,e,t,r),i=(0,u.g)(lr,n,this.localOrigin),o=this.offset/(0,u.l)(i);return(0,u.r)(this.tmpVertex,n,i,o),this.tmpVertex}applyToAabb(e){const t=cr,r=ur,n=dr;for(let s=0;s<3;++s)t[s]=e[0+s]+this.localOrigin[s],r[s]=e[3+s]+this.localOrigin[s],n[s]=t[s];const i=this.applyToVertex(t[0],t[1],t[2]);for(let s=0;s<3;++s)e[s]=i[s],e[s+3]=i[s];const o=t=>{const r=this.applyToVertex(t[0],t[1],t[2]);for(let n=0;n<3;++n)e[n]=Math.min(e[n],r[n]),e[n+3]=Math.max(e[n+3],r[n])};for(let s=1;s<8;++s){for(let e=0;e<3;++e)n[e]=s&1<<e?r[e]:t[e];o(n)}let a=0;for(let s=0;s<3;++s)t[s]*r[s]<0&&(a|=1<<s);if(0!==a&&7!==a)for(let s=0;s<8;++s)if(!(a&s)){for(let e=0;e<3;++e)n[e]=a&1<<e?0:s&1<<e?t[e]:r[e];o(n)}for(let s=0;s<3;++s)e[s]-=this.localOrigin[s],e[s+3]-=this.localOrigin[s];return e}}class nr{constructor(e=0){this.componentLocalOriginLength=0,this._totalOffset=0,this._offset=0,this._tmpVertex=(0,d.vt)(),this._tmpMbs=(0,er.c)(),this._tmpObb=new tr.ab,this._resetOffset(e)}_resetOffset(e){this._offset=e,this._totalOffset=e}set offset(e){this._resetOffset(e)}get offset(){return this._offset}set componentOffset(e){this._totalOffset=this._offset+e}set localOrigin(e){this.componentLocalOriginLength=(0,u.l)(e)}applyToVertex(e,t,r){const n=(0,u.s)(sr,e,t,r),i=(0,u.s)(lr,e,t,r+this.componentLocalOriginLength),o=this._totalOffset/(0,u.l)(i);return(0,u.r)(this._tmpVertex,n,i,o),this._tmpVertex}applyToAabb(e){const t=this.componentLocalOriginLength,r=e[0],n=e[1],i=e[2]+t,o=e[3],a=e[4],s=e[5]+t,l=Math.abs(r),c=Math.abs(n),u=Math.abs(i),d=Math.abs(o),h=Math.abs(a),f=Math.abs(s),m=.5*(1+Math.sign(r*o))*Math.min(l,d),p=.5*(1+Math.sign(n*a))*Math.min(c,h),v=.5*(1+Math.sign(i*s))*Math.min(u,f),g=Math.max(l,d),_=Math.max(c,h),x=Math.max(u,f),T=Math.sqrt(m*m+p*p+v*v),b=Math.sign(l+r),y=Math.sign(c+n),A=Math.sign(u+i),E=Math.sign(d+o),S=Math.sign(h+a),w=Math.sign(f+s),M=this._totalOffset;if(T<M)return e[0]-=(1-b)*M,e[1]-=(1-y)*M,e[2]-=(1-A)*M,e[3]+=E*M,e[4]+=S*M,e[5]+=w*M,e;const C=M/Math.sqrt(g*g+_*_+x*x),O=M/T,I=O-C,R=-I;return e[0]+=r*(b*R+O),e[1]+=n*(y*R+O),e[2]+=i*(A*R+O),e[3]+=o*(E*I+C),e[4]+=a*(S*I+C),e[5]+=s*(w*I+C),e}applyToMbs(e){const t=(0,u.l)((0,er.g)(e)),r=this._totalOffset/t;return(0,u.r)((0,er.g)(this._tmpMbs),(0,er.g)(e),(0,er.g)(e),r),this._tmpMbs[3]=e[3]+e[3]*this._totalOffset/t,this._tmpMbs}applyToObb(e){return(0,tr.gm)(e,this._totalOffset,this._totalOffset,ft.RT.Global,this._tmpObb),this._tmpObb}}class ir{constructor(e=0){this.offset=e,this.sphere=(0,er.c)(),this.tmpVertex=(0,d.vt)()}applyToVertex(e,t,r){const n=this.objectTransform.transform,i=(0,u.s)(sr,e,t,r),o=(0,u.h)(i,i,n),a=this.offset/(0,u.l)(o);(0,u.r)(o,o,o,a);const s=this.objectTransform.inverse;return(0,u.h)(this.tmpVertex,o,s),this.tmpVertex}applyToMinMax(e,t){const r=this.offset/(0,u.l)(e);(0,u.r)(e,e,e,r);const n=this.offset/(0,u.l)(t);(0,u.r)(t,t,t,n)}applyToAabb(e){const t=this.offset/Math.sqrt(e[0]*e[0]+e[1]*e[1]+e[2]*e[2]);e[0]+=e[0]*t,e[1]+=e[1]*t,e[2]+=e[2]*t;const r=this.offset/Math.sqrt(e[3]*e[3]+e[4]*e[4]+e[5]*e[5]);return e[3]+=e[3]*r,e[4]+=e[4]*r,e[5]+=e[5]*r,e}applyToBoundingSphere(e){const t=(0,u.l)((0,er.g)(e)),r=this.offset/t;return(0,u.r)((0,er.g)(this.sphere),(0,er.g)(e),(0,er.g)(e),r),this.sphere[3]=e[3]+e[3]*this.offset/t,this.sphere}}const or=new ir;function ar(e){return null!=e?(or.offset=e,or):null}new nr;new rr;const sr=(0,d.vt)(),lr=(0,d.vt)(),cr=(0,d.vt)(),ur=(0,d.vt)(),dr=(0,d.vt)();function hr(e,t,r){const{data:n,indices:i}=e,o=t.typedBuffer,a=t.typedBufferStride,s=i.length;r*=a;for(let l=0;l<s;++l){const e=2*i[l];o[r]=n[e],o[r+1]=n[e+1],r+=a}}function fr(e,t,r,n){const{data:i,indices:o}=e,a=t.typedBuffer,s=t.typedBufferStride,l=o.length;if(r*=s,null==n||1===n)for(let c=0;c<l;++c){const e=3*o[c];a[r]=i[e],a[r+1]=i[e+1],a[r+2]=i[e+2],r+=s}else for(let c=0;c<l;++c){const e=3*o[c];for(let t=0;t<n;++t)a[r]=i[e],a[r+1]=i[e+1],a[r+2]=i[e+2],r+=s}}function mr(e,t,r,n=1){const{data:i,indices:o}=e,a=t.typedBuffer,s=t.typedBufferStride,l=o.length;if(r*=s,1===n)for(let c=0;c<l;++c){const e=4*o[c];a[r]=i[e],a[r+1]=i[e+1],a[r+2]=i[e+2],a[r+3]=i[e+3],r+=s}else for(let c=0;c<l;++c){const e=4*o[c];for(let t=0;t<n;++t)a[r]=i[e],a[r+1]=i[e+1],a[r+2]=i[e+2],a[r+3]=i[e+3],r+=s}}function pr(e,t,r,n,i=1){if(!t)return void fr(e,r,n,i);const{data:o,indices:a}=e,l=r.typedBuffer,c=r.typedBufferStride,u=a.length,d=t[0],h=t[1],f=t[2],m=t[4],p=t[5],v=t[6],g=t[8],_=t[9],x=t[10],T=t[12],b=t[13],y=t[14];n*=c;let A=0,E=0,S=0;const w=(0,s.tZ)(t)?e=>{A=o[e]+T,E=o[e+1]+b,S=o[e+2]+y}:e=>{const t=o[e],r=o[e+1],n=o[e+2];A=d*t+m*r+g*n+T,E=h*t+p*r+_*n+b,S=f*t+v*r+x*n+y};if(1===i)for(let s=0;s<u;++s)w(3*a[s]),l[n]=A,l[n+1]=E,l[n+2]=S,n+=c;else for(let s=0;s<u;++s){w(3*a[s]);for(let e=0;e<i;++e)l[n]=A,l[n+1]=E,l[n+2]=S,n+=c}}function vr(e,t,r,n,i=1){if(!t)return void fr(e,r,n,i);const{data:o,indices:a}=e,l=t,c=r.typedBuffer,u=r.typedBufferStride,d=a.length,h=l[0],f=l[1],m=l[2],p=l[4],v=l[5],g=l[6],_=l[8],x=l[9],T=l[10],b=!(0,s.ut)(l),y=1e-6,A=1-y;n*=u;let E=0,S=0,w=0;const M=(0,s.tZ)(l)?e=>{E=o[e],S=o[e+1],w=o[e+2]}:e=>{const t=o[e],r=o[e+1],n=o[e+2];E=h*t+p*r+_*n,S=f*t+v*r+x*n,w=m*t+g*r+T*n};if(1===i)if(b)for(let s=0;s<d;++s){M(3*a[s]);const e=E*E+S*S+w*w;if(e<A&&e>y){const t=1/Math.sqrt(e);c[n]=E*t,c[n+1]=S*t,c[n+2]=w*t}else c[n]=E,c[n+1]=S,c[n+2]=w;n+=u}else for(let s=0;s<d;++s)M(3*a[s]),c[n]=E,c[n+1]=S,c[n+2]=w,n+=u;else for(let s=0;s<d;++s){if(M(3*a[s]),b){const e=E*E+S*S+w*w;if(e<A&&e>y){const t=1/Math.sqrt(e);E*=t,S*=t,w*=t}}for(let e=0;e<i;++e)c[n]=E,c[n+1]=S,c[n+2]=w,n+=u}}function gr(e,t,r,n,i=1){if(!t)return void mr(e,r,n,i);const{data:o,indices:a}=e,l=t,c=r.typedBuffer,u=r.typedBufferStride,d=a.length,h=l[0],f=l[1],m=l[2],p=l[4],v=l[5],g=l[6],_=l[8],x=l[9],T=l[10],b=!(0,s.ut)(l),y=1e-6,A=1-y;if(n*=u,1===i)for(let s=0;s<d;++s){const e=4*a[s],t=o[e],r=o[e+1],i=o[e+2],l=o[e+3];let d=h*t+p*r+_*i,E=f*t+v*r+x*i,S=m*t+g*r+T*i;if(b){const e=d*d+E*E+S*S;if(e<A&&e>y){const t=1/Math.sqrt(e);d*=t,E*=t,S*=t}}c[n]=d,c[n+1]=E,c[n+2]=S,c[n+3]=l,n+=u}else for(let s=0;s<d;++s){const e=4*a[s],t=o[e],r=o[e+1],l=o[e+2],d=o[e+3];let E=h*t+p*r+_*l,S=f*t+v*r+x*l,w=m*t+g*r+T*l;if(b){const e=E*E+S*S+w*w;if(e<A&&e>y){const t=1/Math.sqrt(e);E*=t,S*=t,w*=t}}for(let o=0;o<i;++o)c[n]=E,c[n+1]=S,c[n+2]=w,c[n+3]=d,n+=u}}function _r(e,t,r,n,i=1){const{data:o,indices:a}=e,s=r.typedBuffer,l=r.typedBufferStride,c=a.length;if(n*=l,t!==o.length||4!==t)if(1!==i)if(4!==t)for(let u=0;u<c;++u){const e=3*a[u];for(let t=0;t<i;++t)s[n]=o[e],s[n+1]=o[e+1],s[n+2]=o[e+2],s[n+3]=255,n+=l}else for(let u=0;u<c;++u){const e=4*a[u];for(let t=0;t<i;++t)s[n]=o[e],s[n+1]=o[e+1],s[n+2]=o[e+2],s[n+3]=o[e+3],n+=l}else{if(4===t){for(let e=0;e<c;++e){const t=4*a[e];s[n]=o[t],s[n+1]=o[t+1],s[n+2]=o[t+2],s[n+3]=o[t+3],n+=l}return}for(let e=0;e<c;++e){const t=3*a[e];s[n]=o[t],s[n+1]=o[t+1],s[n+2]=o[t+2],s[n+3]=255,n+=l}}else{s[n]=o[0],s[n+1]=o[1],s[n+2]=o[2],s[n+3]=o[3];const e=new Uint32Array(r.typedBuffer.buffer,r.start),t=l/4,a=e[n/=4];n+=t;const u=c*i;for(let r=1;r<u;++r)e[n]=a,n+=t}}function xr(e,t,r){const{data:n,indices:i}=e,o=t.typedBuffer,a=t.typedBufferStride,s=i.length,l=n[0];r*=a;for(let c=0;c<s;++c)o[r]=l,r+=a}function Tr(e,t,r,n,i=1){const o=t.typedBuffer,a=t.typedBufferStride;if(n*=a,1===i)for(let s=0;s<r;++s)o[n]=e[0],o[n+1]=e[1],o[n+2]=e[2],o[n+3]=e[3],n+=a;else for(let s=0;s<r;++s)for(let t=0;t<i;++t)o[n]=e[0],o[n+1]=e[1],o[n+2]=e[2],o[n+3]=e[3],n+=a}function br(e,t,r,n,i,o){for(const a of t.fields.keys()){const t=e.attributes.get(a),s=t?.indices;if(t&&s)yr(a,t,r,n,i,o);else if(a===ce.r.OBJECTANDLAYERIDCOLOR&&null!=e.objectAndLayerIdColor){const t=e.attributes.get(ce.r.POSITION)?.indices;if(t){const r=t.length,n=i.getField(a,m.XP);Tr(e.objectAndLayerIdColor,n,r,o)}}}}function yr(e,t,r,n,i,o){switch(e){case ce.r.POSITION:{(0,U.vA)(3===t.size);const n=i.getField(e,m.xs);(0,U.vA)(!!n,`No buffer view for ${e}`),n&&pr(t,r,n,o);break}case ce.r.NORMAL:{(0,U.vA)(3===t.size);const r=i.getField(e,m.xs);(0,U.vA)(!!r,`No buffer view for ${e}`),r&&vr(t,n,r,o);break}case ce.r.NORMALCOMPRESSED:{(0,U.vA)(2===t.size);const r=i.getField(e,m.mJ);(0,U.vA)(!!r,`No buffer view for ${e}`),r&&hr(t,r,o);break}case ce.r.UV0:{(0,U.vA)(2===t.size);const r=i.getField(e,m.gH);(0,U.vA)(!!r,`No buffer view for ${e}`),r&&hr(t,r,o);break}case ce.r.COLOR:case ce.r.SYMBOLCOLOR:{const r=i.getField(e,m.XP);(0,U.vA)(!!r,`No buffer view for ${e}`),(0,U.vA)(3===t.size||4===t.size),!r||3!==t.size&&4!==t.size||_r(t,t.size,r,o);break}case ce.r.COLORFEATUREATTRIBUTE:{const r=i.getField(e,m.Y$);(0,U.vA)(!!r,`No buffer view for ${e}`),(0,U.vA)(1===t.size),r&&1===t.size&&xr(t,r,o);break}case ce.r.TANGENT:{(0,U.vA)(4===t.size);const n=i.getField(e,m.Eq);(0,U.vA)(!!n,`No buffer view for ${e}`),n&&gr(t,r,n,o);break}case ce.r.PROFILERIGHT:case ce.r.PROFILEUP:case ce.r.PROFILEVERTEXANDNORMAL:case ce.r.FEATUREVALUE:{(0,U.vA)(4===t.size);const r=i.getField(e,m.Eq);(0,U.vA)(!!r,`No buffer view for ${e}`),r&&mr(t,r,o)}}}class Ar{constructor(e){this.vertexBufferLayout=e}elementCount(e){return e.attributes.get(ce.r.POSITION).indices.length}write(e,t,r,n,i){br(r,this.vertexBufferLayout,e,t,n,i)}}var Er=r(16437),Sr=r(43911),wr=r(66856),Mr=r(99426),Cr=r(29155),Or=r(27538),Ir=r(74525),Rr=r(12159),Nr=r(3984);Ae.MT.LESS,Ae.MT.ALWAYS;const Pr={mask:255},Lr={function:{func:Ae.MT.ALWAYS,ref:z.dd.OutlineVisualElementMask,mask:z.dd.OutlineVisualElementMask},operation:{fail:Ae.eA.KEEP,zFail:Ae.eA.KEEP,zPass:Ae.eA.ZERO}},Hr={function:{func:Ae.MT.ALWAYS,ref:z.dd.OutlineVisualElementMask,mask:z.dd.OutlineVisualElementMask},operation:{fail:Ae.eA.KEEP,zFail:Ae.eA.KEEP,zPass:Ae.eA.REPLACE}};Ae.MT.EQUAL,z.dd.OutlineVisualElementMask,z.dd.OutlineVisualElementMask,Ae.eA.KEEP,Ae.eA.KEEP,Ae.eA.KEEP,Ae.MT.NOTEQUAL,z.dd.OutlineVisualElementMask,z.dd.OutlineVisualElementMask,Ae.eA.KEEP,Ae.eA.KEEP,Ae.eA.KEEP;function Dr({normalTexture:e,metallicRoughnessTexture:t,metallicFactor:r,roughnessFactor:n,emissiveTexture:i,emissiveFactor:o,occlusionTexture:a}){return null==e&&null==t&&null==i&&(null==o||(0,u.e)(o,d.uY))&&null==a&&(null==n||1===n)&&(null==r||1===r)}const Br=[1,1,.5],Fr=[0,.6,.2],zr=[0,1,.2];var Vr=r(7681);class Gr extends Mr.Zo{constructor(){super(...arguments),this.isSchematic=!1,this.usePBR=!1,this.mrrFactors=(0,d.ci)(Br),this.hasVertexColors=!1,this.hasSymbolColors=!1,this.doubleSided=!1,this.doubleSidedType="normal",this.cullFace=z.s2.Back,this.isInstanced=!1,this.hasInstancedColor=!1,this.emissiveFactor=(0,d.fA)(0,0,0),this.instancedDoublePrecision=!1,this.normalType=vt.W.Attribute,this.receiveShadows=!0,this.receiveAmbientOcclusion=!0,this.castShadows=!0,this.shadowMappingEnabled=!1,this.ambient=(0,d.fA)(.2,.2,.2),this.diffuse=(0,d.fA)(.8,.8,.8),this.externalColor=(0,Sr.fA)(1,1,1,1),this.colorMixMode="multiply",this.opacity=1,this.layerOpacity=1,this.origin=(0,d.vt)(),this.hasSlicePlane=!1,this.hasSliceHighlight=!0,this.offsetTransparentBackfaces=!1,this.vvSize=null,this.vvColor=null,this.vvOpacity=null,this.vvSymbolAnchor=null,this.vvSymbolRotationMatrix=null,this.modelTransformation=null,this.transparent=!1,this.writeDepth=!0,this.customDepthTest=z.it.Less,this.textureAlphaMode=z.sf.Blend,this.textureAlphaCutoff=Cr.H,this.textureAlphaPremultiplied=!1,this.hasOccludees=!1,this.renderOccluded=Tt.m$.Occlude,this.isDecoration=!1}}Mr.gy;class Wr extends Ir.w{initializeConfiguration(e,t){t.spherical=e.viewingMode===ft.RT.Global,t.doublePrecisionRequiresObfuscation=e.rctx.driverTest.doublePrecisionRequiresObfuscation.result,t.textureCoordinateType=t.hasColorTexture||t.hasMetallicRoughnessTexture||t.hasEmissionTexture||t.hasOcclusionTexture||t.hasNormalTexture?wr.q.Default:wr.q.None,t.objectAndLayerIdColorInstanced=t.instanced}initializeProgram(e){return this._initializeProgram(e,Wr.shader)}_initializeProgram(e,t){return new Nr.B(e.rctx,t.get().build(this.configuration),Rr.D)}_makePipeline(e,t){const r=this.configuration,n=e===bt.y.NONE,i=e===bt.y.FrontFace;return(0,yt.Ey)({blending:r.output===pt.V.Color&&r.transparent?n?At:St(e):null,culling:jr(r)?(0,yt.Xt)(r.cullFace):null,depthTest:{func:Ot(e,Ur(r.customDepthTest))},depthWrite:(n||i)&&r.writeDepth?yt.kn:null,drawBuffers:r.output===pt.V.Depth?{buffers:[Ae.Hr.NONE]}:It(e),colorWrite:yt.wE,stencilWrite:r.hasOccludees?Pr:null,stencilTest:r.hasOccludees?t?Hr:Lr:null,polygonOffset:n||i?null:Ct(r.enableOffset)})}initializePipeline(){return this._occludeePipelineState=this._makePipeline(this.configuration.transparencyPassType,!0),this._makePipeline(this.configuration.transparencyPassType,!1)}getPipeline(e){return e?this._occludeePipelineState:super.getPipeline()}}function Ur(e){return e===z.it.Lequal?Ae.MT.LEQUAL:Ae.MT.LESS}function jr(e){return e.cullFace!==z.s2.None||!e.hasSlicePlane&&!e.transparent&&!e.doubleSidedMode}Wr.shader=new Or.$(Vr.D,(()=>r.e(8071).then(r.bind(r,88071))));var qr=r(40399),kr=r(70047),$r=r(85273),Yr=r(86989);class Xr extends $r.nW{}(0,qr._)([(0,kr.W)({constValue:!0})],Xr.prototype,"hasSliceHighlight",void 0),(0,qr._)([(0,kr.W)({constValue:!1})],Xr.prototype,"hasSliceInVertexProgram",void 0),(0,qr._)([(0,kr.W)({constValue:Yr.c.Pass})],Xr.prototype,"pbrTextureBindType",void 0);class Zr extends Xr{constructor(){super(...arguments),this.output=pt.V.Color,this.alphaDiscardMode=z.sf.Opaque,this.doubleSidedMode=gt.W.None,this.pbrMode=_t.A9.Disabled,this.cullFace=z.s2.None,this.transparencyPassType=bt.y.NONE,this.normalType=vt.W.Attribute,this.textureCoordinateType=wr.q.None,this.customDepthTest=z.it.Less,this.spherical=!1,this.hasVertexColors=!1,this.hasSymbolColors=!1,this.hasVerticalOffset=!1,this.hasSlicePlane=!1,this.hasSliceHighlight=!0,this.hasColorTexture=!1,this.hasMetallicRoughnessTexture=!1,this.hasEmissionTexture=!1,this.hasOcclusionTexture=!1,this.hasNormalTexture=!1,this.hasScreenSizePerspective=!1,this.hasVertexTangents=!1,this.hasOccludees=!1,this.multipassEnabled=!1,this.hasModelTransformation=!1,this.offsetBackfaces=!1,this.vvSize=!1,this.vvColor=!1,this.receiveShadows=!1,this.receiveAmbientOcclusion=!1,this.textureAlphaPremultiplied=!1,this.instanced=!1,this.instancedColor=!1,this.objectAndLayerIdColorInstanced=!1,this.instancedDoublePrecision=!1,this.doublePrecisionRequiresObfuscation=!1,this.writeDepth=!0,this.transparent=!1,this.enableOffset=!0,this.cullAboveGround=!1,this.snowCover=!1,this.hasColorTextureTransform=!1,this.hasEmissionTextureTransform=!1,this.hasNormalTextureTransform=!1,this.hasOcclusionTextureTransform=!1,this.hasMetallicRoughnessTextureTransform=!1}}(0,qr._)([(0,kr.W)({count:pt.V.COUNT})],Zr.prototype,"output",void 0),(0,qr._)([(0,kr.W)({count:z.sf.COUNT})],Zr.prototype,"alphaDiscardMode",void 0),(0,qr._)([(0,kr.W)({count:gt.W.COUNT})],Zr.prototype,"doubleSidedMode",void 0),(0,qr._)([(0,kr.W)({count:_t.A9.COUNT})],Zr.prototype,"pbrMode",void 0),(0,qr._)([(0,kr.W)({count:z.s2.COUNT})],Zr.prototype,"cullFace",void 0),(0,qr._)([(0,kr.W)({count:bt.y.COUNT})],Zr.prototype,"transparencyPassType",void 0),(0,qr._)([(0,kr.W)({count:vt.W.COUNT})],Zr.prototype,"normalType",void 0),(0,qr._)([(0,kr.W)({count:wr.q.COUNT})],Zr.prototype,"textureCoordinateType",void 0),(0,qr._)([(0,kr.W)({count:z.it.COUNT})],Zr.prototype,"customDepthTest",void 0),(0,qr._)([(0,kr.W)()],Zr.prototype,"spherical",void 0),(0,qr._)([(0,kr.W)()],Zr.prototype,"hasVertexColors",void 0),(0,qr._)([(0,kr.W)()],Zr.prototype,"hasSymbolColors",void 0),(0,qr._)([(0,kr.W)()],Zr.prototype,"hasVerticalOffset",void 0),(0,qr._)([(0,kr.W)()],Zr.prototype,"hasSlicePlane",void 0),(0,qr._)([(0,kr.W)()],Zr.prototype,"hasSliceHighlight",void 0),(0,qr._)([(0,kr.W)()],Zr.prototype,"hasColorTexture",void 0),(0,qr._)([(0,kr.W)()],Zr.prototype,"hasMetallicRoughnessTexture",void 0),(0,qr._)([(0,kr.W)()],Zr.prototype,"hasEmissionTexture",void 0),(0,qr._)([(0,kr.W)()],Zr.prototype,"hasOcclusionTexture",void 0),(0,qr._)([(0,kr.W)()],Zr.prototype,"hasNormalTexture",void 0),(0,qr._)([(0,kr.W)()],Zr.prototype,"hasScreenSizePerspective",void 0),(0,qr._)([(0,kr.W)()],Zr.prototype,"hasVertexTangents",void 0),(0,qr._)([(0,kr.W)()],Zr.prototype,"hasOccludees",void 0),(0,qr._)([(0,kr.W)()],Zr.prototype,"multipassEnabled",void 0),(0,qr._)([(0,kr.W)()],Zr.prototype,"hasModelTransformation",void 0),(0,qr._)([(0,kr.W)()],Zr.prototype,"offsetBackfaces",void 0),(0,qr._)([(0,kr.W)()],Zr.prototype,"vvSize",void 0),(0,qr._)([(0,kr.W)()],Zr.prototype,"vvColor",void 0),(0,qr._)([(0,kr.W)()],Zr.prototype,"receiveShadows",void 0),(0,qr._)([(0,kr.W)()],Zr.prototype,"receiveAmbientOcclusion",void 0),(0,qr._)([(0,kr.W)()],Zr.prototype,"textureAlphaPremultiplied",void 0),(0,qr._)([(0,kr.W)()],Zr.prototype,"instanced",void 0),(0,qr._)([(0,kr.W)()],Zr.prototype,"instancedColor",void 0),(0,qr._)([(0,kr.W)()],Zr.prototype,"objectAndLayerIdColorInstanced",void 0),(0,qr._)([(0,kr.W)()],Zr.prototype,"instancedDoublePrecision",void 0),(0,qr._)([(0,kr.W)()],Zr.prototype,"doublePrecisionRequiresObfuscation",void 0),(0,qr._)([(0,kr.W)()],Zr.prototype,"writeDepth",void 0),(0,qr._)([(0,kr.W)()],Zr.prototype,"transparent",void 0),(0,qr._)([(0,kr.W)()],Zr.prototype,"enableOffset",void 0),(0,qr._)([(0,kr.W)()],Zr.prototype,"cullAboveGround",void 0),(0,qr._)([(0,kr.W)()],Zr.prototype,"snowCover",void 0),(0,qr._)([(0,kr.W)()],Zr.prototype,"hasColorTextureTransform",void 0),(0,qr._)([(0,kr.W)()],Zr.prototype,"hasEmissionTextureTransform",void 0),(0,qr._)([(0,kr.W)()],Zr.prototype,"hasNormalTextureTransform",void 0),(0,qr._)([(0,kr.W)()],Zr.prototype,"hasOcclusionTextureTransform",void 0),(0,qr._)([(0,kr.W)()],Zr.prototype,"hasMetallicRoughnessTextureTransform",void 0),(0,qr._)([(0,kr.W)({constValue:!1})],Zr.prototype,"occlusionPass",void 0),(0,qr._)([(0,kr.W)({constValue:!0})],Zr.prototype,"hasVvInstancing",void 0),(0,qr._)([(0,kr.W)({constValue:!1})],Zr.prototype,"useCustomDTRExponentForWater",void 0),(0,qr._)([(0,kr.W)({constValue:!1})],Zr.prototype,"supportsTextureAtlas",void 0),(0,qr._)([(0,kr.W)({constValue:!0})],Zr.prototype,"useFillLights",void 0);var Jr=r(90873);class Kr extends Wr{initializeConfiguration(e,t){super.initializeConfiguration(e,t),t.hasMetallicRoughnessTexture=!1,t.hasEmissionTexture=!1,t.hasOcclusionTexture=!1,t.hasNormalTexture=!1,t.hasModelTransformation=!1,t.normalType=vt.W.Attribute,t.doubleSidedMode=gt.W.WindingOrder,t.hasVertexTangents=!1}initializeProgram(e){return this._initializeProgram(e,Kr.shader)}}Kr.shader=new Or.$(Jr.R,(()=>r.e(39).then(r.bind(r,60039))));class Qr extends Tt.im{constructor(e){super(e,rn),this.supportsEdges=!0,this.produces=new Map([[Qt.OPAQUE_MATERIAL,e=>((0,pt.XY)(e)||(0,pt.PJ)(e))&&!this.parameters.transparent],[Qt.TRANSPARENT_MATERIAL,e=>((0,pt.XY)(e)||(0,pt.PJ)(e))&&this.parameters.transparent&&this.parameters.writeDepth],[Qt.TRANSPARENT_DEPTH_WRITE_DISABLED_MATERIAL,e=>((0,pt.XY)(e)||(0,pt.PJ)(e))&&this.parameters.transparent&&!this.parameters.writeDepth]]),this._configuration=new Zr,this._vertexBufferLayout=nn(this.parameters)}isVisibleForOutput(e){return e!==pt.V.Shadow&&e!==pt.V.ShadowExcludeHighlight&&e!==pt.V.ShadowHighlight||this.parameters.castShadows}isVisible(){const e=this.parameters;if(!super.isVisible()||0===e.layerOpacity)return!1;const{hasInstancedColor:t,hasVertexColors:r,hasSymbolColors:n,vvColor:i}=e,o="replace"===e.colorMixMode,a=e.opacity>0,s=e.externalColor&&e.externalColor[3]>0,l=t||i||n;return r&&l?o||a:r?o?s:a:l?o||a:o?s:a}getConfiguration(e,t){return this._configuration.output=e,this._configuration.hasNormalTexture=!!this.parameters.normalTextureId,this._configuration.hasColorTexture=!!this.parameters.textureId,this._configuration.hasVertexTangents=this.parameters.hasVertexTangents,this._configuration.instanced=this.parameters.isInstanced,this._configuration.instancedDoublePrecision=this.parameters.instancedDoublePrecision,this._configuration.vvSize=!!this.parameters.vvSize,this._configuration.hasVerticalOffset=null!=this.parameters.verticalOffset,this._configuration.hasScreenSizePerspective=null!=this.parameters.screenSizePerspective,this._configuration.hasSlicePlane=this.parameters.hasSlicePlane,this._configuration.hasSliceHighlight=this.parameters.hasSliceHighlight,this._configuration.alphaDiscardMode=this.parameters.textureAlphaMode,this._configuration.normalType=this.parameters.normalType,this._configuration.transparent=this.parameters.transparent,this._configuration.writeDepth=this.parameters.writeDepth,null!=this.parameters.customDepthTest&&(this._configuration.customDepthTest=this.parameters.customDepthTest),this._configuration.hasOccludees=this.parameters.hasOccludees,this._configuration.cullFace=this.parameters.hasSlicePlane?z.s2.None:this.parameters.cullFace,this._configuration.multipassEnabled=t.multipassEnabled,this._configuration.cullAboveGround=t.multipassTerrain.cullAboveGround,this._configuration.hasModelTransformation=null!=this.parameters.modelTransformation,e===pt.V.Color&&(this._configuration.hasVertexColors=this.parameters.hasVertexColors,this._configuration.hasSymbolColors=this.parameters.hasSymbolColors,this.parameters.treeRendering?this._configuration.doubleSidedMode=gt.W.WindingOrder:this._configuration.doubleSidedMode=this.parameters.doubleSided&&"normal"===this.parameters.doubleSidedType?gt.W.View:this.parameters.doubleSided&&"winding-order"===this.parameters.doubleSidedType?gt.W.WindingOrder:gt.W.None,this._configuration.instancedColor=this.parameters.hasInstancedColor,this._configuration.receiveShadows=this.parameters.receiveShadows&&this.parameters.shadowMappingEnabled,this._configuration.receiveAmbientOcclusion=this.parameters.receiveAmbientOcclusion&&null!=t.ssao,this._configuration.vvColor=!!this.parameters.vvColor,this._configuration.textureAlphaPremultiplied=!!this.parameters.textureAlphaPremultiplied,this._configuration.pbrMode=this.parameters.usePBR?this.parameters.isSchematic?_t.A9.Schematic:_t.A9.Normal:_t.A9.Disabled,this._configuration.hasMetallicRoughnessTexture=!!this.parameters.metallicRoughnessTextureId,this._configuration.hasEmissionTexture=!!this.parameters.emissiveTextureId,this._configuration.hasOcclusionTexture=!!this.parameters.occlusionTextureId,this._configuration.offsetBackfaces=!(!this.parameters.transparent||!this.parameters.offsetTransparentBackfaces),this._configuration.transparencyPassType=t.transparencyPassType,this._configuration.enableOffset=t.camera.relativeElevation<wt,this._configuration.snowCover=this.hasSnowCover(t),this._configuration.hasColorTextureTransform=!!this.parameters.colorTextureTransformMatrix,this._configuration.hasNormalTextureTransform=!!this.parameters.normalTextureTransformMatrix,this._configuration.hasEmissionTextureTransform=!!this.parameters.emissiveTextureTransformMatrix,this._configuration.hasOcclusionTextureTransform=!!this.parameters.occlusionTextureTransformMatrix,this._configuration.hasMetallicRoughnessTextureTransform=!!this.parameters.metallicRoughnessTextureTransformMatrix),this._configuration}hasSnowCover(e){return null!=e.weather&&e.weatherVisible&&"snowy"===e.weather.type&&"enabled"===e.weather.snowCover}intersect(e,t,r,n,i,o){if(null!=this.parameters.verticalOffset){const e=r.camera;(0,u.s)(un,t[12],t[13],t[14]);let o=null;switch(r.viewingMode){case ft.RT.Global:o=(0,u.n)(ln,un);break;case ft.RT.Local:o=(0,u.c)(ln,sn)}let a=0;const s=(0,u.f)(dn,un,e.eye),l=(0,u.l)(s),c=(0,u.j)(s,s,1/l);let d=null;this.parameters.screenSizePerspective&&(d=(0,u.m)(o,c)),a+=(0,Er.kE)(e,l,this.parameters.verticalOffset,d??0,this.parameters.screenSizePerspective),(0,u.j)(o,o,a),(0,u.t)(cn,o,r.transform.inverseRotation),n=(0,u.f)(on,n,cn),i=(0,u.f)(an,i,cn)}Pt(e,r,n,i,ar(r.verticalOffset),o)}createGLMaterial(e){return new en(e)}createBufferWriter(){return new Ar(this._vertexBufferLayout)}}class en extends xt.m{constructor(e){super({...e,...e.material.parameters})}_updateShadowState(e){e.shadowMap.enabled!==this._material.parameters.shadowMappingEnabled&&this._material.setParameters({shadowMappingEnabled:e.shadowMap.enabled})}_updateOccludeeState(e){e.hasOccludees!==this._material.parameters.hasOccludees&&this._material.setParameters({hasOccludees:e.hasOccludees})}beginSlot(e){this._output===pt.V.Color&&(this._updateShadowState(e),this._updateOccludeeState(e));const t=this._material.parameters;this.updateTexture(t.textureId);const r=e.camera.viewInverseTransposeMatrix;return(0,u.s)(t.origin,r[3],r[7],r[11]),this._material.setParameters(this.textureBindParameters),this.ensureTechnique(t.treeRendering?Kr:Wr,e)}}class tn extends Gr{constructor(){super(...arguments),this.initTextureTransparent=!1,this.treeRendering=!1,this.hasVertexTangents=!1}}const rn=new tn;function nn(e){const t=(0,mt.BP)().vec3f(ce.r.POSITION);return e.normalType===vt.W.Compressed?t.vec2i16(ce.r.NORMALCOMPRESSED,{glNormalized:!0}):t.vec3f(ce.r.NORMAL),e.hasVertexTangents&&t.vec4f(ce.r.TANGENT),(e.textureId||e.normalTextureId||e.metallicRoughnessTextureId||e.emissiveTextureId||e.occlusionTextureId)&&t.vec2f(ce.r.UV0),e.hasVertexColors&&t.vec4u8(ce.r.COLOR),e.hasSymbolColors&&t.vec4u8(ce.r.SYMBOLCOLOR),(0,me.A)("enable-feature:objectAndLayerId-rendering")&&t.vec4u8(ce.r.OBJECTANDLAYERIDCOLOR),t}const on=(0,d.vt)(),an=(0,d.vt)(),sn=(0,d.fA)(0,0,1),ln=(0,d.vt)(),cn=(0,d.vt)(),un=(0,d.vt)(),dn=(0,d.vt)(),hn=()=>N.A.getLogger("esri.views.3d.layers.graphics.objectResourceUtils");async function fn(e,t){const r=await mn(e,t),n=await Tn(r.textureDefinitions??{},t);let i=0;for(const o in n)if(n.hasOwnProperty(o)){const e=n[o];i+=e?.image?e.image.width*e.image.height*4:0}return{resource:r,textures:n,size:i+(0,I.iL)(r)}}async function mn(e,t){const r=t?.streamDataRequester;if(r)return pn(e,r,t);const n=await(0,O.Ke)((0,C.A)(e,t));if(!0===n.ok)return n.value.data;(0,L.QP)(n.error),vn(n.error)}async function pn(e,t,r){const n=await(0,O.Ke)(t.request(e,"json",r));if(!0===n.ok)return n.value;(0,L.QP)(n.error),vn(n.error.details.url)}function vn(e){throw new R.A("",`Request for object resource failed: ${e}`)}function gn(e){const t=e.params,r=t.topology;let n=!0;switch(t.vertexAttributes||(hn().warn("Geometry must specify vertex attributes"),n=!1),t.topology){case"PerAttributeArray":break;case"Indexed":case null:case void 0:{const e=t.faces;if(e){if(t.vertexAttributes)for(const r in t.vertexAttributes){const t=e[r];t?.values?(null!=t.valueType&&"UInt32"!==t.valueType&&(hn().warn(`Unsupported indexed geometry indices type '${t.valueType}', only UInt32 is currently supported`),n=!1),null!=t.valuesPerElement&&1!==t.valuesPerElement&&(hn().warn(`Unsupported indexed geometry values per element '${t.valuesPerElement}', only 1 is currently supported`),n=!1)):(hn().warn(`Indexed geometry does not specify face indices for '${r}' attribute`),n=!1)}}else hn().warn("Indexed geometries must specify faces"),n=!1;break}default:hn().warn(`Unsupported topology '${r}'`),n=!1}e.params.material||(hn().warn("Geometry requires material"),n=!1);const i=e.params.vertexAttributes;for(const o in i)i[o].values||(hn().warn("Geometries with externally defined attributes are not yet supported"),n=!1);return n}function _n(e,t){const r=new Array,n=new Array,i=new Array,o=new P.O,a=e.resource,s=H.R.parse(a.version||"1.0","wosr");An.validate(s);const l=a.model.name,c=a.model.geometries,u=a.materialDefinitions??{},h=e.textures;let f=0;const m=new Map;for(let p=0;p<c.length;p++){const e=c[p];if(!gn(e))continue;const a=yn(e),s=e.params.vertexAttributes,l=[],v=t=>{if("PerAttributeArray"===e.params.topology)return null;const r=e.params.faces;for(const e in r)if(e===t)return r[e].values;return null},g=s[ce.r.POSITION],_=g.values.length/g.valuesPerElement;for(const t in s){const e=s[t],r=e.values,n=v(t)??(0,D.tM)(_);l.push([t,new F.n(r,n,e.valuesPerElement,!0)])}const x=a.texture,T=h&&h[x];if(T&&!m.has(x)){const{image:e,parameters:t}=T,r=new ct(e,t);n.push(r),m.set(x,r)}const b=m.get(x),y=b?b.id:void 0,A=a.material;let E=o.get(A,x);if(null==E){const e=u[A.substring(A.lastIndexOf("/")+1)].params;1===e.transparency&&(e.transparency=0);const r=T&&T.alphaChannelUsage,n=e.transparency>0||"transparency"===r||"maskAndTransparency"===r,i=T?bn(T.alphaChannelUsage):void 0,a={ambient:(0,d.ci)(e.diffuse),diffuse:(0,d.ci)(e.diffuse),opacity:1-(e.transparency||0),transparent:n,textureAlphaMode:i,textureAlphaCutoff:.33,textureId:y,initTextureTransparent:!0,doubleSided:!0,cullFace:z.s2.None,colorMixMode:e.externalColorMixMode||"tint",textureAlphaPremultiplied:T?.parameters.preMultiplyAlpha??!1};t?.materialParameters&&Object.assign(a,t.materialParameters),E=new Qr(a),o.set(A,x,E)}i.push(E);const S=new he(E,l);f+=l.find((e=>e[0]===ce.r.POSITION))?.[1]?.indices.length??0,r.push(S)}return{engineResources:[{name:l,stageResources:{textures:n,materials:i,geometries:r},pivotOffset:a.model.pivotOffset,numberOfVertices:f,lodThreshold:null}],referenceBoundingBox:xn(r)}}function xn(e){const t=(0,h.Ie)();return e.forEach((e=>{const r=e.boundingInfo;null!=r&&((0,h.iT)(t,r.bbMin),(0,h.iT)(t,r.bbMax))})),t}async function Tn(e,t){const r=new Array;for(const o in e){const n=e[o],i=n.images[0].data;if(!i){hn().warn("Externally referenced texture data is not yet supported");continue}const a=n.encoding+";base64,"+i,s="/textureDefinitions/"+o,l="rgba"===n.channels?n.alphaChannelUsage||"transparency":"none",c={noUnpackFlip:!0,wrap:{s:Ae.pF.REPEAT,t:Ae.pF.REPEAT},preMultiplyAlpha:bn(l)!==z.sf.Opaque},u=t?.disableTextures?Promise.resolve(null):(0,B.D)(a,t);r.push(u.then((e=>({refId:s,image:e,parameters:c,alphaChannelUsage:l}))))}const n=await Promise.all(r),i={};for(const o of n)i[o.refId]=o;return i}function bn(e){switch(e){case"mask":return z.sf.Mask;case"maskAndTransparency":return z.sf.MaskBlend;case"none":return z.sf.Opaque;default:return z.sf.Blend}}function yn(e){const t=e.params;return{id:1,material:t.material,texture:t.texture,region:t.texture}}const An=new H.R(1,2,"wosr");var En=r(71343);async function Sn(e,t){const r=wn((0,n.EM)(e));if("wosr"===r.fileType){const e=await(t.cache?t.cache.loadWOSR(r.url,t):fn(r.url,t)),{engineResources:n,referenceBoundingBox:i}=_n(e,t);return{lods:n,referenceBoundingBox:i,isEsriSymbolResource:!1,isWosr:!0}}const i=await(t.cache?t.cache.loadGLTF(r.url,t,!!t.usePBR):(0,b.y)(new T.R(t.streamDataRequester),r.url,t,t.usePBR)),o=i.model.meta?.ESRI_proxyEllipsoid,a=i.meta.isEsriSymbolResource&&null!=o&&"EsriRealisticTreesStyle"===i.meta.ESRI_webstyle;a&&!i.customMeta.esriTreeRendering&&(i.customMeta.esriTreeRendering=!0,Nn(i,o));const s=!!t.usePBR,l=i.meta.isEsriSymbolResource?{usePBR:s,isSchematic:!1,treeRendering:a,mrrFactors:[...zr]}:{usePBR:s,isSchematic:!1,treeRendering:!1,mrrFactors:[...Br]},c={...t.materialParameters,treeRendering:a},{engineResources:u,referenceBoundingBox:d}=Mn(i,l,c,t.skipHighLods&&null==r.specifiedLodIndex?{skipHighLods:!0}:{skipHighLods:!1,singleLodIndex:r.specifiedLodIndex});return{lods:u,referenceBoundingBox:d,isEsriSymbolResource:i.meta.isEsriSymbolResource,isWosr:!1}}function wn(e){const t=e.match(/(.*\.(gltf|glb))(\?lod=([0-9]+))?$/);return t?{fileType:"gltf",url:t[1],specifiedLodIndex:null!=t[4]?Number(t[4]):null}:e.match(/(.*\.(json|json\.gz))$/)?{fileType:"wosr",url:e,specifiedLodIndex:null}:{fileType:"unknown",url:e,specifiedLodIndex:null}}function Mn(e,t,r,n){const i=e.model,o=new Array,a=new Map,s=new Map,l=i.lods.length,c=(0,h.Ie)();return i.lods.forEach(((e,u)=>{const d=!0===n.skipHighLods&&(l>1&&0===u||l>3&&1===u)||!1===n.skipHighLods&&null!=n.singleLodIndex&&u!==n.singleLodIndex;if(d&&0!==u)return;const f=new M(e.name,e.lodThreshold,[0,0,0]);e.parts.forEach((e=>{const n=d?new Qr({}):Cn(i,e,f,t,r,a,s),{geometry:o,vertexCount:l}=On(e,null!=n?n:new Qr({})),m=o.boundingInfo;null!=m&&0===u&&((0,h.iT)(c,m.bbMin),(0,h.iT)(c,m.bbMax)),null!=n&&(f.stageResources.geometries.push(o),f.numberOfVertices+=l)})),d||o.push(f)})),{engineResources:o,referenceBoundingBox:c}}function Cn(e,t,r,n,i,o,a){const s=t.material+(t.attributes.normal?"_normal":"")+(t.attributes.color?"_color":"")+(t.attributes.texCoord0?"_texCoord0":"")+(t.attributes.tangent?"_tangent":""),l=e.materials.get(t.material),u=null!=t.attributes.texCoord0,d=null!=t.attributes.normal;if(null==l)return null;const h=Rn(l.alphaMode);if(!o.has(s)){if(u){const t=(t,r=!1)=>{if(null!=t&&!a.has(t)){const n=e.textures.get(t);if(null!=n){const e=n.data;a.set(t,new ct((0,A.x3)(e)?e.data:e,{...n.parameters,preMultiplyAlpha:!(0,A.x3)(e)&&r,encoding:(0,A.x3)(e)&&null!=e.encoding?e.encoding:void 0}))}}};t(l.textureColor,h!==z.sf.Opaque),t(l.textureNormal),t(l.textureOcclusion),t(l.textureEmissive),t(l.textureMetallicRoughness)}const r=l.color[0]**(1/En.T),f=l.color[1]**(1/En.T),m=l.color[2]**(1/En.T),p=l.emissiveFactor[0]**(1/En.T),v=l.emissiveFactor[1]**(1/En.T),g=l.emissiveFactor[2]**(1/En.T),_=null!=l.textureColor&&u?a.get(l.textureColor):null,x=Dr({normalTexture:l.textureNormal,metallicRoughnessTexture:l.textureMetallicRoughness,metallicFactor:l.metallicFactor,roughnessFactor:l.roughnessFactor,emissiveTexture:l.textureEmissive,emissiveFactor:l.emissiveFactor,occlusionTexture:l.textureOcclusion}),T=null!=l.normalTextureTransform?.scale?l.normalTextureTransform?.scale:c.Un;o.set(s,new Qr({...n,transparent:h===z.sf.Blend,customDepthTest:z.it.Lequal,textureAlphaMode:h,textureAlphaCutoff:l.alphaCutoff,diffuse:[r,f,m],ambient:[r,f,m],opacity:l.opacity,doubleSided:l.doubleSided,doubleSidedType:"winding-order",cullFace:l.doubleSided?z.s2.None:z.s2.Back,hasVertexColors:!!t.attributes.color,hasVertexTangents:!!t.attributes.tangent,normalType:d?vt.W.Attribute:vt.W.ScreenDerivative,castShadows:!0,receiveShadows:l.receiveShadows,receiveAmbientOcclusion:l.receiveAmbientOcclustion,textureId:null!=_?_.id:void 0,colorMixMode:l.colorMixMode,normalTextureId:null!=l.textureNormal&&u?a.get(l.textureNormal).id:void 0,textureAlphaPremultiplied:null!=_&&!!_.parameters.preMultiplyAlpha,occlusionTextureId:null!=l.textureOcclusion&&u?a.get(l.textureOcclusion).id:void 0,emissiveTextureId:null!=l.textureEmissive&&u?a.get(l.textureEmissive).id:void 0,metallicRoughnessTextureId:null!=l.textureMetallicRoughness&&u?a.get(l.textureMetallicRoughness).id:void 0,emissiveFactor:[p,v,g],mrrFactors:x?[...Fr]:[l.metallicFactor,l.roughnessFactor,n.mrrFactors[2]],isSchematic:x,colorTextureTransformMatrix:S(l.colorTextureTransform),normalTextureTransformMatrix:S(l.normalTextureTransform),scale:[T[0],T[1]],occlusionTextureTransformMatrix:S(l.occlusionTextureTransform),emissiveTextureTransformMatrix:S(l.emissiveTextureTransform),metallicRoughnessTextureTransformMatrix:S(l.metallicRoughnessTextureTransform),...i}))}const f=o.get(s);if(r.stageResources.materials.push(f),u){const e=e=>{null!=e&&r.stageResources.textures.push(a.get(e))};e(l.textureColor),e(l.textureNormal),e(l.textureOcclusion),e(l.textureEmissive),e(l.textureMetallicRoughness)}return f}function On(e,t){const r=e.attributes.position.count,n=(0,y.x)(e.indices||r,e.primitiveType),a=(0,f.oe)(3*r),{typedBuffer:s,typedBufferStride:l}=e.attributes.position;(0,p.a)(a,s,e.transform,3,l);const c=[[ce.r.POSITION,new F.n(a,n,3,!0)]];if(null!=e.attributes.normal){const t=(0,f.oe)(3*r),{typedBuffer:a,typedBufferStride:s}=e.attributes.normal;(0,o.Ge)(In,e.transform),(0,p.t)(t,a,In,3,s),(0,i.or)(In)&&(0,p.n)(t,t),c.push([ce.r.NORMAL,new F.n(t,n,3,!0)])}if(null!=e.attributes.tangent){const t=(0,f.oe)(4*r),{typedBuffer:a,typedBufferStride:s}=e.attributes.tangent;(0,o.z0)(In,e.transform),(0,v.t)(t,a,In,4,s),(0,i.or)(In)&&(0,p.n)(t,t,4),c.push([ce.r.TANGENT,new F.n(t,n,4,!0)])}if(null!=e.attributes.texCoord0){const t=(0,f.oe)(2*r),{typedBuffer:i,typedBufferStride:o}=e.attributes.texCoord0;(0,g.n)(t,i,2,o),c.push([ce.r.UV0,new F.n(t,n,2,!0)])}const u=e.attributes.color;if(null!=u){const t=new Uint8Array(4*r);4===u.elementCount?u instanceof m.Eq?(0,v.s)(t,u,255):u instanceof m.XP?(0,x.c)(t,u):u instanceof m.Uz&&(0,v.s)(t,u,1/256):(t.fill(255),u instanceof m.xs?(0,p.s)(t,u.typedBuffer,255,4,u.typedBufferStride):e.attributes.color instanceof m.eI?(0,_.c)(t,u.typedBuffer,4,e.attributes.color.typedBufferStride):e.attributes.color instanceof m.nS&&(0,p.s)(t,u.typedBuffer,1/256,4,u.typedBufferStride)),c.push([ce.r.COLOR,new F.n(t,n,4,!0)])}return{geometry:new he(t,c),vertexCount:r}}const In=(0,a.vt)();function Rn(e){switch(e){case"BLEND":return z.sf.Blend;case"MASK":return z.sf.Mask;case"OPAQUE":case null:case void 0:return z.sf.Opaque}}function Nn(e,t){for(let r=0;r<e.model.lods.length;++r){const n=e.model.lods[r];for(const i of n.parts){const n=i.attributes.normal;if(null==n)return;const o=i.attributes.position,a=o.count,c=(0,d.vt)(),h=(0,d.vt)(),f=(0,d.vt)(),p=new Uint8Array(4*a),v=new Float64Array(3*a),g=(0,s.B8)((0,l.vt)(),i.transform);let _=0,x=0;for(let s=0;s<a;s++){o.getVec(s,h),n.getVec(s,c),(0,u.h)(h,h,i.transform),(0,u.f)(f,h,t.center),(0,u.D)(f,f,t.radius);const a=f[2],l=(0,u.l)(f),d=Math.min(.45+.55*l*l,1);(0,u.D)(f,f,t.radius),null!==g&&(0,u.h)(f,f,g),(0,u.n)(f,f),r+1!==e.model.lods.length&&e.model.lods.length>1&&(0,u.o)(f,f,c,a>-1?.2:Math.min(-4*a-3.8,1)),v[_]=f[0],v[_+1]=f[1],v[_+2]=f[2],_+=3,p[x]=255*d,p[x+1]=255*d,p[x+2]=255*d,p[x+3]=255,x+=4}i.attributes.normal=new m.xs(v),i.attributes.color=new m.XP(p)}}}},14526:function(e,t,r){r.d(t,{k5:function(){return n}});var n;r(27165);!function(e){e[e.Multiply=1]="Multiply",e[e.Ignore=2]="Ignore",e[e.Replace=3]="Replace",e[e.Tint=4]="Tint"}(n||(n={}))},84749:function(e,t,r){r.d(t,{BP:function(){return l},l5:function(){return c},q3:function(){return s}});r(44114),r(16573),r(78100),r(77936),r(37467),r(44732),r(79577);var n=r(67008),i=r(88085),o=r(24394);class a{constructor(e,t){this.layout=e,this.buffer="number"==typeof t?new ArrayBuffer(t*e.stride):t;for(const r of e.fields.keys()){const t=e.fields.get(r);this[r]=new t.constructor(this.buffer,t.offset,this.stride)}}get stride(){return this.layout.stride}get count(){return this.buffer.byteLength/this.stride}get byteLength(){return this.buffer.byteLength}getField(e,t){const r=this[e];return r&&r.elementCount===t.ElementCount&&r.elementType===t.ElementType?r:null}slice(e,t){return new a(this.layout,this.buffer.slice(e*this.stride,t*this.stride))}copyFrom(e,t=0,r=0,n=e.count){const i=this.stride;if(i%4==0){const o=new Uint32Array(e.buffer,t*i,n*i/4);new Uint32Array(this.buffer,r*i,n*i/4).set(o)}else{const o=new Uint8Array(e.buffer,t*i,n*i);new Uint8Array(this.buffer,r*i,n*i).set(o)}return this}get usedMemory(){return this.byteLength}dispose(){}}class s{constructor(e=null){this._stride=0,this._lastAligned=0,this._fields=new Map,e&&(this._stride=e.stride,e.fields.forEach((e=>this._fields.set(e[0],{...e[1],constructor:h(e[1].constructor)}))))}freeze(){return this}vec2f(e,t){return this._appendField(e,n.gH,t),this}vec2f64(e,t){return this._appendField(e,n.si,t),this}vec3f(e,t){return this._appendField(e,n.xs,t),this}vec3f64(e,t){return this._appendField(e,n.Xm,t),this}vec4f(e,t){return this._appendField(e,n.Eq,t),this}vec4f64(e,t){return this._appendField(e,n.Aj,t),this}mat3f(e,t){return this._appendField(e,n.jZ,t),this}mat3f64(e,t){return this._appendField(e,n.j0,t),this}mat4f(e,t){return this._appendField(e,n.Sx,t),this}mat4f64(e,t){return this._appendField(e,n.E$,t),this}vec4u8(e,t){return this._appendField(e,n.XP,t),this}f32(e,t){return this._appendField(e,n.Y$,t),this}f64(e,t){return this._appendField(e,n.qB,t),this}u8(e,t){return this._appendField(e,n.SL,t),this}u16(e,t){return this._appendField(e,n.h,t),this}i8(e,t){return this._appendField(e,n.bf,t),this}vec2i8(e,t){return this._appendField(e,n.D6,t),this}vec2i16(e,t){return this._appendField(e,n.mJ,t),this}vec2u8(e,t){return this._appendField(e,n.LC,t),this}vec4u16(e,t){return this._appendField(e,n.Uz,t),this}u32(e,t){return this._appendField(e,n.P,t),this}_appendField(e,t,r){if(this._fields.has(e))return void(0,o.vA)(!1,`${e} already added to vertex buffer layout`);const n=t.ElementCount*(0,i.GJ)(t.ElementType),a=this._stride;this._stride+=n,this._fields.set(e,{size:n,constructor:t,offset:a,optional:r})}createBuffer(e){return new a(this,e)}createView(e){return new a(this,e)}clone(){const e=new s;return e._stride=this._stride,e._fields=new Map,this._fields.forEach(((t,r)=>e._fields.set(r,t))),e.BufferType=this.BufferType,e}get stride(){if(this._lastAligned!==this._fields.size){let e=1;this._fields.forEach((t=>e=Math.max(e,(0,i.GJ)(t.constructor.ElementType)))),this._stride=Math.floor((this._stride+e-1)/e)*e,this._lastAligned=this._fields.size}return this._stride}get fields(){return this._fields}}function l(){return new s}class c{constructor(e){this.fields=new Array,e.fields.forEach(((e,t)=>{const r={...e,constructor:d(e.constructor)};this.fields.push([t,r])})),this.stride=e.stride}}const u=[n.Y$,n.gH,n.xs,n.Eq,n.jZ,n.Sx,n.qB,n.si,n.Xm,n.Aj,n.j0,n.E$,n.SL,n.LC,n.eI,n.XP,n.h,n.Yi,n.nS,n.Uz,n.P,n.An,n.H$,n.ml,n.bf,n.D6,n.m8,n.TX,n.Qt,n.mJ,n.Vp,n.E7,n.My,n.UL,n.zD,n.Y4];function d(e){return`${e.ElementType}_${e.ElementCount}`}function h(e){return f.get(e)}const f=new Map;u.forEach((e=>f.set(d(e),e)))},91333:function(e,t,r){r.d(t,{A:function(){return o}});var n=r(14526),i=r(76527);function o(e){e.vertex.code.add(i.H`
    vec4 decodeSymbolColor(vec4 symbolColor, out int colorMixMode) {
      float symbolAlpha = 0.0;

      const float maxTint = 85.0;
      const float maxReplace = 170.0;
      const float scaleAlpha = 3.0;

      if (symbolColor.a > maxReplace) {
        colorMixMode = ${i.H.int(n.k5.Multiply)};
        symbolAlpha = scaleAlpha * (symbolColor.a - maxReplace);
      } else if (symbolColor.a > maxTint) {
        colorMixMode = ${i.H.int(n.k5.Replace)};
        symbolAlpha = scaleAlpha * (symbolColor.a - maxTint);
      } else if (symbolColor.a > 0.0) {
        colorMixMode = ${i.H.int(n.k5.Tint)};
        symbolAlpha = scaleAlpha * symbolColor.a;
      } else {
        colorMixMode = ${i.H.int(n.k5.Multiply)};
        symbolAlpha = 0.0;
      }

      return vec4(symbolColor.r, symbolColor.g, symbolColor.b, symbolAlpha);
    }
  `)}},4468:function(e,t,r){r.d(t,{i$:function(){return c},oD:function(){return u},xJ:function(){return l}});var n=r(35277),i=r(59326),o=r(93348),a=r(76527);function s(e){e.varyings.add("linearDepth","float")}function l(e){e.vertex.uniforms.add(new o.G("nearFar",((e,t)=>t.camera.nearFar)))}function c(e){e.vertex.code.add(a.H`float calculateLinearDepth(vec2 nearFar,float z) {
return (-z - nearFar[0]) / (nearFar[1] - nearFar[0]);
}`)}function u(e,t){const{vertex:r}=e;switch(t.output){case n.V.Color:if(t.receiveShadows)return s(e),void r.code.add(a.H`void forwardLinearDepth() { linearDepth = gl_Position.w; }`);break;case n.V.Shadow:case n.V.ShadowHighlight:case n.V.ShadowExcludeHighlight:case n.V.ViewshedShadow:return e.include(i.em,t),s(e),l(e),c(e),void r.code.add(a.H`void forwardLinearDepth() {
linearDepth = calculateLinearDepth(nearFar, vPosition_view.z);
}`)}r.code.add(a.H`void forwardLinearDepth() {}`)}},76354:function(e,t,r){r.d(t,{M:function(){return i}});var n=r(76527);function i(e){e.vertex.code.add(n.H`vec4 offsetBackfacingClipPosition(vec4 posClip, vec3 posWorld, vec3 normalWorld, vec3 camPosWorld) {
vec3 camToVert = posWorld - camPosWorld;
bool isBackface = dot(camToVert, normalWorld) > 0.0;
if (isBackface) {
posClip.z += 0.0000003 * posClip.w;
}
return posClip;
}`)}},24030:function(e,t,r){r.d(t,{c:function(){return o}});var n=r(76527),i=r(814);function o(e,t=!0){e.attributes.add(i.r.POSITION,"vec2"),t&&e.varyings.add("uv","vec2"),e.vertex.code.add(n.H`
    void main(void) {
      gl_Position = vec4(position, 0.0, 1.0);
      ${t?n.H`uv = position * 0.5 + vec2(0.5);`:""}
    }
  `)}},35277:function(e,t,r){var n;function i(e){return e===n.Shadow||e===n.ShadowHighlight||e===n.ShadowExcludeHighlight||e===n.ViewshedShadow}function o(e){return c(e)||e===n.Normal}function a(e){return e===n.Highlight||e===n.ObjectAndLayerIdColor}function s(e){return e===n.Color}function l(e){return s(e)||a(e)}function c(e){return l(e)||u(e)}function u(e){return e===n.Depth}r.d(t,{PJ:function(){return i},V:function(){return n},XY:function(){return o}}),function(e){e[e.Color=0]="Color",e[e.Depth=1]="Depth",e[e.Normal=2]="Normal",e[e.Shadow=3]="Shadow",e[e.ShadowHighlight=4]="ShadowHighlight",e[e.ShadowExcludeHighlight=5]="ShadowExcludeHighlight",e[e.ViewshedShadow=6]="ViewshedShadow",e[e.Highlight=7]="Highlight",e[e.ObjectAndLayerIdColor=8]="ObjectAndLayerIdColor",e[e.COUNT=9]="COUNT"}(n||(n={}))},65117:function(e,t,r){r.d(t,{HQ:function(){return c}});var n=r(44337),i=r(17455),o=r(3568),a=r(74344),s=r(19404),l=(r(4357),r(76527));l.Y;function c(e,t){u(e,t,new s.W("slicePlaneOrigin",((e,r)=>m(t,e,r))),new s.W("slicePlaneBasis1",((e,r)=>p(t,e,r,r.slicePlane?.basis1))),new s.W("slicePlaneBasis2",((e,r)=>p(t,e,r,r.slicePlane?.basis2))))}function u(e,t,...r){if(!t.hasSlicePlane){const r=l.H`#define rejectBySlice(_pos_) false
#define discardBySlice(_pos_) {}
#define highlightSlice(_color_, _pos_) (_color_)`;return t.hasSliceInVertexProgram&&e.vertex.code.add(r),void e.fragment.code.add(r)}t.hasSliceInVertexProgram&&e.vertex.uniforms.add(...r),e.fragment.uniforms.add(...r);const n=l.H`struct SliceFactors {
float front;
float side0;
float side1;
float side2;
float side3;
};
SliceFactors calculateSliceFactors(vec3 pos) {
vec3 rel = pos - slicePlaneOrigin;
vec3 slicePlaneNormal = -cross(slicePlaneBasis1, slicePlaneBasis2);
float slicePlaneW = -dot(slicePlaneNormal, slicePlaneOrigin);
float basis1Len2 = dot(slicePlaneBasis1, slicePlaneBasis1);
float basis2Len2 = dot(slicePlaneBasis2, slicePlaneBasis2);
float basis1Dot = dot(slicePlaneBasis1, rel);
float basis2Dot = dot(slicePlaneBasis2, rel);
return SliceFactors(
dot(slicePlaneNormal, pos) + slicePlaneW,
-basis1Dot - basis1Len2,
basis1Dot - basis1Len2,
-basis2Dot - basis2Len2,
basis2Dot - basis2Len2
);
}
bool sliceByFactors(SliceFactors factors) {
return factors.front < 0.0
&& factors.side0 < 0.0
&& factors.side1 < 0.0
&& factors.side2 < 0.0
&& factors.side3 < 0.0;
}
bool sliceEnabled() {
return dot(slicePlaneBasis1, slicePlaneBasis1) != 0.0;
}
bool sliceByPlane(vec3 pos) {
return sliceEnabled() && sliceByFactors(calculateSliceFactors(pos));
}
#define rejectBySlice(_pos_) sliceByPlane(_pos_)
#define discardBySlice(_pos_) { if (sliceByPlane(_pos_)) discard; }`,i=l.H`vec4 applySliceHighlight(vec4 color, vec3 pos) {
SliceFactors factors = calculateSliceFactors(pos);
const float HIGHLIGHT_WIDTH = 1.0;
const vec4 HIGHLIGHT_COLOR = vec4(0.0, 0.0, 0.0, 0.3);
factors.front /= (2.0 * HIGHLIGHT_WIDTH) * fwidth(factors.front);
factors.side0 /= (2.0 * HIGHLIGHT_WIDTH) * fwidth(factors.side0);
factors.side1 /= (2.0 * HIGHLIGHT_WIDTH) * fwidth(factors.side1);
factors.side2 /= (2.0 * HIGHLIGHT_WIDTH) * fwidth(factors.side2);
factors.side3 /= (2.0 * HIGHLIGHT_WIDTH) * fwidth(factors.side3);
if (sliceByFactors(factors)) {
return color;
}
float highlightFactor = (1.0 - step(0.5, factors.front))
* (1.0 - step(0.5, factors.side0))
* (1.0 - step(0.5, factors.side1))
* (1.0 - step(0.5, factors.side2))
* (1.0 - step(0.5, factors.side3));
return mix(color, vec4(HIGHLIGHT_COLOR.rgb, color.a), highlightFactor * HIGHLIGHT_COLOR.a);
}`,o=t.hasSliceHighlight?l.H`
        ${i}
        #define highlightSlice(_color_, _pos_) (sliceEnabled() ? applySliceHighlight(_color_, _pos_) : (_color_))
      `:l.H`#define highlightSlice(_color_, _pos_) (_color_)`;t.hasSliceInVertexProgram&&e.vertex.code.add(n),e.fragment.code.add(n),e.fragment.code.add(o)}function d(e,t,r){return e.instancedDoublePrecision?(0,o.s)(v,r.camera.viewInverseTransposeMatrix[3],r.camera.viewInverseTransposeMatrix[7],r.camera.viewInverseTransposeMatrix[11]):t.slicePlaneLocalOrigin}function h(e,t){return null!=e?(0,o.f)(g,t.origin,e):t.origin}function f(e,t,r){return e.hasSliceTranslatedView?null!=t?(0,n.Tl)(x,r.camera.viewMatrix,t):r.camera.viewMatrix:null}function m(e,t,r){if(null==r.slicePlane)return a.uY;const n=d(e,t,r),i=h(n,r.slicePlane),s=f(e,n,r);return null!=s?(0,o.h)(g,i,s):i}function p(e,t,r,n){if(null==n||null==r.slicePlane)return a.uY;const i=d(e,t,r),s=h(i,r.slicePlane),l=f(e,i,r);return null!=l?((0,o.g)(_,n,s),(0,o.h)(g,s,l),(0,o.h)(_,_,l),(0,o.f)(_,_,g)):n}const v=(0,a.vt)(),g=(0,a.vt)(),_=(0,a.vt)(),x=(0,i.vt)()},91595:function(e,t,r){r.d(t,{d:function(){return o}});var n=r(4468),i=r(76527);function o(e){(0,n.i$)(e),e.vertex.code.add(i.H`vec4 transformPositionWithDepth(mat4 proj, mat4 view, vec3 pos, vec2 nearFar, out float depth) {
vec4 eye = view * vec4(pos, 1.0);
depth = calculateLinearDepth(nearFar,eye.z);
return proj * eye;
}`),e.vertex.code.add(i.H`vec4 transformPosition(mat4 proj, mat4 view, vec3 pos) {
return proj * (view * vec4(pos, 1.0));
}`)}},85273:function(e,t,r){r.d(t,{BK:function(){return b},nW:function(){return x}});var n=r(40399),i=r(4260),o=r(36816),a=r(17455),s=r(3568),l=r(74344),c=r(35277),u=r(29515),d=r(18967),h=r(19404),f=r(76527),m=r(86754),p=r(47673),v=r(70047),g=r(814),_=r(24051);class x extends v.K{constructor(){super(...arguments),this.instancedDoublePrecision=!1,this.hasModelTransformation=!1}}(0,n._)([(0,v.W)()],x.prototype,"instancedDoublePrecision",void 0),(0,n._)([(0,v.W)()],x.prototype,"hasModelTransformation",void 0);f.Y;const T=(0,o.vt)();function b(e,t){const r=t.hasModelTransformation,n=t.instancedDoublePrecision;r&&(e.vertex.uniforms.add(new p.X("model",(e=>e.modelTransformation??a.zK))),e.vertex.uniforms.add(new m.k("normalLocalOriginFromModel",(e=>((0,i.Ge)(T,e.modelTransformation??a.zK),T))))),t.instanced&&n&&(e.attributes.add(g.r.INSTANCEMODELORIGINHI,"vec3"),e.attributes.add(g.r.INSTANCEMODELORIGINLO,"vec3"),e.attributes.add(g.r.INSTANCEMODEL,"mat3"),e.attributes.add(g.r.INSTANCEMODELNORMAL,"mat3"));const o=e.vertex;n&&(o.include(u.u,t),o.uniforms.add(new h.W("viewOriginHi",((e,t)=>(0,_.Zo)((0,s.s)(y,t.camera.viewInverseTransposeMatrix[3],t.camera.viewInverseTransposeMatrix[7],t.camera.viewInverseTransposeMatrix[11]),y))),new h.W("viewOriginLo",((e,t)=>(0,_.jA)((0,s.s)(y,t.camera.viewInverseTransposeMatrix[3],t.camera.viewInverseTransposeMatrix[7],t.camera.viewInverseTransposeMatrix[11]),y))))),o.code.add(f.H`
    vec3 getVertexInLocalOriginSpace() {
      return ${r?n?"(model * vec4(instanceModel * localPosition().xyz, 1.0)).xyz":"(model * localPosition()).xyz":n?"instanceModel * localPosition().xyz":"localPosition().xyz"};
    }

    vec3 subtractOrigin(vec3 _pos) {
      ${n?f.H`
          // Negated inputs are intentionally the first two arguments. The other way around the obfuscation in dpAdd() stopped
          // working for macOS 14+ and iOS 17+.
          // Issue: https://devtopia.esri.com/WebGIS/arcgis-js-api/issues/56280
          vec3 originDelta = dpAdd(-instanceModelOriginHi, -instanceModelOriginLo, viewOriginHi, viewOriginLo);
          return _pos - originDelta;`:"return vpos;"}
    }
    `),o.code.add(f.H`
    vec3 dpNormal(vec4 _normal) {
      return normalize(${r?n?"normalLocalOriginFromModel * (instanceModelNormal * _normal.xyz)":"normalLocalOriginFromModel * _normal.xyz":n?"instanceModelNormal * _normal.xyz":"_normal.xyz"});
    }
    `),t.output===c.V.Normal&&((0,d.S7)(o),o.code.add(f.H`
    vec3 dpNormalView(vec4 _normal) {
      return normalize((viewNormal * ${r?n?"vec4(normalLocalOriginFromModel * (instanceModelNormal * _normal.xyz), 1.0)":"vec4(normalLocalOriginFromModel * _normal.xyz, 1.0)":n?"vec4(instanceModelNormal * _normal.xyz, 1.0)":"_normal"}).xyz);
    }
    `)),t.hasVertexTangents&&o.code.add(f.H`
    vec4 dpTransformVertexTangent(vec4 _tangent) {
      ${r?n?"return vec4(normalLocalOriginFromModel * (instanceModelNormal * _tangent.xyz), _tangent.w);":"return vec4(normalLocalOriginFromModel * _tangent.xyz, _tangent.w);":n?"return vec4(instanceModelNormal * _tangent.xyz, _tangent.w);":"return _tangent;"}
    }`)}const y=(0,l.vt)()},39102:function(e,t,r){r.d(t,{W:function(){return n},Y:function(){return s}});var n,i=r(92268),o=r(76527),a=r(814);function s(e,t){switch(t.normalType){case n.Compressed:e.attributes.add(a.r.NORMALCOMPRESSED,"vec2"),e.vertex.code.add(o.H`vec3 decompressNormal(vec2 normal) {
float z = 1.0 - abs(normal.x) - abs(normal.y);
return vec3(normal + sign(normal) * min(z, 0.0), z);
}
vec3 normalModel() {
return decompressNormal(normalCompressed);
}`);break;case n.Attribute:e.attributes.add(a.r.NORMAL,"vec3"),e.vertex.code.add(o.H`vec3 normalModel() {
return normal;
}`);break;case n.ScreenDerivative:e.fragment.code.add(o.H`vec3 screenDerivativeNormal(vec3 positionView) {
return normalize(cross(dFdx(positionView), dFdy(positionView)));
}`);break;default:(0,i.Xb)(t.normalType);case n.COUNT:case n.Ground:}}!function(e){e[e.Attribute=0]="Attribute",e[e.Compressed=1]="Compressed",e[e.Ground=2]="Ground",e[e.ScreenDerivative=3]="ScreenDerivative",e[e.COUNT=4]="COUNT"}(n||(n={}))},86286:function(e,t,r){r.d(t,{I:function(){return o}});var n=r(76527),i=r(814);function o(e){e.attributes.add(i.r.POSITION,"vec3"),e.vertex.code.add(n.H`vec3 positionModel() { return position; }`)}},84284:function(e,t,r){r.d(t,{K:function(){return l}});var n=r(91333),i=r(56126),o=r(76527),a=r(814),s=r(16437);function l(e,t){t.hasSymbolColors?(e.include(n.A),e.attributes.add(a.r.SYMBOLCOLOR,"vec4"),e.varyings.add("colorMixMode","mediump float"),e.vertex.code.add(o.H`int symbolColorMixMode;
vec4 getSymbolColor() {
return decodeSymbolColor(symbolColor, symbolColorMixMode) * 0.003921568627451;
}
void forwardColorMixMode() {
colorMixMode = float(symbolColorMixMode) + 0.5;
}`)):(e.fragment.uniforms.add(new i.c("colorMixMode",(e=>s.Um[e.colorMixMode]))),e.vertex.code.add(o.H`vec4 getSymbolColor() { return vec4(1.0); }
void forwardColorMixMode() {}`))}},66856:function(e,t,r){r.d(t,{U:function(){return s},q:function(){return n}});var n,i=r(92268),o=r(76527),a=r(814);function s(e,t){switch(t.textureCoordinateType){case n.Default:return e.attributes.add(a.r.UV0,"vec2"),e.varyings.add("vuv0","vec2"),void e.vertex.code.add(o.H`void forwardTextureCoordinates() {
vuv0 = uv0;
}`);case n.Compressed:return e.attributes.add(a.r.UV0,"vec2"),e.varyings.add("vuv0","vec2"),void e.vertex.code.add(o.H`vec2 getUV0() {
return uv0 / 16384.0;
}
void forwardTextureCoordinates() {
vuv0 = getUV0();
}`);case n.Atlas:return e.attributes.add(a.r.UV0,"vec2"),e.varyings.add("vuv0","vec2"),e.attributes.add(a.r.UVREGION,"vec4"),e.varyings.add("vuvRegion","vec4"),void e.vertex.code.add(o.H`void forwardTextureCoordinates() {
vuv0 = uv0;
vuvRegion = uvRegion;
}`);default:(0,i.Xb)(t.textureCoordinateType);case n.None:return void e.vertex.code.add(o.H`void forwardTextureCoordinates() {}`);case n.COUNT:return}}!function(e){e[e.None=0]="None",e[e.Default=1]="Default",e[e.Atlas=2]="Atlas",e[e.Compressed=3]="Compressed",e[e.COUNT=4]="COUNT"}(n||(n={}))},98774:function(e,t,r){r.d(t,{c:function(){return o}});var n=r(76527),i=r(814);function o(e,t){t.hasVertexColors?(e.attributes.add(i.r.COLOR,"vec4"),e.varyings.add("vColor","vec4"),e.vertex.code.add(n.H`void forwardVertexColor() { vColor = color; }`),e.vertex.code.add(n.H`void forwardNormalizedVertexColor() { vColor = color * 0.003921568627451; }`)):e.vertex.code.add(n.H`void forwardVertexColor() {}
void forwardNormalizedVertexColor() {}`)}},99426:function(e,t,r){r.d(t,{Mh:function(){return d},Zo:function(){return h},gy:function(){return f}});var n=r(92268),i=r(36816),o=r(43911),a=r(39102),s=r(59326),l=r(76527),c=r(86207),u=r(86754);function d(e,t){switch(t.normalType){case a.W.Attribute:case a.W.Compressed:e.include(a.Y,t),e.varyings.add("vNormalWorld","vec3"),e.varyings.add("vNormalView","vec3"),e.vertex.uniforms.add(new c.h("transformNormalGlobalFromModel",(e=>e.transformNormalGlobalFromModel)),new u.k("transformNormalViewFromGlobal",(e=>e.transformNormalViewFromGlobal))),e.vertex.code.add(l.H`void forwardNormal() {
vNormalWorld = transformNormalGlobalFromModel * normalModel();
vNormalView = transformNormalViewFromGlobal * vNormalWorld;
}`);break;case a.W.Ground:e.include(s.em,t),e.varyings.add("vNormalWorld","vec3"),e.vertex.code.add(l.H`
        void forwardNormal() {
          vNormalWorld = ${t.spherical?l.H`normalize(vPositionWorldCameraRelative);`:l.H`vec3(0.0, 0.0, 1.0);`}
        }
        `);break;case a.W.ScreenDerivative:e.vertex.code.add(l.H`void forwardNormal() {}`);break;default:(0,n.Xb)(t.normalType);case a.W.COUNT:}}class h extends s.dO{constructor(){super(...arguments),this.transformNormalViewFromGlobal=(0,i.vt)()}}class f extends s.EM{constructor(){super(...arguments),this.transformNormalGlobalFromModel=(0,i.vt)(),this.toMapSpace=(0,o.vt)()}}},59326:function(e,t,r){r.d(t,{EM:function(){return v},dO:function(){return p},em:function(){return m}});var n=r(36816),i=r(17455),o=r(74344),a=r(86286),s=r(29515),l=r(19404),c=r(4357),u=r(76527),d=r(86207),h=r(86754),f=r(47673);function m(e,t){e.include(a.I);const r=e.vertex;r.include(s.u,t),e.varyings.add("vPositionWorldCameraRelative","vec3"),e.varyings.add("vPosition_view","vec3"),r.uniforms.add(new c.t("transformWorldFromViewTH",(e=>e.transformWorldFromViewTH)),new c.t("transformWorldFromViewTL",(e=>e.transformWorldFromViewTL)),new h.k("transformViewFromCameraRelativeRS",(e=>e.transformViewFromCameraRelativeRS)),new f.X("transformProjFromView",(e=>e.transformProjFromView)),new d.h("transformWorldFromModelRS",(e=>e.transformWorldFromModelRS)),new l.W("transformWorldFromModelTH",(e=>e.transformWorldFromModelTH)),new l.W("transformWorldFromModelTL",(e=>e.transformWorldFromModelTL))),r.code.add(u.H`vec3 positionWorldCameraRelative() {
vec3 rotatedModelPosition = transformWorldFromModelRS * positionModel();
vec3 transform_CameraRelativeFromModel = dpAdd(
transformWorldFromModelTL,
transformWorldFromModelTH,
-transformWorldFromViewTL,
-transformWorldFromViewTH
);
return transform_CameraRelativeFromModel + rotatedModelPosition;
}`),r.code.add(u.H`
    void forwardPosition(float fOffset) {
      vPositionWorldCameraRelative = positionWorldCameraRelative();
      if (fOffset != 0.0) {
        vPositionWorldCameraRelative += fOffset * ${t.spherical?u.H`normalize(transformWorldFromViewTL + vPositionWorldCameraRelative)`:u.H`vec3(0.0, 0.0, 1.0)`};
      }

      vPosition_view = transformViewFromCameraRelativeRS * vPositionWorldCameraRelative;
      gl_Position = transformProjFromView * vec4(vPosition_view, 1.0);
    }
  `),e.fragment.uniforms.add(new c.t("transformWorldFromViewTL",(e=>e.transformWorldFromViewTL))),r.code.add(u.H`vec3 positionWorld() {
return transformWorldFromViewTL + vPositionWorldCameraRelative;
}`),e.fragment.code.add(u.H`vec3 positionWorld() {
return transformWorldFromViewTL + vPositionWorldCameraRelative;
}`)}class p extends u.Y{constructor(){super(...arguments),this.transformWorldFromViewTH=(0,o.vt)(),this.transformWorldFromViewTL=(0,o.vt)(),this.transformViewFromCameraRelativeRS=(0,n.vt)(),this.transformProjFromView=(0,i.vt)()}}class v extends u.Y{constructor(){super(...arguments),this.transformWorldFromModelRS=(0,n.vt)(),this.transformWorldFromModelTH=(0,o.vt)(),this.transformWorldFromModelTL=(0,o.vt)()}}},85012:function(e,t,r){r.d(t,{r:function(){return s}});var n=r(92268),i=r(66856),o=r(76527);function a(e){e.fragment.code.add(o.H`vec4 textureAtlasLookup(sampler2D tex, vec2 textureCoordinates, vec4 atlasRegion) {
vec2 atlasScale = atlasRegion.zw - atlasRegion.xy;
vec2 uvAtlas = fract(textureCoordinates) * atlasScale + atlasRegion.xy;
float maxdUV = 0.125;
vec2 dUVdx = clamp(dFdx(textureCoordinates), -maxdUV, maxdUV) * atlasScale;
vec2 dUVdy = clamp(dFdy(textureCoordinates), -maxdUV, maxdUV) * atlasScale;
return textureGrad(tex, uvAtlas, dUVdx, dUVdy);
}`)}function s(e,t){switch(e.include(i.U,t),t.textureCoordinateType){case i.q.Default:case i.q.Compressed:return void e.fragment.code.add(o.H`vec4 textureLookup(sampler2D tex, vec2 uv) {
return texture(tex, uv);
}`);case i.q.Atlas:return e.include(a),void e.fragment.code.add(o.H`vec4 textureLookup(sampler2D tex, vec2 uv) {
return textureAtlasLookup(tex, uv, vuvRegion);
}`);default:(0,n.Xb)(t.textureCoordinateType);case i.q.None:case i.q.COUNT:return}}},95866:function(e,t,r){r.d(t,{G:function(){return p}});var n=r(88031),i=r(43911),o=r(3568),a=r(74344),s=r(4357),l=r(76527);function c(e){e.vertex.code.add(l.H`float screenSizePerspectiveViewAngleDependentFactor(float absCosAngle) {
return absCosAngle * absCosAngle * absCosAngle;
}`),e.vertex.code.add(l.H`vec3 screenSizePerspectiveScaleFactor(float absCosAngle, float distanceToCamera, vec3 params) {
return vec3(
min(params.x / (distanceToCamera - params.y), 1.0),
screenSizePerspectiveViewAngleDependentFactor(absCosAngle),
params.z
);
}`),e.vertex.code.add(l.H`float applyScreenSizePerspectiveScaleFactorFloat(float size, vec3 factor) {
return mix(size * clamp(factor.x, factor.z, 1.0), size, factor.y);
}`),e.vertex.code.add(l.H`float screenSizePerspectiveScaleFloat(float size, float absCosAngle, float distanceToCamera, vec3 params) {
return applyScreenSizePerspectiveScaleFactorFloat(
size,
screenSizePerspectiveScaleFactor(absCosAngle, distanceToCamera, params)
);
}`),e.vertex.code.add(l.H`vec2 applyScreenSizePerspectiveScaleFactorVec2(vec2 size, vec3 factor) {
return mix(size * clamp(factor.x, factor.z, 1.0), size, factor.y);
}`),e.vertex.code.add(l.H`vec2 screenSizePerspectiveScaleVec2(vec2 size, float absCosAngle, float distanceToCamera, vec3 params) {
return applyScreenSizePerspectiveScaleFactorVec2(size, screenSizePerspectiveScaleFactor(absCosAngle, distanceToCamera, params));
}`)}function u(e){e.uniforms.add(new s.t("screenSizePerspectiveAlignment",(e=>d(e.screenSizePerspectiveAlignment||e.screenSizePerspective))))}function d(e){return(0,o.s)(h,e.parameters.divisor,e.parameters.offset,e.minScaleFactor)}const h=(0,a.vt)();var f=r(18967),m=r(43494);function p(e,t){const r=e.vertex;t.hasVerticalOffset?(g(r),t.hasScreenSizePerspective&&(e.include(c),u(r),(0,f.yu)(e.vertex,t)),r.code.add(l.H`
      vec3 calculateVerticalOffset(vec3 worldPos, vec3 localOrigin) {
        float viewDistance = length((view * vec4(worldPos, 1.0)).xyz);
        ${t.spherical?l.H`vec3 worldNormal = normalize(worldPos + localOrigin);`:l.H`vec3 worldNormal = vec3(0.0, 0.0, 1.0);`}
        ${t.hasScreenSizePerspective?l.H`
            float cosAngle = dot(worldNormal, normalize(worldPos - cameraPosition));
            float verticalOffsetScreenHeight = screenSizePerspectiveScaleFloat(verticalOffset.x, abs(cosAngle), viewDistance, screenSizePerspectiveAlignment);`:l.H`
            float verticalOffsetScreenHeight = verticalOffset.x;`}
        // Screen sized offset in world space, used for example for line callouts
        float worldOffset = clamp(verticalOffsetScreenHeight * verticalOffset.y * viewDistance, verticalOffset.z, verticalOffset.w);
        return worldNormal * worldOffset;
      }

      vec3 addVerticalOffset(vec3 worldPos, vec3 localOrigin) {
        return worldPos + calculateVerticalOffset(worldPos, localOrigin);
      }
    `)):r.code.add(l.H`vec3 addVerticalOffset(vec3 worldPos, vec3 localOrigin) { return worldPos; }`)}const v=(0,i.vt)();function g(e){e.uniforms.add(new m.E("verticalOffset",((e,t)=>{const{minWorldLength:r,maxWorldLength:i,screenLength:o}=e.verticalOffset,a=Math.tan(.5*t.camera.fovY)/(.5*t.camera.fullViewport[3]),s=t.camera.pixelRatio||1;return(0,n.s)(v,o*s,a,r,i)})))}},59691:function(e,t,r){r.d(t,{E:function(){return E}});var n=r(4468),i=r(35277),o=r(65117),a=r(91595),s=r(39102),l=r(76527),c=r(814);function u(e,t){const r=t.output===i.V.ObjectAndLayerIdColor,n=t.objectAndLayerIdColorInstanced;r&&(e.varyings.add("objectAndLayerIdColorVarying","vec4"),n?e.attributes.add(c.r.INSTANCEOBJECTANDLAYERIDCOLOR,"vec4"):e.attributes.add(c.r.OBJECTANDLAYERIDCOLOR,"vec4")),e.vertex.code.add(l.H`
     void forwardObjectAndLayerIdColor() {
      ${r?n?l.H`objectAndLayerIdColorVarying = instanceObjectAndLayerIdColor * 0.003921568627451;`:l.H`objectAndLayerIdColorVarying = objectAndLayerIdColor * 0.003921568627451;`:l.H``} }`),e.fragment.code.add(l.H`
      void outputObjectAndLayerIdColor() {
        ${r?l.H`fragColor = objectAndLayerIdColorVarying;`:l.H``} }`)}var d=r(66856),h=r(99426),f=r(67500);function m(e,t){switch(t.output){case i.V.Shadow:case i.V.ShadowHighlight:case i.V.ShadowExcludeHighlight:case i.V.ViewshedShadow:e.fragment.include(f.U),e.fragment.code.add(l.H`float _calculateFragDepth(const in float depth) {
const float SLOPE_SCALE = 2.0;
const float BIAS = 20.0 * .000015259;
float m = max(abs(dFdx(depth)), abs(dFdy(depth)));
return depth + SLOPE_SCALE * m + BIAS;
}
void outputDepth(float _linearDepth) {
fragColor = floatToRgba4(_calculateFragDepth(_linearDepth));
}`)}}var p=r(43911),v=r(93687);const g=(0,p.fA)(1,1,0,1),_=(0,p.fA)(1,0,1,1);function x(e){e.fragment.uniforms.add(new v.N("depthTexture",((e,t)=>t.mainDepth))),e.fragment.constants.add("occludedHighlightFlag","vec4",g).add("unoccludedHighlightFlag","vec4",_),e.fragment.code.add(l.H`void outputHighlight() {
float sceneDepth = float(texelFetch(depthTexture, ivec2(gl_FragCoord.xy), 0).x);
if (gl_FragCoord.z > sceneDepth + 5e-7) {
fragColor = occludedHighlightFlag;
} else {
fragColor = unoccludedHighlightFlag;
}
}`)}var T=r(44077),b=r(60047),y=r(18967),A=r(53338);function E(e,t){const{vertex:r,fragment:c}=e,f=t.hasColorTexture&&t.alphaDiscardMode!==A.sf.Opaque;switch(t.output){case i.V.Depth:(0,y.NB)(r,t),e.include(a.d,t),e.include(o.HQ,t),e.include(d.U,t),f&&c.uniforms.add(new v.N("tex",(e=>e.texture))),r.code.add(l.H`void main(void) {
vpos = getVertexInLocalOriginSpace();
vpos = subtractOrigin(vpos);
vpos = addVerticalOffset(vpos, localOrigin);
gl_Position = transformPosition(proj, view, vpos);
forwardTextureCoordinates();
}`),e.include(b.S,t),c.code.add(l.H`
          void main(void) {
            discardBySlice(vpos);
            ${f?l.H`
                    vec4 texColor = texture(tex, ${t.hasColorTextureTransform?l.H`colorUV`:l.H`vuv0`});
                    discardOrAdjustAlpha(texColor);`:""}
          }
        `);break;case i.V.Shadow:case i.V.ShadowHighlight:case i.V.ShadowExcludeHighlight:case i.V.ViewshedShadow:case i.V.ObjectAndLayerIdColor:(0,y.NB)(r,t),e.include(a.d,t),e.include(d.U,t),e.include(T.A,t),e.include(m,t),e.include(o.HQ,t),e.include(u,t),(0,n.xJ)(e),e.varyings.add("depth","float"),f&&c.uniforms.add(new v.N("tex",(e=>e.texture))),r.code.add(l.H`void main(void) {
vpos = getVertexInLocalOriginSpace();
vpos = subtractOrigin(vpos);
vpos = addVerticalOffset(vpos, localOrigin);
gl_Position = transformPositionWithDepth(proj, view, vpos, nearFar, depth);
forwardTextureCoordinates();
forwardObjectAndLayerIdColor();
}`),e.include(b.S,t),c.code.add(l.H`
          void main(void) {
            discardBySlice(vpos);
            ${f?l.H`
                    vec4 texColor = texture(tex, ${t.hasColorTextureTransform?l.H`colorUV`:l.H`vuv0`});
                    discardOrAdjustAlpha(texColor);`:""}
            ${t.output===i.V.ObjectAndLayerIdColor?l.H`outputObjectAndLayerIdColor();`:l.H`outputDepth(depth);`}
          }
        `);break;case i.V.Normal:{(0,y.NB)(r,t),e.include(a.d,t),e.include(s.Y,t),e.include(h.Mh,t),e.include(d.U,t),e.include(T.A,t),f&&c.uniforms.add(new v.N("tex",(e=>e.texture))),t.normalType===s.W.ScreenDerivative&&e.varyings.add("vPositionView","vec3");const n=t.normalType===s.W.Attribute||t.normalType===s.W.Compressed;r.code.add(l.H`
          void main(void) {
            vpos = getVertexInLocalOriginSpace();

            ${n?l.H`vNormalWorld = dpNormalView(vvLocalNormal(normalModel()));`:l.H`
                  // Get vertex position in camera space for screen-space derivative normals
                  vPositionView = (view * vec4(vpos, 1.0)).xyz;
                `}
            vpos = subtractOrigin(vpos);
            vpos = addVerticalOffset(vpos, localOrigin);
            gl_Position = transformPosition(proj, view, vpos);
            forwardTextureCoordinates();
          }
        `),e.include(o.HQ,t),e.include(b.S,t),c.code.add(l.H`
          void main() {
            discardBySlice(vpos);
            ${f?l.H`
                    vec4 texColor = texture(tex, ${t.hasColorTextureTransform?l.H`colorUV`:l.H`vuv0`});
                    discardOrAdjustAlpha(texColor);`:""}

            ${t.normalType===s.W.ScreenDerivative?l.H`vec3 normal = screenDerivativeNormal(vPositionView);`:l.H`
                  vec3 normal = normalize(vNormalWorld);
                  if (gl_FrontFacing == false){
                    normal = -normal;
                  }`}
            fragColor = vec4(0.5 + 0.5 * normal, 1.0);
          }
        `);break}case i.V.Highlight:(0,y.NB)(r,t),e.include(a.d,t),e.include(d.U,t),e.include(T.A,t),f&&c.uniforms.add(new v.N("tex",(e=>e.texture))),r.code.add(l.H`void main(void) {
vpos = getVertexInLocalOriginSpace();
vpos = subtractOrigin(vpos);
vpos = addVerticalOffset(vpos, localOrigin);
gl_Position = transformPosition(proj, view, vpos);
forwardTextureCoordinates();
}`),e.include(o.HQ,t),e.include(b.S,t),e.include(x,t),c.code.add(l.H`
          void main() {
            discardBySlice(vpos);
            ${f?l.H`
                    vec4 texColor = texture(tex, ${t.hasColorTextureTransform?l.H`colorUV`:l.H`vuv0`});
                    discardOrAdjustAlpha(texColor);`:""}
            outputHighlight();
          }
        `)}}},75930:function(e,t,r){r.d(t,{E:function(){return s}});var n=r(24667),i=r(3009),o=(r(33857),r(93348)),a=r(76527);function s(e){e.uniforms.add(new o.G("zProjectionMap",((e,t)=>l(t.camera)))),e.code.add(a.H`float linearizeDepth(float depth) {
float depthNdc = depth * 2.0 - 1.0;
float c1 = zProjectionMap[0];
float c2 = zProjectionMap[1];
return -(c1 / (depthNdc + c2 + 1e-7));
}`),e.code.add(a.H`float depthFromTexture(sampler2D depthTexture, vec2 uv) {
ivec2 iuv = ivec2(uv * vec2(textureSize(depthTexture, 0)));
float depth = texelFetch(depthTexture, iuv, 0).r;
return depth;
}`),e.code.add(a.H`float linearDepthFromTexture(sampler2D depthTexture, vec2 uv) {
return linearizeDepth(depthFromTexture(depthTexture, uv));
}`)}function l(e){const t=e.projectionMatrix;return(0,n.hZ)(c,t[14],t[10])}const c=(0,i.vt)()},5921:function(e,t,r){r.d(t,{W:function(){return p}});var n=r(36816),i=r(3009),o=r(66856),a=r(85012),s=r(67848),l=r(93348),c=r(76527),u=r(86754),d=r(62054),h=r(93687),f=r(86989),m=r(814);function p(e,t){const r=e.fragment;t.hasVertexTangents?(e.attributes.add(m.r.TANGENT,"vec4"),e.varyings.add("vTangent","vec4"),t.doubleSidedMode===s.W.WindingOrder?r.code.add(c.H`mat3 computeTangentSpace(vec3 normal) {
float tangentHeadedness = gl_FrontFacing ? vTangent.w : -vTangent.w;
vec3 tangent = normalize(gl_FrontFacing ? vTangent.xyz : -vTangent.xyz);
vec3 bitangent = cross(normal, tangent) * tangentHeadedness;
return mat3(tangent, bitangent, normal);
}`):r.code.add(c.H`mat3 computeTangentSpace(vec3 normal) {
float tangentHeadedness = vTangent.w;
vec3 tangent = normalize(vTangent.xyz);
vec3 bitangent = cross(normal, tangent) * tangentHeadedness;
return mat3(tangent, bitangent, normal);
}`)):r.code.add(c.H`mat3 computeTangentSpace(vec3 normal, vec3 pos, vec2 st) {
vec3 Q1 = dFdx(pos);
vec3 Q2 = dFdy(pos);
vec2 stx = dFdx(st);
vec2 sty = dFdy(st);
float det = stx.t * sty.s - sty.t * stx.s;
vec3 T = stx.t * Q2 - sty.t * Q1;
T = T - normal * dot(normal, T);
T *= inversesqrt(max(dot(T,T), 1.e-10));
vec3 B = sign(det) * cross(normal, T);
return mat3(T, B, normal);
}`),t.textureCoordinateType!==o.q.None&&(e.include(a.r,t),r.uniforms.add(t.pbrTextureBindType===f.c.Pass?new h.N("normalTexture",(e=>e.textureNormal)):new d.o("normalTexture",(e=>e.textureNormal))),t.hasNormalTextureTransform&&(r.uniforms.add(new l.G("scale",(e=>e.scale??i.Un))),r.uniforms.add(new u.k("normalTextureTransformMatrix",(e=>e.normalTextureTransformMatrix??n.zK)))),r.code.add(c.H`vec3 computeTextureNormal(mat3 tangentSpace, vec2 uv) {
vec3 rawNormal = textureLookup(normalTexture, uv).rgb * 2.0 - 1.0;`),t.hasNormalTextureTransform&&r.code.add(c.H`mat3 normalTextureRotation = mat3(normalTextureTransformMatrix[0][0]/scale[0], normalTextureTransformMatrix[0][1]/scale[1], 0.0,
normalTextureTransformMatrix[1][0]/scale[0], normalTextureTransformMatrix[1][1]/scale[1], 0.0,
0.0, 0.0, 0.0 );
rawNormal.xy = (normalTextureRotation * vec3(rawNormal.x, rawNormal.y, 1.0)).xy;`),r.code.add(c.H`return tangentSpace * rawNormal;
}`))}},78378:function(e,t,r){r.d(t,{n:function(){return U}});var n,i,o=r(76527),a=r(93687),s=(r(16573),r(78100),r(77936),r(37467),r(44732),r(79577),r(64979),r(40399)),l=r(27165),c=r(50942),u=r(78574),d=r(49409),h=r(36861),f=(r(9302),r(8660),r(95753),r(39834)),m=r(24667);!function(e){e[e.RED=0]="RED",e[e.RG=1]="RG",e[e.RGBA4=2]="RGBA4",e[e.RGBA=3]="RGBA",e[e.RGBA_MIPMAP=4]="RGBA_MIPMAP",e[e.R16F=5]="R16F",e[e.RGBA16F=6]="RGBA16F"}(n||(n={})),function(e){e[e.DEPTH_STENCIL_TEXTURE=0]="DEPTH_STENCIL_TEXTURE",e[e.DEPTH16_BUFFER=1]="DEPTH16_BUFFER"}(i||(i={}));var p=r(13592),v=r(18244),g=r(53338);let _=class extends p.A{constructor(e){super(e),this.view=null,this.consumes={required:[]},this.produces="composite-color",this._context=null,this._dirty=!0}initialize(){this.addHandles([(0,u.wB)((()=>this.view.ready),(e=>{e&&this.view._stage?.renderer.addRenderNode(this)}),u.Vh)])}destroy(){this.view._stage?.renderer?.removeRenderNode(this)}render(){throw new v.A("RenderNode:render-function-not-implemented","render() is not implemented.")}get camera(){return this.view.state.camera.clone()}get sunLight(){return this.bindParameters.lighting.legacy}get gl(){return this.view._stage.renderView.renderingContext.gl}acquireOutputFramebuffer(){const e=this._frameBuffer?.getTexture()?.descriptor,t=this.view._stage.renderer.fboCache.acquire(e?.width??640,e?.height??480,this.produces);return t.fbo?.initializeAndBind(),t}bindRenderTarget(){return this._frameBuffer?.fbo?.initializeAndBind(),this._frameBuffer}requestRender(e){e===g.C7.UPDATE&&this.view._stage?.renderView.requestRender(e),this._dirty=!0}resetWebGLState(){this.renderingContext.resetState(),this.renderingContext.bindFramebuffer(this._frameBuffer?.fbo)}get fboCache(){return this.view._stage.renderer.fboCache}get bindParameters(){return this._context.bindParameters}get renderingContext(){return this.view._stage.renderView.renderingContext}updateAnimation(){return!!this._dirty&&(this._dirty=!1,!0)}doRender(e,t){this._context=t,this._frameBuffer=e.find((({name:e})=>e===this.produces));try{return this.render(e)}finally{this._frameBuffer=null}}};(0,s._)([(0,h.MZ)({constructOnly:!0})],_.prototype,"view",void 0),(0,s._)([(0,h.MZ)({constructOnly:!0})],_.prototype,"consumes",void 0),(0,s._)([(0,h.MZ)()],_.prototype,"produces",void 0),_=(0,s._)([(0,f.$)("esri.views.3d.webgl.RenderNode")],_);const x=_,T=3e5,b=5e5;var y=r(27538),A=r(74525),E=r(12159),S=r(3984),w=r(70836),M=r(47362);class C extends A.w{initializeProgram(e){return new S.B(e.rctx,C.shader.get().build(),E.D)}initializePipeline(){return(0,M.Ey)({colorWrite:M.wE})}}C.shader=new y.$(w.S,(()=>r.e(810).then(r.bind(r,70810))));const O="eXKEvZaUc66cjIKElE1jlJ6MjJ6Ufkl+jn2fcXp5jBx7c6KEflSGiXuXeW6OWs+tfqZ2Yot2Y7Zzfo2BhniEj3xoiXuXj4eGZpqEaHKDWjSMe7palFlzc3BziYOGlFVzg6Zzg7CUY5JrjFF7eYJ4jIKEcyyEonSXe7qUfqZ7j3xofqZ2c4R5lFZ5Y0WUbppoe1l2cIh2ezyUho+BcHN2cG6DbpqJhqp2e1GcezhrdldzjFGUcyxjc3aRjDyEc1h7Sl17c6aMjH92pb6Mjpd4dnqBjMOEhqZleIOBYzB7gYx+fnqGjJuEkWlwnCx7fGl+c4hjfGyRe5qMlNOMfnqGhIWHc6OMi4GDc6aMfqZuc6aMzqJzlKZ+lJ6Me3qRfoFue0WUhoR5UraEa6qMkXiPjMOMlJOGe7JrUqKMjK6MeYRzdod+Sl17boiPc6qEeYBlcIh2c1WEe7GDiWCDa0WMjEmMdod+Y0WcdntzhmN8WjyMjKJjiXtzgYxYaGd+a89zlEV7e2GJfnd+lF1rcK5zc4p5cHuBhL6EcXp5eYB7fnh8iX6HjIKEeaxuiYOGc66RfG2Ja5hzjlGMjEmMe9OEgXuPfHyGhPeEdl6JY02McGuMfnqGhFiMa3WJfnx2l4hwcG1uhmN8c0WMc39og1GBbrCEjE2EZY+JcIh2cIuGhIWHe0mEhIVrc09+gY5+eYBlnCyMhGCDl3drfmmMgX15aGd+gYx+fnuRfnhzY1SMsluJfnd+hm98WtNrcIuGh4SEj0qPdkqOjFF7jNNjdnqBgaqUjMt7boeBhnZ4jDR7c5pze4GGjEFrhLqMjHyMc0mUhKZze4WEa117kWlwbpqJjHZ2eX2Bc09zeId+e0V7WlF7jHJ2l72BfId8l3eBgXyBe897jGl7c66cgW+Xc76EjKNbgaSEjGx4fId8jFFjgZB8cG6DhlFziZhrcIh2fH6HgUqBgXiPY8dahGFzjEmMhEFre2dxhoBzc5SGfleGe6alc7aUeYBlhKqUdlp+cH5za4OEczxza0Gcc4J2jHZ5iXuXjH2Jh5yRjH2JcFx+hImBjH+MpddCl3dreZeJjIt8ZW18bm1zjoSEeIOBlF9oh3N7hlqBY4+UeYFwhLJjeYFwaGd+gUqBYxiEYot2fqZ2ondzhL6EYyiEY02Ea0VjgZB8doaGjHxoc66cjEGEiXuXiXWMiZhreHx8frGMe75rY02Ec5pzfnhzlEp4a3VzjM+EhFFza3mUY7Zza1V5e2iMfGyRcziEhDyEkXZ2Y4OBnCx7g5t2eyBjgV6EhEFrcIh2dod+c4Z+nJ5zjm15jEmUeYxijJp7nL6clIpjhoR5WrZraGd+fnuRa6pzlIiMg6ZzfHx5foh+eX1ufnB5eX1ufnB5aJt7UqKMjIh+e3aBfm5lbYSBhGFze6J4c39oc0mUc4Z+e0V7fKFVe0WEdoaGY02Ec4Z+Y02EZYWBfH6HgU1+gY5+hIWUgW+XjJ57ebWRhFVScHuBfJ6PhBx7WqJzlM+Ujpd4gHZziX6HjHmEgZN+lJt5boiPe2GJgX+GjIGJgHZzeaxufnB5hF2JtdN7jJ57hp57hK6ElFVzg6ZzbmiEbndzhIWHe3uJfoFue3qRhJd2j3xoc65zlE1jc3p8lE1jhniEgXJ7e657vZaUc3qBh52BhIF4aHKDa9drgY5+c52GWqZzbpqJe8tjnM+UhIeMfo2BfGl+hG1zSmmMjKJjZVaGgX15c1lze0mEp4OHa3mUhIWHhDyclJ6MeYOJkXiPc0VzhFiMlKaEboSJa5Jze41re3qRhn+HZYWBe0mEc4p5fnORbox5lEp4hGFjhGGEjJuEc1WEhLZjeHeGa7KlfHx2hLaMeX1ugY5+hIWHhKGPjMN7c1WEho1zhoBzZYx7fnhzlJt5exyUhFFziXtzfmmMa6qMYyiEiXxweV12kZSMeWqXSl17fnhzxmmMrVGEe1mcc4p5eHeGjK6MgY5+doaGa6pzlGV7g1qBh4KHkXiPeW6OaKqafqZ2eXZ5e1V7jGd7boSJc3BzhJd2e0mcYot2h1RoY8dahK6EQmWEWjx7e1l2lL6UgXyBdnR4eU9zc0VreX1umqaBhld7fo2Bc6KEc5Z+hDyEcIeBWtNrfHyGe5qMhMuMe5qMhEGEbVVupcNzg3aHhIF4boeBe0mEdlptc39ofFl5Y8uUlJOGiYt2UmGEcyxjjGx4jFF7a657ZYWBnElzhp57iXtrgZN+tfOEhIOBjE2HgU1+e8tjjKNbiWCDhE15gUqBgYN7fnqGc66ce9d7iYSBj0qPcG6DnGGcT3eGa6qMZY+JlIiMl4hwc3aRdnqBlGV7eHJ2hLZjfnuRhDyEeX6MSk17g6Z+c6aUjHmEhIF4gXyBc76EZW18fGl+fkl+jCxrhoVwhDyUhIqGlL2DlI6EhJd2tdN7eYORhEGMa2Faa6pzc3Bzc4R5lIRznM+UY9eMhDycc5Z+c4p5c4iGY117pb6MgXuPrbJafnx2eYOJeXZ5e657hDyEcziElKZjfoB5eHeGj4WRhGGEe6KGeX1utTStc76EhFGJnCyMa5hzfH6HnNeceYB7hmN8gYuMhIVrczSMgYF8h3N7c5pza5hzjJqEYIRdgYuMlL2DeYRzhGGEeX1uhLaEc4iGeZ1zdl6JhrVteX6Me2iMfm5lWqJzSpqEa6pzdnmchHx2c6OMhNdrhoR5g3aHczxzeW52gV6Ejm15frGMc0Vzc4Z+l3drfniJe+9rWq5rlF1rhGGEhoVwe9OEfoh+e7pac09+c3qBY0lrhDycdnp2lJ6MiYOGhGCDc3aRlL2DlJt5doaGdnp2gYF8gWeOjF2Uc4R5c5Z+jEmMe7KEc4mEeYJ4dmyBe0mcgXiPbqJ7eYB7fmGGiYSJjICGlF1reZ2PnElzbpqJfH6Hc39oe4WEc5eJhK6EhqyJc3qBgZB8c09+hEmEaHKDhFGJc5SGiXWMUpaEa89zc6OMnCyMiXtrho+Be5qMc7KEjJ57dmN+hKGPjICGbmiEe7prdod+hGCDdnmchBx7eX6MkXZ2hGGEa657hm98jFFjY5JreYOJgY2EjHZ2a295Y3FajJ6Mc1J+YzB7e4WBjF2Uc4R5eV12gYxzg1qBeId+c9OUc5pzjFFjgY5+hFiMlIaPhoR5lIpjjIKBlNdSe7KEeX2BfrGMhIqGc65zjE2UhK6EklZ+QmWEeziMWqZza3VzdnR4foh+gYF8n3iJiZhrnKp7gYF8eId+lJ6Me1lrcIuGjKJjhmN8c66MjFF7a6prjJ6UnJ5zezyUfruRWlF7nI5zfHyGe657h4SEe8tjhBx7jFFjc09+c39ojICMeZeJeXt+YzRzjHZ2c0WEcIeBeXZ5onSXkVR+gYJ+eYFwdldzgYF7eX2BjJ6UiXuXlE1jh4SEe1mchLJjc4Z+hqZ7eXZ5bm1zlL6Ue5p7iWeGhKqUY5pzjKJjcIeBe8t7gXyBYIRdlEp4a3mGnK6EfmmMZpqEfFl5gYxzjKZuhGFjhoKGhHx2fnx2eXuMe3aBiWeGvbKMe6KGa5hzYzB7gZOBlGV7hmN8hqZlYot2Y117a6pzc6KEfId8foB5rctrfneJfJ6PcHN2hFiMc5pzjH92c0VzgY2EcElzdmCBlFVzg1GBc65zY4OBboeBcHiBeYJ4ewxzfHx5lIRzlEmEnLKEbk1zfJ6PhmN8eYBljBiEnMOEiXxwezyUcIeBe76EdsKEeX2BdnR4jGWUrXWMjGd7fkl+j4WRlEGMa5Jzho+BhDyEfnqMeXt+g3aHlE1jczClhNN7ZW18eHx8hGFjZW18iXWMjKJjhH57gYuMcIuGWjyMe4ZtjJuExmmMj4WRdntzi4GDhFFzYIRdnGGcjJp7Y0F7e4WEkbCGiX57fnSHa657a6prhBCMe3Z+SmmMjH92eHJ2hK6EY1FzexhrvbKMnI5za4OEfnd+eXuMhImBe897hLaMjN+EfG+BeIOBhF1+eZeJi4GDkXZ2eXKEgZ6Ejpd4c2GHa1V5e5KUfqZuhCx7jKp7lLZrg11+hHx2hFWUoot2nI5zgbh5mo9zvZaUe3qRbqKMfqZ2kbCGhFiM";var I=r(3009);class R extends o.Y{constructor(){super(...arguments),this.projScale=1}}class N extends R{constructor(){super(...arguments),this.intensity=1}}class P extends o.Y{}class L extends P{constructor(){super(...arguments),this.blurSize=(0,I.vt)()}}var H=r(37595);class D extends A.w{initializeProgram(e){return new S.B(e.rctx,D.shader.get().build(),E.D)}initializePipeline(){return(0,M.Ey)({colorWrite:M.wE})}}D.shader=new y.$(H.S,(()=>r.e(6217).then(r.bind(r,86217))));var B=r(79721),F=r(87501),z=r(54361);const V=2;let G=class extends x{constructor(e){super(e),this.consumes={required:["normals"]},this.produces="ssao",this.isEnabled=()=>!1,this._enableTime=(0,d.l5)(0),this._passParameters=new N,this._drawParameters=new L}initialize(){const e=Uint8Array.from(atob(O),(e=>e.charCodeAt(0))),t=new z.R;t.wrapMode=B.pF.CLAMP_TO_EDGE,t.pixelFormat=B.Ab.RGB,t.wrapMode=B.pF.REPEAT,t.hasMipmap=!0,t.width=32,t.height=32,this._passParameters.noiseTexture=new F.g(this.renderingContext,t,e),this._ssaoTechnique=this.techniques.acquire(D),this._blurTechnique=this.techniques.acquire(C),this.addHandles((0,u.wB)((()=>this.isEnabled()),(()=>this._enableTime=(0,d.l5)(0))))}destroy(){this._passParameters.noiseTexture=(0,c.WD)(this._passParameters.noiseTexture),this._blurTechnique.release(),this._ssaoTechnique.release()}render(e){const t=this.bindParameters,r=e.find((({name:e})=>"normals"===e)),i=r?.getTexture(),o=r?.getTexture(B.nI),a=this.fboCache,s=t.camera,c=s.fullViewport[2],u=s.fullViewport[3],h=Math.round(c/V),f=Math.round(u/V);if(!this._ssaoTechnique.compiled||!this._blurTechnique.compiled)return this._enableTime=(0,d.l5)(performance.now()),this.requestRender(),a.acquire(h,f,"ssao",n.RED);0===this._enableTime&&(this._enableTime=(0,d.l5)(performance.now()));const p=this.renderingContext,v=this.view.qualitySettings.fadeDuration,_=s.relativeElevation,x=(0,l.qE)((b-_)/(b-T),0,1),y=v>0?Math.min(v,performance.now()-this._enableTime)/v:1,A=y*x;this._passParameters.normalTexture=i,this._passParameters.depthTexture=o,this._passParameters.projScale=1/s.computeScreenPixelSizeAtDist(1),this._passParameters.intensity=4*W/(0,H.g)(s)**6*A;const E=a.acquire(c,u,"ssao input",n.RG);p.unbindTexture(E.fbo.colorTexture),p.bindFramebuffer(E.fbo),p.setViewport(0,0,c,u),p.bindTechnique(this._ssaoTechnique,t,this._passParameters,this._drawParameters),p.screen.draw();const S=a.acquire(h,f,"ssao blur",n.RED);p.unbindTexture(S.fbo.colorTexture),p.bindFramebuffer(S.fbo),this._drawParameters.colorTexture=E.getTexture(),(0,m.hZ)(this._drawParameters.blurSize,0,V/u),p.bindTechnique(this._blurTechnique,t,this._passParameters,this._drawParameters),p.setViewport(0,0,h,f),p.screen.draw(),E.release();const w=a.acquire(h,f,"ssao",n.RED);return p.unbindTexture(w.fbo.colorTexture),p.bindFramebuffer(w.fbo),p.setViewport(0,0,c,u),p.setClearColor(1,1,1,0),p.clear(B.hn.COLOR_BUFFER_BIT),this._drawParameters.colorTexture=S.getTexture(),(0,m.hZ)(this._drawParameters.blurSize,V/c,0),p.bindTechnique(this._blurTechnique,t,this._passParameters,this._drawParameters),p.setViewport(0,0,h,f),p.screen.draw(),p.setViewport4fv(s.fullViewport),S.release(),y<1&&this.requestRender(g.C7.UPDATE),w}};(0,s._)([(0,h.MZ)()],G.prototype,"consumes",void 0),(0,s._)([(0,h.MZ)()],G.prototype,"produces",void 0),(0,s._)([(0,h.MZ)({constructOnly:!0})],G.prototype,"techniques",void 0),(0,s._)([(0,h.MZ)({constructOnly:!0})],G.prototype,"isEnabled",void 0),G=(0,s._)([(0,f.$)("esri.views.3d.webgl-engine.effects.ssao.SSAO")],G);const W=.5;function U(e,t){const r=e.fragment;t.receiveAmbientOcclusion?(r.uniforms.add(new a.N("ssaoTex",((e,t)=>t.ssao?.getTexture()))),r.constants.add("blurSizePixelsInverse","float",1/V),r.code.add(o.H`float evaluateAmbientOcclusionInverse() {
vec2 ssaoTextureSizeInverse = 1.0 / vec2(textureSize(ssaoTex, 0));
return texture(ssaoTex, gl_FragCoord.xy * blurSizePixelsInverse * ssaoTextureSizeInverse).r;
}
float evaluateAmbientOcclusion() {
return 1.0 - evaluateAmbientOcclusionInverse();
}`)):r.code.add(o.H`float evaluateAmbientOcclusionInverse() { return 1.0; }
float evaluateAmbientOcclusion() { return 0.0; }`)}},16054:function(e,t,r){r.d(t,{kA:function(){return w},a8:function(){return E},eU:function(){return S}});var n=r(92268),i=r(3568),o=r(74344),a=r(88031),s=r(43911),l=r(12391),c=r(4357),u=r(43494),d=r(76527);function h(e,t){const r=e.fragment,n=void 0!==t.lightingSphericalHarmonicsOrder?t.lightingSphericalHarmonicsOrder:2;0===n?(r.uniforms.add(new c.t("lightingAmbientSH0",((e,t)=>(0,i.s)(f,t.lighting.sh.r[0],t.lighting.sh.g[0],t.lighting.sh.b[0])))),r.code.add(d.H`vec3 calculateAmbientIrradiance(vec3 normal, float ambientOcclusion) {
vec3 ambientLight = 0.282095 * lightingAmbientSH0;
return ambientLight * (1.0 - ambientOcclusion);
}`)):1===n?(r.uniforms.add(new u.E("lightingAmbientSH_R",((e,t)=>(0,a.s)(m,t.lighting.sh.r[0],t.lighting.sh.r[1],t.lighting.sh.r[2],t.lighting.sh.r[3]))),new u.E("lightingAmbientSH_G",((e,t)=>(0,a.s)(m,t.lighting.sh.g[0],t.lighting.sh.g[1],t.lighting.sh.g[2],t.lighting.sh.g[3]))),new u.E("lightingAmbientSH_B",((e,t)=>(0,a.s)(m,t.lighting.sh.b[0],t.lighting.sh.b[1],t.lighting.sh.b[2],t.lighting.sh.b[3])))),r.code.add(d.H`vec3 calculateAmbientIrradiance(vec3 normal, float ambientOcclusion) {
vec4 sh0 = vec4(
0.282095,
0.488603 * normal.x,
0.488603 * normal.z,
0.488603 * normal.y
);
vec3 ambientLight = vec3(
dot(lightingAmbientSH_R, sh0),
dot(lightingAmbientSH_G, sh0),
dot(lightingAmbientSH_B, sh0)
);
return ambientLight * (1.0 - ambientOcclusion);
}`)):2===n&&(r.uniforms.add(new c.t("lightingAmbientSH0",((e,t)=>(0,i.s)(f,t.lighting.sh.r[0],t.lighting.sh.g[0],t.lighting.sh.b[0]))),new u.E("lightingAmbientSH_R1",((e,t)=>(0,a.s)(m,t.lighting.sh.r[1],t.lighting.sh.r[2],t.lighting.sh.r[3],t.lighting.sh.r[4]))),new u.E("lightingAmbientSH_G1",((e,t)=>(0,a.s)(m,t.lighting.sh.g[1],t.lighting.sh.g[2],t.lighting.sh.g[3],t.lighting.sh.g[4]))),new u.E("lightingAmbientSH_B1",((e,t)=>(0,a.s)(m,t.lighting.sh.b[1],t.lighting.sh.b[2],t.lighting.sh.b[3],t.lighting.sh.b[4]))),new u.E("lightingAmbientSH_R2",((e,t)=>(0,a.s)(m,t.lighting.sh.r[5],t.lighting.sh.r[6],t.lighting.sh.r[7],t.lighting.sh.r[8]))),new u.E("lightingAmbientSH_G2",((e,t)=>(0,a.s)(m,t.lighting.sh.g[5],t.lighting.sh.g[6],t.lighting.sh.g[7],t.lighting.sh.g[8]))),new u.E("lightingAmbientSH_B2",((e,t)=>(0,a.s)(m,t.lighting.sh.b[5],t.lighting.sh.b[6],t.lighting.sh.b[7],t.lighting.sh.b[8])))),r.code.add(d.H`vec3 calculateAmbientIrradiance(vec3 normal, float ambientOcclusion) {
vec3 ambientLight = 0.282095 * lightingAmbientSH0;
vec4 sh1 = vec4(
0.488603 * normal.x,
0.488603 * normal.z,
0.488603 * normal.y,
1.092548 * normal.x * normal.y
);
vec4 sh2 = vec4(
1.092548 * normal.y * normal.z,
0.315392 * (3.0 * normal.z * normal.z - 1.0),
1.092548 * normal.x * normal.z,
0.546274 * (normal.x * normal.x - normal.y * normal.y)
);
ambientLight += vec3(
dot(lightingAmbientSH_R1, sh1),
dot(lightingAmbientSH_G1, sh1),
dot(lightingAmbientSH_B1, sh1)
);
ambientLight += vec3(
dot(lightingAmbientSH_R2, sh2),
dot(lightingAmbientSH_G2, sh2),
dot(lightingAmbientSH_B2, sh2)
);
return ambientLight * (1.0 - ambientOcclusion);
}`),t.pbrMode!==l.A9.Normal&&t.pbrMode!==l.A9.Schematic||r.code.add(d.H`const vec3 skyTransmittance = vec3(0.9, 0.9, 1.0);
vec3 calculateAmbientRadiance(float ambientOcclusion)
{
vec3 ambientLight = 1.2 * (0.282095 * lightingAmbientSH0) - 0.2;
return ambientLight *= (1.0 - ambientOcclusion) * skyTransmittance;
}`))}const f=(0,o.vt)(),m=(0,s.vt)();var p=r(78378),v=r(11565),g=r(45018),_=r(40332),x=r(49071),T=r(86989);class b extends x.n{constructor(e,t){super(e,"bool",T.c.Pass,((r,n,i)=>r.setUniform1b(e,t(n,i))))}}var y=r(7606);r(27165);r(44114);(0,o.vt)();const A=.4;(0,o.vt)();function E(e){e.constants.add("ambientBoostFactor","float",A)}function S(e){e.uniforms.add(new y.m("lightingGlobalFactor",((e,t)=>t.lighting.globalFactor)))}function w(e,t){const r=e.fragment;switch(e.include(p.n,t),t.pbrMode!==l.A9.Disabled&&e.include(g.c,t),e.include(h,t),e.include(_.p),r.code.add(d.H`
    const float GAMMA_SRGB = 2.1;
    const float INV_GAMMA_SRGB = 0.4761904;
    ${t.pbrMode===l.A9.Disabled?"":"const vec3 GROUND_REFLECTANCE = vec3(0.2);"}
  `),E(r),S(r),(0,v.Gc)(r),r.code.add(d.H`
    float additionalDirectedAmbientLight(vec3 vPosWorld) {
      float vndl = dot(${t.spherical?d.H`normalize(vPosWorld)`:d.H`vec3(0.0, 0.0, 1.0)`}, mainLightDirection);
      return smoothstep(0.0, 1.0, clamp(vndl * 2.5, 0.0, 1.0));
    }
  `),(0,v.O4)(r),r.code.add(d.H`vec3 evaluateAdditionalLighting(float ambientOcclusion, vec3 vPosWorld) {
float additionalAmbientScale = additionalDirectedAmbientLight(vPosWorld);
return (1.0 - ambientOcclusion) * additionalAmbientScale * ambientBoostFactor * lightingGlobalFactor * mainLightIntensity;
}`),t.pbrMode){case l.A9.Disabled:case l.A9.WaterOnIntegratedMesh:case l.A9.Water:e.include(v.qU),r.code.add(d.H`vec3 evaluateSceneLighting(vec3 normalWorld, vec3 albedo, float shadow, float ssao, vec3 additionalLight)
{
vec3 mainLighting = evaluateMainLighting(normalWorld, shadow);
vec3 ambientLighting = calculateAmbientIrradiance(normalWorld, ssao);
vec3 albedoLinear = pow(albedo, vec3(GAMMA_SRGB));
vec3 totalLight = mainLighting + ambientLighting + additionalLight;
totalLight = min(totalLight, vec3(PI));
vec3 outColor = vec3((albedoLinear / PI) * totalLight);
return pow(outColor, vec3(INV_GAMMA_SRGB));
}`);break;case l.A9.Normal:case l.A9.Schematic:r.code.add(d.H`const float fillLightIntensity = 0.25;
const float horizonLightDiffusion = 0.4;
const float additionalAmbientIrradianceFactor = 0.02;
vec3 evaluateSceneLightingPBR(vec3 normal, vec3 albedo, float shadow, float ssao, vec3 additionalLight, vec3 viewDir, vec3 normalGround, vec3 mrr, vec3 _emission, float additionalAmbientIrradiance)
{
vec3 viewDirection = -viewDir;
vec3 h = normalize(viewDirection + mainLightDirection);
PBRShadingInfo inputs;
inputs.NdotL = clamp(dot(normal, mainLightDirection), 0.001, 1.0);
inputs.NdotV = clamp(abs(dot(normal, viewDirection)), 0.001, 1.0);
inputs.NdotH = clamp(dot(normal, h), 0.0, 1.0);
inputs.VdotH = clamp(dot(viewDirection, h), 0.0, 1.0);
inputs.NdotNG = clamp(dot(normal, normalGround), -1.0, 1.0);
vec3 reflectedView = normalize(reflect(viewDirection, normal));
inputs.RdotNG = clamp(dot(reflectedView, normalGround), -1.0, 1.0);
inputs.albedoLinear = pow(albedo, vec3(GAMMA_SRGB));
inputs.ssao = ssao;
inputs.metalness = mrr[0];
inputs.roughness = clamp(mrr[1] * mrr[1], 0.001, 0.99);`),r.code.add(d.H`inputs.f0 = (0.16 * mrr[2] * mrr[2]) * (1.0 - inputs.metalness) + inputs.albedoLinear * inputs.metalness;
inputs.f90 = vec3(clamp(dot(inputs.f0, vec3(50.0 * 0.33)), 0.0, 1.0));
inputs.diffuseColor = inputs.albedoLinear * (vec3(1.0) - inputs.f0) * (1.0 - inputs.metalness);`),t.useFillLights?r.uniforms.add(new b("hasFillLights",((e,t)=>t.enableFillLights))):r.constants.add("hasFillLights","bool",!1),r.code.add(d.H`vec3 ambientDir = vec3(5.0 * normalGround[1] - normalGround[0] * normalGround[2], - 5.0 * normalGround[0] - normalGround[2] * normalGround[1], normalGround[1] * normalGround[1] + normalGround[0] * normalGround[0]);
ambientDir = ambientDir != vec3(0.0) ? normalize(ambientDir) : normalize(vec3(5.0, -1.0, 0.0));
inputs.NdotAmbDir = hasFillLights ? abs(dot(normal, ambientDir)) : 1.0;
vec3 mainLightIrradianceComponent = inputs.NdotL * (1.0 - shadow) * mainLightIntensity;
vec3 fillLightsIrradianceComponent = inputs.NdotAmbDir * mainLightIntensity * fillLightIntensity;
vec3 ambientLightIrradianceComponent = calculateAmbientIrradiance(normal, ssao) + additionalLight;
inputs.skyIrradianceToSurface = ambientLightIrradianceComponent + mainLightIrradianceComponent + fillLightsIrradianceComponent ;
inputs.groundIrradianceToSurface = GROUND_REFLECTANCE * ambientLightIrradianceComponent + mainLightIrradianceComponent + fillLightsIrradianceComponent ;`),r.uniforms.add(new y.m("lightingSpecularStrength",((e,t)=>t.lighting.mainLight.specularStrength)),new y.m("lightingEnvironmentStrength",((e,t)=>t.lighting.mainLight.environmentStrength))),r.code.add(d.H`vec3 horizonRingDir = inputs.RdotNG * normalGround - reflectedView;
vec3 horizonRingH = normalize(viewDirection + horizonRingDir);
inputs.NdotH_Horizon = dot(normal, horizonRingH);
vec3 mainLightRadianceComponent = lightingSpecularStrength * normalDistribution(inputs.NdotH, inputs.roughness) * mainLightIntensity * (1.0 - shadow);
vec3 horizonLightRadianceComponent = lightingEnvironmentStrength * normalDistribution(inputs.NdotH_Horizon, min(inputs.roughness + horizonLightDiffusion, 1.0)) * mainLightIntensity * fillLightIntensity;
vec3 ambientLightRadianceComponent = lightingEnvironmentStrength * calculateAmbientRadiance(ssao) + additionalLight;
float normalDirectionModifier = mix(1., min(mix(0.1, 2.0, (inputs.NdotNG + 1.) * 0.5), 1.0), clamp(inputs.roughness * 5.0, 0.0 , 1.0));
inputs.skyRadianceToSurface = (ambientLightRadianceComponent + horizonLightRadianceComponent) * normalDirectionModifier + mainLightRadianceComponent;
inputs.groundRadianceToSurface = 0.5 * GROUND_REFLECTANCE * (ambientLightRadianceComponent + horizonLightRadianceComponent) * normalDirectionModifier + mainLightRadianceComponent;
inputs.averageAmbientRadiance = ambientLightIrradianceComponent[1] * (1.0 + GROUND_REFLECTANCE[1]);`),r.code.add(d.H`
        vec3 reflectedColorComponent = evaluateEnvironmentIllumination(inputs);
        vec3 additionalMaterialReflectanceComponent = inputs.albedoLinear * additionalAmbientIrradiance;
        vec3 emissionComponent = _emission == vec3(0.0) ? _emission : pow(_emission, vec3(GAMMA_SRGB));
        vec3 outColorLinear = reflectedColorComponent + additionalMaterialReflectanceComponent + emissionComponent;
        ${t.pbrMode!==l.A9.Schematic||t.hasColorTexture?d.H`vec3 outColor = pow(blackLevelSoftCompression(outColorLinear, inputs), vec3(INV_GAMMA_SRGB));`:d.H`vec3 outColor = pow(max(vec3(0.0), outColorLinear - 0.005 * inputs.averageAmbientRadiance), vec3(INV_GAMMA_SRGB));`}
        return outColor;
      }
    `);break;case l.A9.Simplified:case l.A9.TerrainWithWater:e.include(v.qU),r.code.add(d.H`const float roughnessTerrain = 0.5;
const float specularityTerrain = 0.5;
const vec3 fresnelReflectionTerrain = vec3(0.04);
vec3 evaluatePBRSimplifiedLighting(vec3 n, vec3 c, float shadow, float ssao, vec3 al, vec3 vd, vec3 nup) {
vec3 viewDirection = -vd;
vec3 h = normalize(viewDirection + mainLightDirection);
float NdotL = clamp(dot(n, mainLightDirection), 0.001, 1.0);
float NdotV = clamp(abs(dot(n, viewDirection)), 0.001, 1.0);
float NdotH = clamp(dot(n, h), 0.0, 1.0);
float NdotNG = clamp(dot(n, nup), -1.0, 1.0);
vec3 albedoLinear = pow(c, vec3(GAMMA_SRGB));
float lightness = 0.3 * albedoLinear[0] + 0.5 * albedoLinear[1] + 0.2 * albedoLinear[2];
vec3 f0 = (0.85 * lightness + 0.15) * fresnelReflectionTerrain;
vec3 f90 =  vec3(clamp(dot(f0, vec3(50.0 * 0.33)), 0.0, 1.0));
vec3 mainLightIrradianceComponent = (1. - shadow) * NdotL * mainLightIntensity;
vec3 ambientLightIrradianceComponent = calculateAmbientIrradiance(n, ssao) + al;
vec3 ambientSky = ambientLightIrradianceComponent + mainLightIrradianceComponent;
vec3 indirectDiffuse = ((1.0 - NdotNG) * mainLightIrradianceComponent + (1.0 + NdotNG ) * ambientSky) * 0.5;
vec3 outDiffColor = albedoLinear * (1.0 - f0) * indirectDiffuse / PI;
vec3 mainLightRadianceComponent = normalDistribution(NdotH, roughnessTerrain) * mainLightIntensity;
vec2 dfg = prefilteredDFGAnalytical(roughnessTerrain, NdotV);
vec3 specularColor = f0 * dfg.x + f90 * dfg.y;
vec3 specularComponent = specularityTerrain * specularColor * mainLightRadianceComponent;
vec3 outColorLinear = outDiffColor + specularComponent;
vec3 outColor = pow(outColorLinear, vec3(INV_GAMMA_SRGB));
return outColor;
}`);break;default:(0,n.Xb)(t.pbrMode);case l.A9.COUNT:}}},11565:function(e,t,r){r.d(t,{Gc:function(){return o},O4:function(){return a},qU:function(){return s}});var n=r(4357),i=r(76527);function o(e){e.uniforms.add(new n.t("mainLightDirection",((e,t)=>t.lighting.mainLight.direction)))}function a(e){e.uniforms.add(new n.t("mainLightIntensity",((e,t)=>t.lighting.mainLight.intensity)))}function s(e){o(e.fragment),a(e.fragment),e.fragment.code.add(i.H`vec3 evaluateMainLighting(vec3 normal_global, float shadowing) {
float dotVal = clamp(dot(normal_global, mainLightDirection), 0.0, 1.0);
return mainLightIntensity * ((1.0 - shadowing) * dotVal);
}`)}},43297:function(e,t,r){r.d(t,{Q:function(){return a}});var n=r(75930),i=r(76527),o=r(93687);function a(e,t){if(!t.multipassEnabled)return;e.fragment.include(n.E),e.fragment.uniforms.add(new o.N("terrainDepthTexture",((e,t)=>t.multipassTerrain.depth?.attachment)));const r=t.occlusionPass;e.fragment.code.add(i.H`
   ${r?"bool":"void"} terrainDepthTest(float fragmentDepth) {
      float depth = texelFetch(terrainDepthTexture, ivec2(gl_FragCoord.xy), 0).r;
      float linearDepth = linearizeDepth(depth);
      ${r?i.H`return fragmentDepth < linearDepth && depth < 1.0;`:i.H`
          if(fragmentDepth ${t.cullAboveGround?">":"<="} linearDepth){
            discard;
          }`}
    }`)}},67848:function(e,t,r){r.d(t,{W:function(){return n},r:function(){return a}});var n,i=r(92268),o=r(76527);function a(e,t){const r=e.fragment;switch(r.code.add(o.H`struct ShadingNormalParameters {
vec3 normalView;
vec3 viewDirection;
} shadingParams;`),t.doubleSidedMode){case n.None:r.code.add(o.H`vec3 shadingNormal(ShadingNormalParameters params) {
return normalize(params.normalView);
}`);break;case n.View:r.code.add(o.H`vec3 shadingNormal(ShadingNormalParameters params) {
return dot(params.normalView, params.viewDirection) > 0.0 ? normalize(-params.normalView) : normalize(params.normalView);
}`);break;case n.WindingOrder:r.code.add(o.H`vec3 shadingNormal(ShadingNormalParameters params) {
return gl_FrontFacing ? normalize(params.normalView) : normalize(-params.normalView);
}`);break;default:(0,i.Xb)(t.doubleSidedMode);case n.COUNT:}}!function(e){e[e.None=0]="None",e[e.View=1]="View",e[e.WindingOrder=2]="WindingOrder",e[e.COUNT=3]="COUNT"}(n||(n={}))},45018:function(e,t,r){r.d(t,{c:function(){return s}});var n=r(76527);function i(e){const t=e.fragment.code;t.add(n.H`vec3 evaluateDiffuseIlluminationHemisphere(vec3 ambientGround, vec3 ambientSky, float NdotNG)
{
return ((1.0 - NdotNG) * ambientGround + (1.0 + NdotNG) * ambientSky) * 0.5;
}`),t.add(n.H`float integratedRadiance(float cosTheta2, float roughness)
{
return (cosTheta2 - 1.0) / (cosTheta2 * (1.0 - roughness * roughness) - 1.0);
}`),t.add(n.H`vec3 evaluateSpecularIlluminationHemisphere(vec3 ambientGround, vec3 ambientSky, float RdotNG, float roughness)
{
float cosTheta2 = 1.0 - RdotNG * RdotNG;
float intRadTheta = integratedRadiance(cosTheta2, roughness);
float ground = RdotNG < 0.0 ? 1.0 - intRadTheta : 1.0 + intRadTheta;
float sky = 2.0 - ground;
return (ground * ambientGround + sky * ambientSky) * 0.5;
}`)}var o=r(12391),a=r(40332);function s(e,t){const r=e.fragment.code;e.include(a.p),t.pbrMode!==o.A9.Normal&&t.pbrMode!==o.A9.Schematic&&t.pbrMode!==o.A9.Simplified&&t.pbrMode!==o.A9.TerrainWithWater||(r.add(n.H`float normalDistribution(float NdotH, float roughness)
{
float a = NdotH * roughness;
float b = roughness / (1.0 - NdotH * NdotH + a * a);
return b * b * INV_PI;
}`),r.add(n.H`const vec4 c0 = vec4(-1.0, -0.0275, -0.572,  0.022);
const vec4 c1 = vec4( 1.0,  0.0425,  1.040, -0.040);
const vec2 c2 = vec2(-1.04, 1.04);
vec2 prefilteredDFGAnalytical(float roughness, float NdotV) {
vec4 r = roughness * c0 + c1;
float a004 = min(r.x * r.x, exp2(-9.28 * NdotV)) * r.x + r.y;
return c2 * a004 + r.zw;
}`)),t.pbrMode!==o.A9.Normal&&t.pbrMode!==o.A9.Schematic||(e.include(i),r.add(n.H`struct PBRShadingInfo
{
float NdotL;
float NdotV;
float NdotH;
float VdotH;
float LdotH;
float NdotNG;
float RdotNG;
float NdotAmbDir;
float NdotH_Horizon;
vec3 skyRadianceToSurface;
vec3 groundRadianceToSurface;
vec3 skyIrradianceToSurface;
vec3 groundIrradianceToSurface;
float averageAmbientRadiance;
float ssao;
vec3 albedoLinear;
vec3 f0;
vec3 f90;
vec3 diffuseColor;
float metalness;
float roughness;
};`),r.add(n.H`vec3 evaluateEnvironmentIllumination(PBRShadingInfo inputs) {
vec3 indirectDiffuse = evaluateDiffuseIlluminationHemisphere(inputs.groundIrradianceToSurface, inputs.skyIrradianceToSurface, inputs.NdotNG);
vec3 indirectSpecular = evaluateSpecularIlluminationHemisphere(inputs.groundRadianceToSurface, inputs.skyRadianceToSurface, inputs.RdotNG, inputs.roughness);
vec3 diffuseComponent = inputs.diffuseColor * indirectDiffuse * INV_PI;
vec2 dfg = prefilteredDFGAnalytical(inputs.roughness, inputs.NdotV);
vec3 specularColor = inputs.f0 * dfg.x + inputs.f90 * dfg.y;
vec3 specularComponent = specularColor * indirectSpecular;
return (diffuseComponent + specularComponent);
}`),r.add(n.H`float gamutMapChanel(float x, vec2 p){
return (x < p.x) ? mix(0.0, p.y, x/p.x) : mix(p.y, 1.0, (x - p.x) / (1.0 - p.x) );
}`),r.add(n.H`vec3 blackLevelSoftCompression(vec3 inColor, PBRShadingInfo inputs){
vec3 outColor;
vec2 p = vec2(0.02 * (inputs.averageAmbientRadiance), 0.0075 * (inputs.averageAmbientRadiance));
outColor.x = gamutMapChanel(inColor.x, p) ;
outColor.y = gamutMapChanel(inColor.y, p) ;
outColor.z = gamutMapChanel(inColor.z, p) ;
return outColor;
}`))}},12391:function(e,t,r){r.d(t,{A9:function(){return n},_Z:function(){return d}});var n,i=r(85012),o=r(19404),a=r(4357),s=r(76527),l=r(62054),c=r(93687),u=r(86989);r(7869);!function(e){e[e.Disabled=0]="Disabled",e[e.Normal=1]="Normal",e[e.Schematic=2]="Schematic",e[e.Water=3]="Water",e[e.WaterOnIntegratedMesh=4]="WaterOnIntegratedMesh",e[e.Simplified=5]="Simplified",e[e.TerrainWithWater=6]="TerrainWithWater",e[e.COUNT=7]="COUNT"}(n||(n={}));function d(e,t){const r=e.fragment,d=t.hasMetallicRoughnessTexture||t.hasEmissionTexture||t.hasOcclusionTexture;if(t.pbrMode===n.Normal&&d&&e.include(i.r,t),t.pbrMode!==n.Schematic)if(t.pbrMode!==n.Disabled){if(t.pbrMode===n.Normal){r.code.add(s.H`vec3 mrr;
vec3 emission;
float occlusion;`);const e=t.pbrTextureBindType;t.hasMetallicRoughnessTexture&&(r.uniforms.add(e===u.c.Pass?new c.N("texMetallicRoughness",(e=>e.textureMetallicRoughness)):new l.o("texMetallicRoughness",(e=>e.textureMetallicRoughness))),r.code.add(s.H`void applyMetallnessAndRoughness(vec2 uv) {
vec3 metallicRoughness = textureLookup(texMetallicRoughness, uv).rgb;
mrr[0] *= metallicRoughness.b;
mrr[1] *= metallicRoughness.g;
}`)),t.hasEmissionTexture&&(r.uniforms.add(e===u.c.Pass?new c.N("texEmission",(e=>e.textureEmissive)):new l.o("texEmission",(e=>e.textureEmissive))),r.code.add(s.H`void applyEmission(vec2 uv) {
emission *= textureLookup(texEmission, uv).rgb;
}`)),t.hasOcclusionTexture?(r.uniforms.add(e===u.c.Pass?new c.N("texOcclusion",(e=>e.textureOcclusion)):new l.o("texOcclusion",(e=>e.textureOcclusion))),r.code.add(s.H`void applyOcclusion(vec2 uv) {
occlusion *= textureLookup(texOcclusion, uv).r;
}
float getBakedOcclusion() {
return occlusion;
}`)):r.code.add(s.H`float getBakedOcclusion() { return 1.0; }`),e===u.c.Pass?r.uniforms.add(new a.t("emissionFactor",(e=>e.emissiveFactor)),new a.t("mrrFactors",(e=>e.mrrFactors))):r.uniforms.add(new o.W("emissionFactor",(e=>e.emissiveFactor)),new o.W("mrrFactors",(e=>e.mrrFactors))),r.code.add(s.H`
    void applyPBRFactors() {
      mrr = mrrFactors;
      emission = emissionFactor;
      occlusion = 1.0;

      ${t.hasMetallicRoughnessTexture?s.H`applyMetallnessAndRoughness(${t.hasMetallicRoughnessTextureTransform?s.H`metallicRoughnessUV`:"vuv0"});`:""}

      ${t.hasEmissionTexture?s.H`applyEmission(${t.hasEmissiveTextureTransform?s.H`emissiveUV`:"vuv0"});`:""}

      ${t.hasOcclusionTexture?s.H`applyOcclusion(${t.hasOcclusionTextureTransform?s.H`occlusionUV`:"vuv0"});`:""}
    }
  `)}}else r.code.add(s.H`float getBakedOcclusion() { return 1.0; }`);else r.code.add(s.H`vec3 mrr = vec3(0.0, 0.6, 0.2);
vec3 emission = vec3(0.0);
float occlusion = 1.0;
void applyPBRFactors() {}
float getBakedOcclusion() { return 1.0; }`)}},40332:function(e,t,r){r.d(t,{p:function(){return i}});var n=r(76527);function i(e){e.vertex.code.add(n.H`const float PI = 3.141592653589793;`),e.fragment.code.add(n.H`const float PI = 3.141592653589793;
const float LIGHT_NORMALIZATION = 1.0 / PI;
const float INV_PI = 0.3183098861837907;
const float HALF_PI = 1.570796326794897;`)}},30341:function(e,t,r){r.d(t,{Bz:function(){return f},G:function(){return h}});r(17455),r(74344);var n=r(67500),i=r(43494),o=r(56126),a=r(76527),s=r(49071),l=r(86989);class c extends s.n{constructor(e,t,r){super(e,"mat4",l.c.Draw,((r,n,i,o)=>r.setUniformMatrix4fv(e,t(n,i,o))),r)}}class u extends s.n{constructor(e,t,r){super(e,"mat4",l.c.Pass,((r,n,i)=>r.setUniformMatrix4fv(e,t(n,i))),r)}}var d=r(93687);a.Y;a.Y;function h(e,t){t.receiveShadows&&(e.fragment.uniforms.add(new u("shadowMapMatrix",((e,t)=>t.shadowMap.getShadowMapMatrices(e.origin)),4)),m(e))}function f(e,t){t.receiveShadows&&(e.fragment.uniforms.add(new c("shadowMapMatrix",((e,t)=>t.shadowMap.getShadowMapMatrices(e.origin)),4)),m(e))}function m(e){const t=e.fragment;t.include(n.U),t.uniforms.add(new d.N("shadowMap",((e,t)=>t.shadowMap.depthTexture)),new o.c("numCascades",((e,t)=>t.shadowMap.numCascades)),new i.E("cascadeDistances",((e,t)=>t.shadowMap.cascadeDistances))),t.code.add(a.H`int chooseCascade(float depth, out mat4 mat) {
vec4 distance = cascadeDistances;
int i = depth < distance[1] ? 0 : depth < distance[2] ? 1 : depth < distance[3] ? 2 : 3;
mat = i == 0 ? shadowMapMatrix[0] : i == 1 ? shadowMapMatrix[1] : i == 2 ? shadowMapMatrix[2] : shadowMapMatrix[3];
return i;
}
vec3 lightSpacePosition(vec3 _vpos, mat4 mat) {
vec4 lv = mat * vec4(_vpos, 1.0);
lv.xy /= lv.w;
return 0.5 * lv.xyz + vec3(0.5);
}
vec2 cascadeCoordinates(int i, ivec2 textureSize, vec3 lvpos) {
float xScale = float(textureSize.y) / float(textureSize.x);
return vec2((float(i) + lvpos.x) * xScale, lvpos.y);
}
float readShadowMapDepth(ivec2 uv, sampler2D _depthTex) {
return rgba4ToFloat(texelFetch(_depthTex, uv, 0));
}
float posIsInShadow(ivec2 uv, vec3 lvpos, sampler2D _depthTex) {
return readShadowMapDepth(uv, _depthTex) < lvpos.z ? 1.0 : 0.0;
}
float filterShadow(vec2 uv, vec3 lvpos, ivec2 texSize, sampler2D _depthTex) {
vec2 st = fract(uv * vec2(texSize) + vec2(0.5));
ivec2 base = ivec2(uv * vec2(texSize) - vec2(0.5));
float s00 = posIsInShadow(ivec2(base.x, base.y), lvpos, _depthTex);
float s10 = posIsInShadow(ivec2(base.x + 1, base.y), lvpos, _depthTex);
float s11 = posIsInShadow(ivec2(base.x + 1, base.y + 1), lvpos, _depthTex);
float s01 = posIsInShadow(ivec2(base.x, base.y + 1), lvpos, _depthTex);
return mix(mix(s00, s10, st.x), mix(s01, s11, st.x), st.y);
}
float readShadowMap(const in vec3 _vpos, float _linearDepth) {
mat4 mat;
int i = chooseCascade(_linearDepth, mat);
if (i >= numCascades) { return 0.0; }
vec3 lvpos = lightSpacePosition(_vpos, mat);
if (lvpos.z >= 1.0 || lvpos.x < 0.0 || lvpos.x > 1.0 || lvpos.y < 0.0 || lvpos.y > 1.0) { return 0.0; }
ivec2 size = textureSize(shadowMap, 0);
vec2 uv = cascadeCoordinates(i, size, lvpos);
return filterShadow(uv, lvpos, size, shadowMap);
}`)}},36664:function(e,t,r){r.d(t,{MU:function(){return c},O1:function(){return u},QM:function(){return d},Sx:function(){return l},q2:function(){return s}});var n=r(36816),i=r(66856),o=r(76527),a=r(86754);function s(e,t){t.hasColorTextureTransform?(e.vertex.uniforms.add(new a.k("colorTextureTransformMatrix",(e=>e.colorTextureTransformMatrix??n.zK))),e.varyings.add("colorUV","vec2"),e.vertex.code.add(o.H`void forwardColorUV(){
colorUV = (colorTextureTransformMatrix * vec3(vuv0, 1.0)).xy;
}`)):e.vertex.code.add(o.H`void forwardColorUV(){}`)}function l(e,t){t.hasNormalTextureTransform&&t.textureCoordinateType!==i.q.None?(e.vertex.uniforms.add(new a.k("normalTextureTransformMatrix",(e=>e.normalTextureTransformMatrix??n.zK))),e.varyings.add("normalUV","vec2"),e.vertex.code.add(o.H`void forwardNormalUV(){
normalUV = (normalTextureTransformMatrix * vec3(vuv0, 1.0)).xy;
}`)):e.vertex.code.add(o.H`void forwardNormalUV(){}`)}function c(e,t){t.hasEmissionTextureTransform&&t.textureCoordinateType!==i.q.None?(e.vertex.uniforms.add(new a.k("emissiveTextureTransformMatrix",(e=>e.emissiveTextureTransformMatrix??n.zK))),e.varyings.add("emissiveUV","vec2"),e.vertex.code.add(o.H`void forwardEmissiveUV(){
emissiveUV = (emissiveTextureTransformMatrix * vec3(vuv0, 1.0)).xy;
}`)):e.vertex.code.add(o.H`void forwardEmissiveUV(){}`)}function u(e,t){t.hasOcclusionTextureTransform&&t.textureCoordinateType!==i.q.None?(e.vertex.uniforms.add(new a.k("occlusionTextureTransformMatrix",(e=>e.occlusionTextureTransformMatrix??n.zK))),e.varyings.add("occlusionUV","vec2"),e.vertex.code.add(o.H`void forwardOcclusionUV(){
occlusionUV = (occlusionTextureTransformMatrix * vec3(vuv0, 1.0)).xy;
}`)):e.vertex.code.add(o.H`void forwardOcclusionUV(){}`)}function d(e,t){t.hasMetallicRoughnessTextureTransform&&t.textureCoordinateType!==i.q.None?(e.vertex.uniforms.add(new a.k("metallicRoughnessTextureTransformMatrix",(e=>e.metallicRoughnessTextureTransformMatrix??n.zK))),e.varyings.add("metallicRoughnessUV","vec2"),e.vertex.code.add(o.H`void forwardMetallicRoughnessUV(){
metallicRoughnessUV = (metallicRoughnessTextureTransformMatrix * vec3(vuv0, 1.0)).xy;
}`)):e.vertex.code.add(o.H`void forwardMetallicRoughnessUV(){}`)}},44077:function(e,t,r){r.d(t,{A:function(){return b}});var n=r(4357),i=r(49071),o=r(86989);class a extends i.n{constructor(e,t,r){super(e,"vec4",o.c.Pass,((r,n,i)=>r.setUniform4fv(e,t(n,i))),r)}}class s extends i.n{constructor(e,t,r){super(e,"float",o.c.Pass,((r,n,i)=>r.setUniform1fv(e,t(n,i))),r)}}var l=r(76527),c=r(86754),u=r(814),d=(r(44114),r(9302),r(27165),r(4260),r(36816),r(44337),r(17455)),h=(r(3568),r(74344)),f=(r(11382),r(40399)),m=r(13592),p=r(36861),v=(r(8660),r(95753),r(39834));let g=class extends m.A{constructor(){super(...arguments),this.SCENEVIEW_HITTEST_RETURN_INTERSECTOR=!1,this.DECONFLICTOR_SHOW_VISIBLE=!1,this.DECONFLICTOR_SHOW_INVISIBLE=!1,this.DECONFLICTOR_SHOW_GRID=!1,this.LABELS_SHOW_BORDER=!1,this.TEXT_SHOW_BASELINE=!1,this.TEXT_SHOW_BORDER=!1,this.OVERLAY_DRAW_DEBUG_TEXTURE=!1,this.OVERLAY_SHOW_CENTER=!1,this.SHOW_POI=!1,this.TESTS_DISABLE_OPTIMIZATIONS=!1,this.TESTS_DISABLE_FAST_UPDATES=!1,this.DRAW_MESH_GEOMETRY_NORMALS=!1,this.FEATURE_TILE_FETCH_SHOW_TILES=!1,this.FEATURE_TILE_TREE_SHOW_TILES=!1,this.TERRAIN_TILE_TREE_SHOW_TILES=!1,this.I3S_TREE_SHOW_TILES=!1,this.I3S_SHOW_MODIFICATIONS=!1,this.LOD_INSTANCE_RENDERER_DISABLE_UPDATES=!1,this.LOD_INSTANCE_RENDERER_COLORIZE_BY_LEVEL=!1,this.EDGES_SHOW_HIDDEN_TRANSPARENT_EDGES=!1,this.LINE_WIREFRAMES=!1}};(0,f._)([(0,p.MZ)()],g.prototype,"SCENEVIEW_HITTEST_RETURN_INTERSECTOR",void 0),(0,f._)([(0,p.MZ)()],g.prototype,"DECONFLICTOR_SHOW_VISIBLE",void 0),(0,f._)([(0,p.MZ)()],g.prototype,"DECONFLICTOR_SHOW_INVISIBLE",void 0),(0,f._)([(0,p.MZ)()],g.prototype,"DECONFLICTOR_SHOW_GRID",void 0),(0,f._)([(0,p.MZ)()],g.prototype,"LABELS_SHOW_BORDER",void 0),(0,f._)([(0,p.MZ)()],g.prototype,"TEXT_SHOW_BASELINE",void 0),(0,f._)([(0,p.MZ)()],g.prototype,"TEXT_SHOW_BORDER",void 0),(0,f._)([(0,p.MZ)()],g.prototype,"OVERLAY_DRAW_DEBUG_TEXTURE",void 0),(0,f._)([(0,p.MZ)()],g.prototype,"OVERLAY_SHOW_CENTER",void 0),(0,f._)([(0,p.MZ)()],g.prototype,"SHOW_POI",void 0),(0,f._)([(0,p.MZ)()],g.prototype,"TESTS_DISABLE_OPTIMIZATIONS",void 0),(0,f._)([(0,p.MZ)()],g.prototype,"TESTS_DISABLE_FAST_UPDATES",void 0),(0,f._)([(0,p.MZ)()],g.prototype,"DRAW_MESH_GEOMETRY_NORMALS",void 0),(0,f._)([(0,p.MZ)()],g.prototype,"FEATURE_TILE_FETCH_SHOW_TILES",void 0),(0,f._)([(0,p.MZ)()],g.prototype,"FEATURE_TILE_TREE_SHOW_TILES",void 0),(0,f._)([(0,p.MZ)()],g.prototype,"TERRAIN_TILE_TREE_SHOW_TILES",void 0),(0,f._)([(0,p.MZ)()],g.prototype,"I3S_TREE_SHOW_TILES",void 0),(0,f._)([(0,p.MZ)()],g.prototype,"I3S_SHOW_MODIFICATIONS",void 0),(0,f._)([(0,p.MZ)()],g.prototype,"LOD_INSTANCE_RENDERER_DISABLE_UPDATES",void 0),(0,f._)([(0,p.MZ)()],g.prototype,"LOD_INSTANCE_RENDERER_COLORIZE_BY_LEVEL",void 0),(0,f._)([(0,p.MZ)()],g.prototype,"EDGES_SHOW_HIDDEN_TRANSPARENT_EDGES",void 0),(0,f._)([(0,p.MZ)()],g.prototype,"LINE_WIREFRAMES",void 0),g=(0,f._)([(0,v.$)("esri.views.3d.support.debugFlags")],g);new g;var _,x;!function(e){e[e.Undefined=0]="Undefined",e[e.DefinedSize=1]="DefinedSize",e[e.DefinedScale=2]="DefinedScale"}(_||(_={})),function(e){e[e.Undefined=0]="Undefined",e[e.DefinedAngle=1]="DefinedAngle"}(x||(x={}));l.Y;(0,d.vt)(),(0,h.vt)(),(0,d.vt)();r(37973);const T=8;function b(e,t){const{vertex:r,attributes:i}=e;t.hasVvInstancing&&(t.vvSize||t.vvColor)&&i.add(u.r.INSTANCEFEATUREATTRIBUTE,"vec4"),t.vvSize?(r.uniforms.add(new n.t("vvSizeMinSize",(e=>e.vvSize.minSize))),r.uniforms.add(new n.t("vvSizeMaxSize",(e=>e.vvSize.maxSize))),r.uniforms.add(new n.t("vvSizeOffset",(e=>e.vvSize.offset))),r.uniforms.add(new n.t("vvSizeFactor",(e=>e.vvSize.factor))),r.uniforms.add(new c.k("vvSymbolRotationMatrix",(e=>e.vvSymbolRotationMatrix))),r.uniforms.add(new n.t("vvSymbolAnchor",(e=>e.vvSymbolAnchor))),r.code.add(l.H`vec3 vvScale(vec4 _featureAttribute) {
return clamp(vvSizeOffset + _featureAttribute.x * vvSizeFactor, vvSizeMinSize, vvSizeMaxSize);
}
vec4 vvTransformPosition(vec3 position, vec4 _featureAttribute) {
return vec4(vvSymbolRotationMatrix * ( vvScale(_featureAttribute) * (position + vvSymbolAnchor)), 1.0);
}`),r.code.add(l.H`
      const float eps = 1.192092896e-07;
      vec4 vvTransformNormal(vec3 _normal, vec4 _featureAttribute) {
        vec3 vvScale = clamp(vvSizeOffset + _featureAttribute.x * vvSizeFactor, vvSizeMinSize + eps, vvSizeMaxSize);
        return vec4(vvSymbolRotationMatrix * _normal / vvScale, 1.0);
      }

      ${t.hasVvInstancing?l.H`
      vec4 vvLocalNormal(vec3 _normal) {
        return vvTransformNormal(_normal, instanceFeatureAttribute);
      }

      vec4 localPosition() {
        return vvTransformPosition(position, instanceFeatureAttribute);
      }`:""}
    `)):r.code.add(l.H`vec4 localPosition() { return vec4(position, 1.0); }
vec4 vvLocalNormal(vec3 _normal) { return vec4(_normal, 1.0); }`),t.vvColor?(r.constants.add("vvColorNumber","int",T),r.uniforms.add(new s("vvColorValues",(e=>e.vvColor.values),T),new a("vvColorColors",(e=>e.vvColor.colors),T)),r.code.add(l.H`
      vec4 interpolateVVColor(float value) {
        if (value <= vvColorValues[0]) {
          return vvColorColors[0];
        }

        for (int i = 1; i < vvColorNumber; ++i) {
          if (vvColorValues[i] >= value) {
            float f = (value - vvColorValues[i-1]) / (vvColorValues[i] - vvColorValues[i-1]);
            return mix(vvColorColors[i-1], vvColorColors[i], f);
          }
        }
        return vvColorColors[vvColorNumber - 1];
      }

      vec4 vvGetColor(vec4 featureAttribute) {
        return interpolateVVColor(featureAttribute.y);
      }

      ${t.hasVvInstancing?l.H`
            vec4 vvColor() {
              return vvGetColor(instanceFeatureAttribute);
            }`:"vec4 vvColor() { return vec4(1.0); }"}
    `)):r.code.add(l.H`vec4 vvColor() { return vec4(1.0); }`)}},29155:function(e,t,r){r.d(t,{H:function(){return n},y:function(){return i}});const n=.1,i=.001},60047:function(e,t,r){r.d(t,{S:function(){return c}});var n=r(29155),i=r(76527);function o(e){e.fragment.code.add(i.H`
    #define discardOrAdjustAlpha(color) { if (color.a < ${i.H.float(n.y)}) { discard; } }
  `)}var a=r(49071);r(86989);a.n;var s=r(7606),l=r(53338);function c(e,t){u(e,t,new s.m("textureAlphaCutoff",(e=>e.textureAlphaCutoff)))}function u(e,t,r){const n=e.fragment;switch(t.alphaDiscardMode!==l.sf.Mask&&t.alphaDiscardMode!==l.sf.MaskBlend||n.uniforms.add(r),t.alphaDiscardMode){case l.sf.Blend:return e.include(o);case l.sf.Opaque:n.code.add(i.H`void discardOrAdjustAlpha(inout vec4 color) {
color.a = 1.0;
}`);break;case l.sf.Mask:n.code.add(i.H`#define discardOrAdjustAlpha(color) { if (color.a < textureAlphaCutoff) { discard; } else { color.a = 1.0; } }`);break;case l.sf.MaskBlend:e.fragment.code.add(i.H`#define discardOrAdjustAlpha(color) { if (color.a < textureAlphaCutoff) { discard; } }`)}}},70243:function(e,t,r){r.d(t,{Ir:function(){return u}});var n=r(24667),i=r(3009),o=r(88031),a=r(43911),s=r(93348),l=r(43494),c=r(76527);function u(e){e.fragment.uniforms.add(new l.E("projInfo",((e,t)=>d(t.camera)))),e.fragment.uniforms.add(new s.G("zScale",((e,t)=>f(t.camera)))),e.fragment.code.add(c.H`vec3 reconstructPosition(vec2 fragCoord, float depth) {
return vec3((fragCoord * projInfo.xy + projInfo.zw) * (zScale.x * depth + zScale.y), depth);
}`)}function d(e){const t=e.projectionMatrix;return 0===t[11]?(0,o.s)(h,2/(e.fullWidth*t[0]),2/(e.fullHeight*t[5]),(1+t[12])/t[0],(1+t[13])/t[5]):(0,o.s)(h,-2/(e.fullWidth*t[0]),-2/(e.fullHeight*t[5]),(1-t[8])/t[0],(1-t[9])/t[5])}const h=(0,a.vt)();function f(e){return 0===e.projectionMatrix[11]?(0,n.hZ)(m,0,1):(0,n.hZ)(m,1,0)}const m=(0,i.vt)()},29515:function(e,t,r){r.d(t,{u:function(){return i}});var n=r(76527);function i({code:e},t){t.doublePrecisionRequiresObfuscation?e.add(n.H`vec3 dpPlusFrc(vec3 a, vec3 b) {
return mix(a, a + b, vec3(notEqual(b, vec3(0))));
}
vec3 dpMinusFrc(vec3 a, vec3 b) {
return mix(vec3(0), a - b, vec3(notEqual(a, b)));
}
vec3 dpAdd(vec3 hiA, vec3 loA, vec3 hiB, vec3 loB) {
vec3 t1 = dpPlusFrc(hiA, hiB);
vec3 e = dpMinusFrc(t1, hiA);
vec3 t2 = dpMinusFrc(hiB, e) + dpMinusFrc(hiA, dpMinusFrc(t1, e)) + loA + loB;
return t1 + t2;
}`):e.add(n.H`vec3 dpAdd(vec3 hiA, vec3 loA, vec3 hiB, vec3 loB) {
vec3 t1 = hiA + hiB;
vec3 e = t1 - hiA;
vec3 t2 = ((hiB - e) + (hiA - (t1 - e))) + loA + loB;
return t1 + t2;
}`)}},20056:function(e,t,r){r.d(t,{N:function(){return a}});var n=r(14526),i=r(76527);function o(e){e.code.add(i.H`vec4 premultiplyAlpha(vec4 v) {
return vec4(v.rgb * v.a, v.a);
}
vec3 rgb2hsv(vec3 c) {
vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
vec4 p = c.g < c.b ? vec4(c.bg, K.wz) : vec4(c.gb, K.xy);
vec4 q = c.r < p.x ? vec4(p.xyw, c.r) : vec4(c.r, p.yzx);
float d = q.x - min(q.w, q.y);
float e = 1.0e-10;
return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), min(d / (q.x + e), 1.0), q.x);
}
vec3 hsv2rgb(vec3 c) {
vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}
float rgb2v(vec3 c) {
return max(c.x, max(c.y, c.z));
}`)}function a(e){e.include(o),e.code.add(i.H`
    vec3 mixExternalColor(vec3 internalColor, vec3 textureColor, vec3 externalColor, int mode) {
      // workaround for artifacts in OSX using Intel Iris Pro
      // see: https://devtopia.esri.com/WebGIS/arcgis-js-api/issues/10475
      vec3 internalMixed = internalColor * textureColor;
      vec3 allMixed = internalMixed * externalColor;

      if (mode == ${i.H.int(n.k5.Multiply)}) {
        return allMixed;
      }
      if (mode == ${i.H.int(n.k5.Ignore)}) {
        return internalMixed;
      }
      if (mode == ${i.H.int(n.k5.Replace)}) {
        return externalColor;
      }

      // tint (or something invalid)
      float vIn = rgb2v(internalMixed);
      vec3 hsvTint = rgb2hsv(externalColor);
      vec3 hsvOut = vec3(hsvTint.x, hsvTint.y, vIn * hsvTint.z);
      return hsv2rgb(hsvOut);
    }

    float mixExternalOpacity(float internalOpacity, float textureOpacity, float externalOpacity, int mode) {
      // workaround for artifacts in OSX using Intel Iris Pro
      // see: https://devtopia.esri.com/WebGIS/arcgis-js-api/issues/10475
      float internalMixed = internalOpacity * textureOpacity;
      float allMixed = internalMixed * externalOpacity;

      if (mode == ${i.H.int(n.k5.Ignore)}) {
        return internalMixed;
      }
      if (mode == ${i.H.int(n.k5.Replace)}) {
        return externalOpacity;
      }

      // multiply or tint (or something invalid)
      return allMixed;
    }
  `)}},67500:function(e,t,r){r.d(t,{U:function(){return i}});var n=r(76527);function i(e){e.code.add(n.H`const float MAX_RGBA4_FLOAT =
15.0 / 16.0 +
15.0 / 16.0 / 16.0 +
15.0 / 16.0 / 16.0 / 16.0 +
15.0 / 16.0 / 16.0 / 16.0 / 16.0;
const vec4 FIXED_POINT_FACTORS_RGBA4 = vec4(1.0, 16.0, 16.0 * 16.0, 16.0 * 16.0 * 16.0);
vec4 floatToRgba4(const float value) {
float valueInValidDomain = clamp(value, 0.0, MAX_RGBA4_FLOAT);
vec4 fixedPointU4 = floor(fract(valueInValidDomain * FIXED_POINT_FACTORS_RGBA4) * 16.0);
const float toU4AsFloat = 1.0 / 15.0;
return fixedPointU4 * toU4AsFloat;
}
const vec4 RGBA4_2_FLOAT_FACTORS = vec4(
15.0 / (16.0),
15.0 / (16.0 * 16.0),
15.0 / (16.0 * 16.0 * 16.0),
15.0 / (16.0 * 16.0 * 16.0 * 16.0)
);
float rgba4ToFloat(vec4 rgba) {
return dot(rgba, RGBA4_2_FLOAT_FACTORS);
}`)}},33857:function(e,t,r){r(76527)},18967:function(e,t,r){r.d(t,{yu:function(){return f},NB:function(){return m},S7:function(){return g}});var n=r(44337),i=r(17455),o=r(3568),a=r(74344),s=r(19404),l=r(4357),c=(r(7606),r(49071)),u=r(86989);class d extends c.n{constructor(e,t){super(e,"mat4",u.c.Draw,((r,n,i)=>r.setUniformMatrix4fv(e,t(n,i))))}}var h=r(47673);function f(e,t){t.instancedDoublePrecision?e.constants.add("cameraPosition","vec3",a.uY):e.uniforms.add(new s.W("cameraPosition",((e,t)=>(0,o.s)(v,t.camera.viewInverseTransposeMatrix[3]-e.origin[0],t.camera.viewInverseTransposeMatrix[7]-e.origin[1],t.camera.viewInverseTransposeMatrix[11]-e.origin[2]))))}function m(e,t){if(!t.instancedDoublePrecision)return void e.uniforms.add(new h.X("proj",((e,t)=>t.camera.projectionMatrix)),new d("view",((e,t)=>(0,n.Tl)(p,t.camera.viewMatrix,e.origin))),new s.W("localOrigin",(e=>e.origin)));const r=e=>(0,o.s)(v,e.camera.viewInverseTransposeMatrix[3],e.camera.viewInverseTransposeMatrix[7],e.camera.viewInverseTransposeMatrix[11]);e.uniforms.add(new h.X("proj",((e,t)=>t.camera.projectionMatrix)),new h.X("view",((e,t)=>(0,n.Tl)(p,t.camera.viewMatrix,r(t)))),new l.t("localOrigin",((e,t)=>r(t))))}const p=(0,i.vt)(),v=(0,a.vt)();function g(e){e.uniforms.add(new h.X("viewNormal",((e,t)=>t.camera.viewInverseTransposeMatrix)))}},57977:function(e,t,r){r.d(t,{t:function(){return o}});var n=r(49071),i=r(86989);class o extends n.n{constructor(e,t){super(e,"vec2",i.c.Draw,((r,n,i,o)=>r.setUniform2fv(e,t(n,i,o))))}}},93348:function(e,t,r){r.d(t,{G:function(){return o}});var n=r(49071),i=r(86989);class o extends n.n{constructor(e,t){super(e,"vec2",i.c.Pass,((r,n,i)=>r.setUniform2fv(e,t(n,i))))}}},19404:function(e,t,r){r.d(t,{W:function(){return o}});var n=r(49071),i=r(86989);class o extends n.n{constructor(e,t){super(e,"vec3",i.c.Draw,((r,n,i,o)=>r.setUniform3fv(e,t(n,i,o))))}}},4357:function(e,t,r){r.d(t,{t:function(){return o}});var n=r(49071),i=r(86989);class o extends n.n{constructor(e,t){super(e,"vec3",i.c.Pass,((r,n,i)=>r.setUniform3fv(e,t(n,i))))}}},43494:function(e,t,r){r.d(t,{E:function(){return o}});var n=r(49071),i=r(86989);class o extends n.n{constructor(e,t){super(e,"vec4",i.c.Pass,((r,n,i)=>r.setUniform4fv(e,t(n,i))))}}},7606:function(e,t,r){r.d(t,{m:function(){return o}});var n=r(49071),i=r(86989);class o extends n.n{constructor(e,t){super(e,"float",i.c.Pass,((r,n,i)=>r.setUniform1f(e,t(n,i))))}}},56126:function(e,t,r){r.d(t,{c:function(){return o}});var n=r(49071),i=r(86989);class o extends n.n{constructor(e,t){super(e,"int",i.c.Pass,((r,n,i)=>r.setUniform1i(e,t(n,i))))}}},86207:function(e,t,r){r.d(t,{h:function(){return o}});var n=r(49071),i=r(86989);class o extends n.n{constructor(e,t){super(e,"mat3",i.c.Draw,((r,n,i)=>r.setUniformMatrix3fv(e,t(n,i))))}}},86754:function(e,t,r){r.d(t,{k:function(){return o}});var n=r(49071),i=r(86989);class o extends n.n{constructor(e,t){super(e,"mat3",i.c.Pass,((r,n,i)=>r.setUniformMatrix3fv(e,t(n,i))))}}},47673:function(e,t,r){r.d(t,{X:function(){return o}});var n=r(49071),i=r(86989);class o extends n.n{constructor(e,t){super(e,"mat4",i.c.Pass,((r,n,i)=>r.setUniformMatrix4fv(e,t(n,i))))}}},53051:function(e,t,r){r.d(t,{N5:function(){return c}});r(44114),r(17642),r(58004),r(33853),r(45876),r(32475),r(15024),r(31698);var n=r(18244),i=(r(9302),r(8660)),o=r(86989),a=r(24394);const s=()=>i.A.getLogger("esri.views.3d.webgl-engine.core.shaderModules.shaderBuilder");class l{constructor(){this._includedModules=new Map}include(e,t){this._includedModules.has(e)?this._includedModules.get(e):(this._includedModules.set(e,t),e(this.builder,t))}}class c extends l{constructor(){super(...arguments),this.vertex=new h,this.fragment=new h,this.attributes=new f,this.varyings=new m,this.extensions=new p,this.constants=new g,this.outputs=new v}get fragmentUniforms(){return this.fragment.uniforms.entries}get builder(){return this}generate(e){const t=this.extensions.generateSource(e),r=this.attributes.generateSource(e),n=this.varyings.generateSource(e),i="vertex"===e?this.vertex:this.fragment,o=i.uniforms.generateSource(),a=i.code.generateSource(),s="vertex"===e?x:_,l=this.constants.generateSource().concat(i.constants.generateSource()),c=this.outputs.generateSource(e);return`#version 300 es\n${t.join("\n")}\n\n${s}\n\n${l.join("\n")}\n\n${o.join("\n")}\n\n${r.join("\n")}\n\n${n.join("\n")}\n\n${c.join("\n")}\n\n${a.join("\n")}`}generateBindPass(e){const t=new Map;this.vertex.uniforms.entries.forEach((e=>{const r=e.bind[o.c.Pass];r&&t.set(e.name,r)})),this.fragment.uniforms.entries.forEach((e=>{const r=e.bind[o.c.Pass];r&&t.set(e.name,r)}));const r=Array.from(t.values()),n=r.length;return(t,i)=>{for(let o=0;o<n;++o)r[o](e,t,i)}}generateBindDraw(e){const t=new Map;this.vertex.uniforms.entries.forEach((e=>{const r=e.bind[o.c.Draw];r&&t.set(e.name,r)})),this.fragment.uniforms.entries.forEach((e=>{const r=e.bind[o.c.Draw];r&&t.set(e.name,r)}));const r=Array.from(t.values()),n=r.length;return(t,i,o)=>{for(let a=0;a<n;++a)r[a](e,t,i,o)}}}class u{constructor(e){this._stage=e,this._entries=new Map}add(...e){for(const t of e)this._add(t);return this._stage}get(e){return this._entries.get(e)}_add(e){if(null!=e){if(this._entries.has(e.name)&&!this._entries.get(e.name).equals(e))throw new n.A(`Duplicate uniform name ${e.name} for different uniform type`);this._entries.set(e.name,e)}else s().error(`Trying to add null Uniform from ${(new Error).stack}.`)}generateSource(){return Array.from(this._entries.values()).map((e=>null!=e.arraySize?`uniform ${e.type} ${e.name}[${e.arraySize}];`:`uniform ${e.type} ${e.name};`))}get entries(){return Array.from(this._entries.values())}}class d{constructor(e){this._stage=e,this._entries=new Array}add(e){return this._entries.push(e),this._stage}generateSource(){return this._entries}}class h extends l{constructor(){super(...arguments),this.uniforms=new u(this),this.code=new d(this),this.constants=new g}get builder(){return this}}class f{constructor(){this._entries=new Array}add(e,t){this._entries.push([e,t])}generateSource(e){return"fragment"===e?[]:this._entries.map((e=>`in ${e[1]} ${e[0]};`))}}class m{constructor(){this._entries=new Map}add(e,t){this._entries.has(e)&&(0,a.vA)(this._entries.get(e)===t),this._entries.set(e,t)}generateSource(e){const t=new Array;return this._entries.forEach(((r,n)=>t.push("vertex"===e?`out ${r} ${n};`:`in ${r} ${n};`))),t}}class p{constructor(){this._entries=new Set}add(e){this._entries.add(e)}generateSource(e){const t="vertex"===e?p.ALLOWLIST_VERTEX:p.ALLOWLIST_FRAGMENT;return Array.from(this._entries).filter((e=>t.includes(e))).map((e=>`#extension ${e} : enable`))}}p.ALLOWLIST_FRAGMENT=["GL_EXT_shader_texture_lod","GL_OES_standard_derivatives"],p.ALLOWLIST_VERTEX=[];class v{constructor(){this._entries=new Map}add(e,t,r=0){const n=this._entries.get(r);n?(0,a.vA)(n.name===e&&n.type===t,`Fragment shader output location ${r} occupied`):this._entries.set(r,{name:e,type:t})}generateSource(e){if("vertex"===e)return[];0===this._entries.size&&this._entries.set(0,{name:v.DEFAULT_NAME,type:v.DEFAULT_TYPE});const t=new Array;return this._entries.forEach(((e,r)=>t.push(`layout(location = ${r}) out ${e.type} ${e.name};`))),t}}v.DEFAULT_TYPE="vec4",v.DEFAULT_NAME="fragColor";class g{constructor(){this._entries=new Set}add(e,t,r){let n="ERROR_CONSTRUCTOR_STRING";switch(t){case"float":n=g._numberToFloatStr(r);break;case"int":n=g._numberToIntStr(r);break;case"bool":n=r.toString();break;case"vec2":n=`vec2(${g._numberToFloatStr(r[0])},                            ${g._numberToFloatStr(r[1])})`;break;case"vec3":n=`vec3(${g._numberToFloatStr(r[0])},                            ${g._numberToFloatStr(r[1])},                            ${g._numberToFloatStr(r[2])})`;break;case"vec4":n=`vec4(${g._numberToFloatStr(r[0])},                            ${g._numberToFloatStr(r[1])},                            ${g._numberToFloatStr(r[2])},                            ${g._numberToFloatStr(r[3])})`;break;case"ivec2":n=`ivec2(${g._numberToIntStr(r[0])},                             ${g._numberToIntStr(r[1])})`;break;case"ivec3":n=`ivec3(${g._numberToIntStr(r[0])},                             ${g._numberToIntStr(r[1])},                             ${g._numberToIntStr(r[2])})`;break;case"ivec4":n=`ivec4(${g._numberToIntStr(r[0])},                             ${g._numberToIntStr(r[1])},                             ${g._numberToIntStr(r[2])},                             ${g._numberToIntStr(r[3])})`;break;case"mat2":case"mat3":case"mat4":n=`${t}(${Array.prototype.map.call(r,(e=>g._numberToFloatStr(e))).join(", ")})`}return this._entries.add(`const ${t} ${e} = ${n};`),this}static _numberToIntStr(e){return e.toFixed(0)}static _numberToFloatStr(e){return Number.isInteger(e)?e.toFixed(1):e.toString()}generateSource(){return Array.from(this._entries)}}const _="#ifdef GL_FRAGMENT_PRECISION_HIGH\n  precision highp float;\n  precision highp sampler2D;\n#else\n  precision mediump float;\n  precision mediump sampler2D;\n#endif",x="precision highp float;\nprecision highp sampler2D;"},62054:function(e,t,r){r.d(t,{o:function(){return o}});var n=r(49071),i=r(86989);class o extends n.n{constructor(e,t){super(e,"sampler2D",i.c.Draw,((r,n,i)=>r.bindTexture(e,t(n,i))))}}},93687:function(e,t,r){r.d(t,{N:function(){return o}});var n=r(49071),i=r(86989);class o extends n.n{constructor(e,t){super(e,"sampler2D",i.c.Pass,((r,n,i)=>r.bindTexture(e,t(n,i))))}}},49071:function(e,t,r){r.d(t,{n:function(){return i}});var n=r(86989);class i{constructor(e,t,r,i,o=null){if(this.name=e,this.type=t,this.arraySize=o,this.bind={[n.c.Pass]:null,[n.c.Draw]:null},i)switch(r){case n.c.Pass:this.bind[n.c.Pass]=i;break;case n.c.Draw:this.bind[n.c.Draw]=i}}equals(e){return this.type===e.type&&this.name===e.name&&this.arraySize===e.arraySize}}},76527:function(e,t,r){r.d(t,{H:function(){return o},Y:function(){return i}});class n{}const i=n;function o(e,...t){let r="";for(let n=0;n<t.length;n++)r+=e[n]+t[n];return r+=e[e.length-1],r}!function(e){function t(e){return Math.round(e).toString()}function r(e){return e.toPrecision(8)}e.int=t,e.float=r}(o||(o={}))},86989:function(e,t,r){var n;r.d(t,{c:function(){return n}}),function(e){e[e.Pass=0]="Pass",e[e.Draw=1]="Draw"}(n||(n={}))},27538:function(e,t,r){r.d(t,{$:function(){return n}});class n{constructor(e,t){this._module=e,this._loadModule=t}get(){return this._module}async reload(){return this._module=await this._loadModule(),this._module}}},74525:function(e,t,r){r.d(t,{w:function(){return o}});var n=r(50942),i=r(79721);class o{constructor(e,t,r){this.release=r,this.initializeConfiguration(e,t),this._configuration=t.snapshot(),this._program=this.initializeProgram(e),this._pipeline=this.initializePipeline(e)}destroy(){this._program=(0,n.WD)(this._program),this._pipeline=this._configuration=null}reload(e){(0,n.WD)(this._program),this._program=this.initializeProgram(e),this._pipeline=this.initializePipeline(e)}get program(){return this._program}get compiled(){return this.program.compiled}get key(){return this._configuration.key}get configuration(){return this._configuration}ensureAttributeLocations(e){this.program.assertCompatibleVertexAttributeLocations(e)}get primitiveType(){return i.WR.TRIANGLES}getPipeline(e,t,r){return this._pipeline}initializeConfiguration(e,t){}}},70047:function(e,t,r){r.d(t,{K:function(){return i},W:function(){return o}});r(44114);var n=r(76527);class i extends n.Y{constructor(){super(),this._key="",this._keyDirty=!1,this._parameterBits=this._parameterBits?this._parameterBits.map((()=>0)):[],this._parameterNames||(this._parameterNames=[])}get key(){return this._keyDirty&&(this._keyDirty=!1,this._key=String.fromCharCode.apply(String,this._parameterBits)),this._key}snapshot(){const e=this._parameterNames,t={key:this.key};for(const r of e)t[r]=this[r];return t}}function o(e={}){return(t,r)=>{if(t._parameterNames=t._parameterNames??[],t._parameterNames.push(r),null!=e.constValue)Object.defineProperty(t,r,{get:()=>e.constValue});else{const n=t._parameterNames.length-1,i=e.count||2,o=Math.ceil(Math.log2(i)),a=t._parameterBits??[0];let s=0;for(;a[s]+o>16;)s++,s>=a.length&&a.push(0);t._parameterBits=a;const l=a[s],c=(1<<o)-1<<l;a[s]+=o,Object.defineProperty(t,r,{get(){return this[n]},set(e){if(this[n]!==e&&(this[n]=e,this._keyDirty=!0,this._parameterBits[s]=this._parameterBits[s]&~c|+e<<l&c,"number"!=typeof e&&"boolean"!=typeof e))throw new Error("Configuration value for "+r+" must be boolean or number, got "+typeof e)}})}}}},8530:function(e,t,r){r.d(t,{J:function(){return i}});var n=r(30864);class i{constructor(){this.id=(0,n.c)()}}},29658:function(e,t,r){var n;r.d(t,{X:function(){return n}}),function(e){e[e.Layer=0]="Layer",e[e.Object=1]="Object",e[e.Mesh=2]="Mesh",e[e.Line=3]="Line",e[e.Point=4]="Point",e[e.Material=5]="Material",e[e.Texture=6]="Texture",e[e.COUNT=7]="COUNT"}(n||(n={}))},12159:function(e,t,r){r.d(t,{D:function(){return i}});var n=r(814);const i=new Map([[n.r.POSITION,0],[n.r.NORMAL,1],[n.r.NORMALCOMPRESSED,1],[n.r.UV0,2],[n.r.COLOR,3],[n.r.COLORFEATUREATTRIBUTE,3],[n.r.SIZE,4],[n.r.TANGENT,4],[n.r.CENTEROFFSETANDDISTANCE,5],[n.r.SYMBOLCOLOR,5],[n.r.FEATUREATTRIBUTE,6],[n.r.INSTANCEFEATUREATTRIBUTE,6],[n.r.INSTANCECOLOR,7],[n.r.OBJECTANDLAYERIDCOLOR,7],[n.r.INSTANCEOBJECTANDLAYERIDCOLOR,7],[n.r.INSTANCEMODEL,8],[n.r.INSTANCEMODELNORMAL,12],[n.r.INSTANCEMODELORIGINHI,11],[n.r.INSTANCEMODELORIGINLO,15]])},7869:function(e,t,r){r.d(t,{m:function(){return l}});var n=r(50942),i=r(13570),o=r(76527),a=r(53338);class s{constructor(e){this._material=e.material,this._techniques=e.techniques,this._output=e.output}dispose(){this._techniques.release(this._technique)}get technique(){return this._technique}get _stippleTextures(){return this._techniques.constructionContext.stippleTextures}get _markerTextures(){return this._techniques.constructionContext.markerTextures}ensureTechnique(e,t){return this._technique=this._techniques.releaseAndAcquire(e,this._material.getConfiguration(this._output,t),this._technique),this._technique}ensureResources(e){return a.Am.LOADED}}class l extends s{constructor(e){super(e),this._numLoading=0,this._disposed=!1,this._textures=e.textures,this._textureId=e.textureId,this._acquire(e.textureId,(e=>this._texture=e)),this._acquire(e.normalTextureId,(e=>this._textureNormal=e)),this._acquire(e.emissiveTextureId,(e=>this._textureEmissive=e)),this._acquire(e.occlusionTextureId,(e=>this._textureOcclusion=e)),this._acquire(e.metallicRoughnessTextureId,(e=>this._textureMetallicRoughness=e))}dispose(){this._texture=(0,n.Gz)(this._texture),this._textureNormal=(0,n.Gz)(this._textureNormal),this._textureEmissive=(0,n.Gz)(this._textureEmissive),this._textureOcclusion=(0,n.Gz)(this._textureOcclusion),this._textureMetallicRoughness=(0,n.Gz)(this._textureMetallicRoughness),this._disposed=!0}ensureResources(e){return 0===this._numLoading?a.Am.LOADED:a.Am.LOADING}get textureBindParameters(){return new c(null!=this._texture?this._texture.glTexture:null,null!=this._textureNormal?this._textureNormal.glTexture:null,null!=this._textureEmissive?this._textureEmissive.glTexture:null,null!=this._textureOcclusion?this._textureOcclusion.glTexture:null,null!=this._textureMetallicRoughness?this._textureMetallicRoughness.glTexture:null)}updateTexture(e){null!=this._texture&&e===this._texture.id||(this._texture=(0,n.Gz)(this._texture),this._textureId=e,this._acquire(this._textureId,(e=>this._texture=e)))}_acquire(e,t){if(null==e)return void t(null);const r=this._textures.acquire(e);if((0,i.$X)(r))return++this._numLoading,void r.then((e=>{if(this._disposed)return(0,n.Gz)(e),void t(null);t(e)})).finally((()=>--this._numLoading));t(r)}}class c extends o.Y{constructor(e=null,t=null,r=null,n=null,i=null,o,a){super(),this.texture=e,this.textureNormal=t,this.textureEmissive=r,this.textureOcclusion=n,this.textureMetallicRoughness=i,this.scale=o,this.normalTextureTransformMatrix=a}}},37973:function(e,t,r){r.d(t,{im:function(){return d},m$:function(){return o}});var n=r(74344),i=r(76527);var o,a=r(53338),s=r(8530),l=r(29658),c=r(12159),u=r(16437);class d extends s.J{constructor(e,t){super(),this.type=l.X.Material,this.supportsEdges=!1,this._visible=!0,this._renderPriority=0,this._vertexAttributeLocations=c.D,this._pp0=(0,n.fA)(0,0,1),this._pp1=(0,n.fA)(0,0,0),this._parameters=(0,u.qu)(e,t),this.validateParameters(this._parameters)}get parameters(){return this._parameters}update(e){return!1}setParameters(e,t=!0){(0,u.MB)(this._parameters,e)&&(this.validateParameters(this._parameters),t&&this.parametersChanged())}validateParameters(e){}get visible(){return this._visible}set visible(e){e!==this._visible&&(this._visible=e,this.parametersChanged())}shouldRender(e){return this.isVisible()&&this.isVisibleForOutput(e.output)&&(!this.parameters.isDecoration||e.bindParameters.decorations===a.ID.ON)&&!!(this.parameters.renderOccluded&e.renderOccludedMask)}isVisibleForOutput(e){return!0}get renderPriority(){return this._renderPriority}set renderPriority(e){e!==this._renderPriority&&(this._renderPriority=e,this.parametersChanged())}get vertexAttributeLocations(){return this._vertexAttributeLocations}isVisible(){return this._visible}parametersChanged(){this.repository?.materialChanged(this)}queryRenderOccludedState(e){return this.isVisible()&&this.parameters.renderOccluded===e}intersectDraped(e,t,r,n,i,o){return this._pp0[0]=this._pp1[0]=n[0],this._pp0[1]=this._pp1[1]=n[1],this.intersect(e,t,r,this._pp0,this._pp1,i)}}!function(e){e[e.None=0]="None",e[e.Occlude=1]="Occlude",e[e.Transparent=2]="Transparent",e[e.OccludeAndTransparent=4]="OccludeAndTransparent",e[e.OccludeAndTransparentStencil=8]="OccludeAndTransparentStencil",e[e.Opaque=16]="Opaque"}(o||(o={}));i.Y},3984:function(e,t,r){r.d(t,{B:function(){return o}});r(44114);var n=r(73405),i=r(78294);class o{constructor(e,t,r){this._context=e,this._locations=r,this._textures=new Map,this._freeTextureUnits=new n.A({deallocator:null}),this._glProgram=e.programCache.acquire(t.generate("vertex"),t.generate("fragment"),r),this._glProgram.stop=()=>{throw new Error("Wrapped _glProgram used directly")},this.bindPass=t.generateBindPass(this),this.bindDraw=t.generateBindDraw(this),this._fragmentUniforms=(0,i.en)()?t.fragmentUniforms:null}dispose(){this._glProgram.dispose()}get glName(){return this._glProgram.glName}get hasTransformFeedbackVaryings(){return this._glProgram.hasTransformFeedbackVaryings}get compiled(){return this._glProgram.compiled}setUniform1b(e,t){this._glProgram.setUniform1i(e,t?1:0)}setUniform1i(e,t){this._glProgram.setUniform1i(e,t)}setUniform1f(e,t){this._glProgram.setUniform1f(e,t)}setUniform2fv(e,t){this._glProgram.setUniform2fv(e,t)}setUniform3fv(e,t){this._glProgram.setUniform3fv(e,t)}setUniform4fv(e,t){this._glProgram.setUniform4fv(e,t)}setUniformMatrix3fv(e,t){this._glProgram.setUniformMatrix3fv(e,t)}setUniformMatrix4fv(e,t){this._glProgram.setUniformMatrix4fv(e,t)}setUniform1fv(e,t){this._glProgram.setUniform1fv(e,t)}setUniform1iv(e,t){this._glProgram.setUniform1iv(e,t)}setUniform2iv(e,t){this._glProgram.setUniform3iv(e,t)}setUniform3iv(e,t){this._glProgram.setUniform3iv(e,t)}setUniform4iv(e,t){this._glProgram.setUniform4iv(e,t)}assertCompatibleVertexAttributeLocations(e){e.locations!==this._locations&&console.error("VertexAttributeLocations are incompatible")}stop(){this._textures.clear(),this._freeTextureUnits.clear()}bindTexture(e,t){if(null==t?.glName){const t=this._textures.get(e);return t&&(this._context.bindTexture(null,t.unit),this._freeTextureUnit(t),this._textures.delete(e)),null}let r=this._textures.get(e);return null==r?(r=this._allocTextureUnit(t),this._textures.set(e,r)):r.texture=t,this._context.useProgram(this),this.setUniform1i(e,r.unit),this._context.bindTexture(t,r.unit),r.unit}rebindTextures(){this._context.useProgram(this),this._textures.forEach(((e,t)=>{this._context.bindTexture(e.texture,e.unit),this.setUniform1i(t,e.unit)})),this._fragmentUniforms?.forEach((e=>{"sampler2D"!==e.type&&"samplerCube"!==e.type||this._textures.has(e.name)||console.error(`Texture sampler ${e.name} has no bound texture`)}))}_allocTextureUnit(e){return{texture:e,unit:0===this._freeTextureUnits.length?this._textures.size:this._freeTextureUnits.pop()}}_freeTextureUnit(e){this._freeTextureUnits.push(e.unit)}}},84205:function(e,t,r){var n;r.d(t,{y:function(){return n}}),function(e){e[e.ColorAlpha=0]="ColorAlpha",e[e.FrontFace=1]="FrontFace",e[e.NONE=2]="NONE",e[e.COUNT=3]="COUNT"}(n||(n={}))},24394:function(e,t,r){r.d(t,{O_:function(){return a},vA:function(){return o}});r(3009),r(88031);var n=r(43911);(0,n.vt)();class i{constructor(e){this.message=e}toString(){return`AssertException: ${this.message}`}}function o(e,t){if(!e){t=t||"Assertion";const e=new Error(t).stack;throw new i(`${t} at ${e}`)}}function a(e,t,r,n){let i,o=(r[0]-e[0])/t[0],a=(n[0]-e[0])/t[0];o>a&&(i=o,o=a,a=i);let s=(r[1]-e[1])/t[1],l=(n[1]-e[1])/t[1];if(s>l&&(i=s,s=l,l=i),o>l||s>a)return!1;s>o&&(o=s),l<a&&(a=l);let c=(r[2]-e[2])/t[2],u=(n[2]-e[2])/t[2];return c>u&&(i=c,c=u,u=i),!(o>u||c>a)&&(u<a&&(a=u),!(a<0))}},16437:function(e,t,r){r.d(t,{Um:function(){return m},qu:function(){return d},MB:function(){return h},kE:function(){return u}});r(44114);var n=r(39930),i=r(27165);r(98537);function o(e){return Math.abs(e*e*e)}function a(e,t,r){const n=r.parameters;return c.scale=Math.min(n.divisor/(t-n.offset),1),c.factor=o(e),c}function s(e,t){return(0,i.Cc)(e*Math.max(t.scale,t.minScaleFactor),e,t.factor)}function l(e,t,r,n){return s(e,a(t,r,n))}(0,i.kU)(10),(0,i.kU)(12),(0,i.kU)(70),(0,i.kU)(40);const c={scale:0,factor:0,minScaleFactor:0};function u(e,t,r,n,o){let a=(r.screenLength||0)*e.pixelRatio;null!=o&&(a=l(a,n,t,o));const s=a*Math.tan(.5*e.fovY)/(.5*e.fullHeight);return(0,i.qE)(s*t,r.minWorldLength||0,null!=r.maxWorldLength?r.maxWorldLength:1/0)}function d(e,t){const r=t?d(t):{};for(const n in e){let t=e[n];t?.forEach&&(t=f(t)),null==t&&n in r||(r[n]=t)}return r}function h(e,t){let r=!1;for(const i in t){const o=t[i];void 0!==o&&(Array.isArray(o)?null===e[i]?(e[i]=o.slice(),r=!0):(0,n.yo)(e[i],o)&&(r=!0):e[i]!==o&&(r=!0,e[i]=o))}return r}function f(e){const t=[];return e.forEach((e=>t.push(e))),t}const m={multiply:1,ignore:2,replace:3,tint:4}},24051:function(e,t,r){r.d(t,{Zo:function(){return i},jA:function(){return o},jS:function(){return n}});r(16573),r(78100),r(77936),r(37467),r(44732),r(79577);function n(e,t,r){for(let n=0;n<r;++n)t[2*n]=e[n],t[2*n+1]=e[n]-t[2*n]}function i(e,t){const r=e.length;for(let n=0;n<r;++n)a[0]=e[n],t[n]=a[0];return t}function o(e,t){const r=e.length;for(let n=0;n<r;++n)a[0]=e[n],a[1]=e[n]-a[0],t[n]=a[1];return t}const a=new Float32Array(2)},47362:function(e,t,r){r.d(t,{Ey:function(){return b},Ms:function(){return j},Xt:function(){return c},kn:function(){return u},ox:function(){return o},p3:function(){return a},wE:function(){return d}});var n=r(53338),i=r(79721);function o(e,t,r=i.Tb.ADD,n=[0,0,0,0]){return{srcRgb:e,srcAlpha:e,dstRgb:t,dstAlpha:t,opRgb:r,opAlpha:r,color:{r:n[0],g:n[1],b:n[2],a:n[3]}}}function a(e,t,r,n,o=i.Tb.ADD,a=i.Tb.ADD,s=[0,0,0,0]){return{srcRgb:e,srcAlpha:t,dstRgb:r,dstAlpha:n,opRgb:o,opAlpha:a,color:{r:s[0],g:s[1],b:s[2],a:s[3]}}}const s={face:i.Y7.BACK,mode:i.Ac.CCW},l={face:i.Y7.FRONT,mode:i.Ac.CCW},c=e=>e===n.s2.Back?s:e===n.s2.Front?l:null,u={zNear:0,zFar:1},d={r:!0,g:!0,b:!0,a:!0};function h(e){return E.intern(e)}function f(e){return w.intern(e)}function m(e){return C.intern(e)}function p(e){return I.intern(e)}function v(e){return N.intern(e)}function g(e){return L.intern(e)}function _(e){return D.intern(e)}function x(e){return F.intern(e)}function T(e){return V.intern(e)}function b(e){return W.intern(e)}class y{constructor(e,t){this._makeKey=e,this._makeRef=t,this._interns=new Map}intern(e){if(!e)return null;const t=this._makeKey(e),r=this._interns;return r.has(t)||r.set(t,this._makeRef(e)),r.get(t)??null}}function A(e){return"["+e.join(",")+"]"}const E=new y(S,(e=>({__tag:"Blending",...e})));function S(e){return e?A([e.srcRgb,e.srcAlpha,e.dstRgb,e.dstAlpha,e.opRgb,e.opAlpha,e.color.r,e.color.g,e.color.b,e.color.a]):null}const w=new y(M,(e=>({__tag:"Culling",...e})));function M(e){return e?A([e.face,e.mode]):null}const C=new y(O,(e=>({__tag:"PolygonOffset",...e})));function O(e){return e?A([e.factor,e.units]):null}const I=new y(R,(e=>({__tag:"DepthTest",...e})));function R(e){return e?A([e.func]):null}const N=new y(P,(e=>({__tag:"StencilTest",...e})));function P(e){return e?A([e.function.func,e.function.ref,e.function.mask,e.operation.fail,e.operation.zFail,e.operation.zPass]):null}const L=new y(H,(e=>({__tag:"DepthWrite",...e})));function H(e){return e?A([e.zNear,e.zFar]):null}const D=new y(B,(e=>({__tag:"ColorWrite",...e})));function B(e){return e?A([e.r,e.g,e.b,e.a]):null}const F=new y(z,(e=>({__tag:"StencilWrite",...e})));function z(e){return e?A([e.mask]):null}const V=new y(G,(e=>({__tag:"DrawBuffers",...e})));function G(e){return e?A(e.buffers):null}const W=new y(U,(e=>({blending:h(e.blending),culling:f(e.culling),polygonOffset:m(e.polygonOffset),depthTest:p(e.depthTest),stencilTest:v(e.stencilTest),depthWrite:g(e.depthWrite),colorWrite:_(e.colorWrite),stencilWrite:x(e.stencilWrite),drawBuffers:T(e.drawBuffers)})));function U(e){return e?A([S(e.blending),M(e.culling),O(e.polygonOffset),R(e.depthTest),P(e.stencilTest),H(e.depthWrite),B(e.colorWrite),z(e.stencilWrite),G(e.drawBuffers)]):null}class j{constructor(e){this._pipelineInvalid=!0,this._blendingInvalid=!0,this._cullingInvalid=!0,this._polygonOffsetInvalid=!0,this._depthTestInvalid=!0,this._stencilTestInvalid=!0,this._depthWriteInvalid=!0,this._colorWriteInvalid=!0,this._stencilWriteInvalid=!0,this._drawBuffersInvalid=!0,this._stateSetters=e}setPipeline(e){(this._pipelineInvalid||e!==this._pipeline)&&(this._setBlending(e.blending),this._setCulling(e.culling),this._setPolygonOffset(e.polygonOffset),this._setDepthTest(e.depthTest),this._setStencilTest(e.stencilTest),this._setDepthWrite(e.depthWrite),this._setColorWrite(e.colorWrite),this._setStencilWrite(e.stencilWrite),this._setDrawBuffers(e.drawBuffers),this._pipeline=e),this._pipelineInvalid=!1}invalidateBlending(){this._blendingInvalid=!0,this._pipelineInvalid=!0}invalidateCulling(){this._cullingInvalid=!0,this._pipelineInvalid=!0}invalidatePolygonOffset(){this._polygonOffsetInvalid=!0,this._pipelineInvalid=!0}invalidateDepthTest(){this._depthTestInvalid=!0,this._pipelineInvalid=!0}invalidateStencilTest(){this._stencilTestInvalid=!0,this._pipelineInvalid=!0}invalidateDepthWrite(){this._depthWriteInvalid=!0,this._pipelineInvalid=!0}invalidateColorWrite(){this._colorWriteInvalid=!0,this._pipelineInvalid=!0}invalidateStencilWrite(){this._stencilTestInvalid=!0,this._pipelineInvalid=!0}invalidateDrawBuffers(){this._drawBuffersInvalid=!0,this._pipelineInvalid=!0}_setBlending(e){this._blending=this._setSubState(e,this._blending,this._blendingInvalid,this._stateSetters.setBlending),this._blendingInvalid=!1}_setCulling(e){this._culling=this._setSubState(e,this._culling,this._cullingInvalid,this._stateSetters.setCulling),this._cullingInvalid=!1}_setPolygonOffset(e){this._polygonOffset=this._setSubState(e,this._polygonOffset,this._polygonOffsetInvalid,this._stateSetters.setPolygonOffset),this._polygonOffsetInvalid=!1}_setDepthTest(e){this._depthTest=this._setSubState(e,this._depthTest,this._depthTestInvalid,this._stateSetters.setDepthTest),this._depthTestInvalid=!1}_setStencilTest(e){this._stencilTest=this._setSubState(e,this._stencilTest,this._stencilTestInvalid,this._stateSetters.setStencilTest),this._stencilTestInvalid=!1}_setDepthWrite(e){this._depthWrite=this._setSubState(e,this._depthWrite,this._depthWriteInvalid,this._stateSetters.setDepthWrite),this._depthWriteInvalid=!1}_setColorWrite(e){this._colorWrite=this._setSubState(e,this._colorWrite,this._colorWriteInvalid,this._stateSetters.setColorWrite),this._colorWriteInvalid=!1}_setStencilWrite(e){this._stencilWrite=this._setSubState(e,this._stencilWrite,this._stencilWriteInvalid,this._stateSetters.setStencilWrite),this._stencilTestInvalid=!1}_setDrawBuffers(e){this._drawBuffers=this._setSubState(e,this._drawBuffers,this._drawBuffersInvalid,this._stateSetters.setDrawBuffers),this._drawBuffersInvalid=!1}_setSubState(e,t,r,n){return(r||e!==t)&&(n(e),this._pipelineInvalid=!0),e}}}}]);
//# sourceMappingURL=9082.569adb69.js.map