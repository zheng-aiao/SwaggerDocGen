/**
 * @license
 * Cesium - https://github.com/CesiumGS/cesium
 * Version 1.0.4
 *
 * Copyright 2011-2022 Cesium Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Columbus View (Pat. Pend.)
 *
 * Portions licensed separately.
 * See https://github.com/CesiumGS/cesium/blob/main/LICENSE.md for full licensing details.
 */

import{a as l}from"./chunk-HINRUCHR.js";import"./chunk-XUVFCWRC.js";import"./chunk-GS5MQIM2.js";import"./chunk-KPHXBVNQ.js";import"./chunk-EJGAHDBO.js";import"./chunk-QK4S52ME.js";import"./chunk-6QIB6X63.js";import{a as m}from"./chunk-OS2JEWTD.js";import"./chunk-YGQTJSBB.js";import"./chunk-H2GAE23K.js";import"./chunk-GJ6MI4GY.js";import"./chunk-LBWT7GP4.js";import"./chunk-YWSCEX7H.js";import"./chunk-OHJDMQDO.js";import"./chunk-FR6W4X2M.js";import"./chunk-CFEGJ2EM.js";import{a,d as s}from"./chunk-4EGMNBGB.js";import"./chunk-BBOYJW7U.js";import"./chunk-TC56M7J7.js";import"./chunk-SPP3RY3V.js";import{a as c}from"./chunk-BS26AHZI.js";import{b as p}from"./chunk-67B4J3O5.js";import{e as d}from"./chunk-WSSWYQPU.js";function n(e){e=c(e,c.EMPTY_OBJECT);let r=e.radius;p.typeOf.number("radius",r);let o={center:e.center,semiMajorAxis:r,semiMinorAxis:r,ellipsoid:e.ellipsoid,height:e.height,extrudedHeight:e.extrudedHeight,granularity:e.granularity,vertexFormat:e.vertexFormat,stRotation:e.stRotation,shadowVolume:e.shadowVolume};this._ellipseGeometry=new l(o),this._workerName="createCircleGeometry"}n.packedLength=l.packedLength;n.pack=function(e,r,o){return p.typeOf.object("value",e),l.pack(e._ellipseGeometry,r,o)};var f=new l({center:new a,semiMajorAxis:1,semiMinorAxis:1}),t={center:new a,radius:void 0,ellipsoid:s.clone(s.default),height:void 0,extrudedHeight:void 0,granularity:void 0,vertexFormat:new m,stRotation:void 0,semiMajorAxis:void 0,semiMinorAxis:void 0,shadowVolume:void 0};n.unpack=function(e,r,o){let i=l.unpack(e,r,f);return t.center=a.clone(i._center,t.center),t.ellipsoid=s.clone(i._ellipsoid,t.ellipsoid),t.ellipsoid=s.clone(i._ellipsoid,f._ellipsoid),t.height=i._height,t.extrudedHeight=i._extrudedHeight,t.granularity=i._granularity,t.vertexFormat=m.clone(i._vertexFormat,t.vertexFormat),t.stRotation=i._stRotation,t.shadowVolume=i._shadowVolume,d(o)?(t.semiMajorAxis=i._semiMajorAxis,t.semiMinorAxis=i._semiMinorAxis,o._ellipseGeometry=new l(t),o):(t.radius=i._semiMajorAxis,new n(t))};n.createGeometry=function(e){return l.createGeometry(e._ellipseGeometry)};n.createShadowVolume=function(e,r,o){let i=e._ellipseGeometry._granularity,u=e._ellipseGeometry._ellipsoid,h=r(i,u),x=o(i,u);return new n({center:e._ellipseGeometry._center,radius:e._ellipseGeometry._semiMajorAxis,ellipsoid:u,stRotation:e._ellipseGeometry._stRotation,granularity:i,extrudedHeight:h,height:x,vertexFormat:m.POSITION_ONLY,shadowVolume:!0})};Object.defineProperties(n.prototype,{rectangle:{get:function(){return this._ellipseGeometry.rectangle}},textureCoordinateRotationPoints:{get:function(){return this._ellipseGeometry.textureCoordinateRotationPoints}}});var _=n;function g(e,r){return d(r)&&(e=_.unpack(e,r)),e._ellipseGeometry._center=a.clone(e._ellipseGeometry._center),e._ellipseGeometry._ellipsoid=s.clone(e._ellipseGeometry._ellipsoid),_.createGeometry(e)}var H=g;export{H as default};
