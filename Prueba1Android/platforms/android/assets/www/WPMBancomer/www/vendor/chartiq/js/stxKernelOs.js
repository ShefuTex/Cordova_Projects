/* File generated on Fri Apr 15 2016 11:56:19 GMT-0400 (EDT) */
/* Version 2016-04-12 */
/* Expires on 2016/05/15 */
/*
Copyright 2014-2015-2016 ChartIQ LLC
*/

(function(){
	var trialExpiration =  "2099/05/15";
	if (trialExpiration != "undefined") {
		var expiration = new Date(trialExpiration);
		var now = new Date();
		if (now.getTime() > expiration.getTime()) {
			alert("This license has expired!");
			console.log("This license has expired!");
		} else {
			var diffDays = (expiration.getTime() - now.getTime());
			diffDays = Math.round(Math.abs(diffDays/(1000*60*60*24)));
			if ( diffDays < 3) {
				alert("This license expires in " + diffDays + " days!");
				console.log("This license expires in " + diffDays + " days!");
			}
		}
	}
	var version=["Version 2016-04-12"];
	if(version.length>0 && window.STXChart && STXChart.version.length>0){
		if(version[0]!=STXChart.version[0])
		console.log("Mismatched kernel version stxChart:" + STXChart.version[0] + " stxKernel:" + version[0]);
	}

	var domains=[/*<domains>*/];
	if(domains.length){
		var href=document.location.href;
		var foundOne=false;
		for(var i=0;i<domains.length;i++){
			var domain=domains[i];
			if(href.indexOf(domain)!=-1){
				foundOne=true;
			}
		}
		if(!foundOne){
			console.log("!!!! Not licensed for domain " + document.location.href);
		}
	}
})();
var Q9U={'H5A':function(r5A,h5A){return r5A*h5A;}
,'f7K':function(B7K,U9K){return B7K==U9K;}
,'k8D':function(W8D,g8D){return W8D-g8D;}
,'m7K':function(y7K,T7K){return y7K>T7K;}
,'I1W':function(F1W,H1W){return F1W>H1W;}
,'q5A':function(A5A,X5A){return A5A*X5A;}
,'X5R':function(m5R,y5R){return m5R<y5R;}
,'Y1h':function(G1h,t1h){return G1h==t1h;}
,'C8C':function(D8C,k8C){return D8C>k8C;}
,'r8J':function(h8J,q8J){return h8J==q8J;}
,'w3h':function(v3h,n3h){return v3h-n3h;}
,'o2W':function(Y2W,G2W){return Y2W>=G2W;}
,'a1J':function(Q1J,z1J){return Q1J/z1J;}
,'o8D':function(Y8D,G8D){return Y8D-G8D;}
,'N5W':function(i5W,p5W){return i5W!==p5W;}
,'B3':function(U4,j4){return U4-j4;}
,'h1m':function(q1m,A1m){return q1m<A1m;}
,'Y9h':function(G9h,t9h){return G9h>=t9h;}
,'g0C':function(w0C,v0C){return w0C!=v0C;}
,'h9D':function(q9D,A9D){return q9D>A9D;}
,'u0D':function(s0D,P0D){return s0D!=P0D;}
,'r7A':function(h7A,q7A){return h7A<q7A;}
,'Y9D':function(G9D,t9D,x9D,V9D){return G9D-t9D+x9D-V9D;}
,'N1R':function(i1R,p1R){return i1R===p1R;}
,'n5m':function(e5m,M5m){return e5m-M5m;}
,'f7c':function(B7c,U9c){return B7c/U9c;}
,'D9m':function(k9m,W9m){return k9m-W9m;}
,'X0c':function(m0c,y0c){return m0c*y0c;}
,'c3m':function(J3m,f3m){return J3m===f3m;}
,'I1':function(F1,H1){return F1==H1;}
,'e7n':function(M7n,Z7n){return M7n===Z7n;}
,'M9h':function(Z9h,E9h){return Z9h<E9h;}
,'n9':function(e9,M9){return e9==M9;}
,'Y9W':function(G9W,t9W){return G9W!==t9W;}
,'d7J':function(c7J,J7J){return c7J in J7J;}
,'d7K':function(c7K,J7K){return c7K==J7K;}
,'M8C':function(Z8C,E8C){return Z8C===E8C;}
,'C5c':function(D5c,k5c){return D5c/k5c;}
,'M4K':function(Z4K,E4K){return Z4K<E4K;}
,'X5h':function(m5h,y5h){return m5h-y5h;}
,'n4D':function(e4D,M4D,Z4D){return e4D-M4D+Z4D;}
,'V9':function(O9,K9){return O9!=K9;}
,'U2h':function(j2h,l2h){return j2h-l2h;}
,'m8C':function(y8C,T8C){return y8C>T8C;}
,'S4A':function(o4A,Y4A){return o4A*Y4A;}
,'o1A':function(Y1A,G1A){return Y1A<G1A;}
,'q9h':function(A9h,X9h,m9h){return A9h-X9h+m9h;}
,'C2p':16,'X3R':function(m3R,y3R){return m3R===y3R;}
,'x6K':function(V6K,O6K){return V6K*O6K;}
,'A7A':function(X7A,m7A){return X7A<m7A;}
,'j9K':function(l9K,S9K){return l9K!==S9K;}
,'e7':function(M7,Z7){return M7<Z7;}
,'L0A':function(C0A,D0A){return C0A>=D0A;}
,'K3':function(R3,L3){return R3-L3;}
,'B2D':function(U1D,j1D){return U1D/j1D;}
,'f8R':function(B8R,U6R){return B8R<U6R;}
,'W7J':function(g7J,w7J){return g7J*w7J;}
,'d5J':function(c5J,J5J){return c5J/J5J;}
,'H4':function(r4,h4){return r4<h4;}
,'L5D':function(C5D,D5D){return C5D<=D5D;}
,'W4':function(g4,w4){return g4==w4;}
,'s3c':function(P3c,N3c){return P3c<N3c;}
,'z4J':function(I4J,F4J){return I4J>F4J;}
,'n9A':function(e9A,M9A){return e9A==M9A;}
,'u9W':function(s9W,P9W){return s9W-P9W;}
,'J4R':function(f4R,B4R){return f4R>B4R;}
,'Z4R':function(E4R,u4R){return E4R<u4R;}
,'M8R':function(Z8R,E8R){return Z8R>E8R;}
,'K5C':function(R5C,L5C){return R5C-L5C;}
,'h3C':function(q3C,A3C){return q3C==A3C;}
,'K7K':function(R7K,L7K){return R7K==L7K;}
,'d6W':function(c6W,J6W){return c6W>J6W;}
,'T5R':function(d5R,c5R){return d5R<c5R;}
,'q4m':function(A4m,X4m){return A4m-X4m;}
,'v5J':function(n5J,e5J){return n5J<e5J;}
,'D8K':function(k8K,W8K){return k8K>=W8K;}
,'x4W':function(V4W,O4W){return V4W-O4W;}
,'N3h':function(i3h,p3h){return i3h<=p3h;}
,'O0m':function(K0m,R0m){return K0m/R0m;}
,'D8J':function(k8J,W8J){return k8J<W8J;}
,'s2R':function(P2R,N2R){return P2R==N2R;}
,'X9J':function(m9J,y9J){return m9J<y9J;}
,'V2R':function(O2R,K2R){return O2R<K2R;}
,'x6J':function(V6J,O6J){return V6J==O6J;}
,'c7R':function(J7R,f7R){return J7R*f7R;}
,'m3h':function(y3h,T3h){return y3h>T3h;}
,'t0J':function(x0J,V0J){return x0J-V0J;}
,'Y6W':function(G6W,t6W){return G6W!=t6W;}
,'v1D':function(n1D,e1D){return n1D==e1D;}
,'k9J':function(W9J,g9J){return W9J==g9J;}
,'V4C':function(O4C,K4C){return O4C==K4C;}
,'n7R':function(e7R,M7R){return e7R!=M7R;}
,'s5K':function(P5K,N5K){return P5K==N5K;}
,'m8':function(y8,T8){return y8==T8;}
,'W6m':function(g6m,w6m){return g6m==w6m;}
,'U7C':function(j7C,l7C){return j7C>l7C;}
,'I3J':function(F3J,H3J){return F3J-H3J;}
,'L6C':function(C6C,D6C){return C6C!=D6C;}
,'z2m':function(I2m,F2m){return I2m==F2m;}
,'m6W':function(y6W,T6W){return y6W!=T6W;}
,'Z9A':function(E9A,u9A){return E9A<u9A;}
,'j0K':function(l0K,S0K){return l0K/S0K;}
,'P5D':function(N5D,i5D){return N5D>i5D;}
,'K6K':function(R6K,L6K){return R6K-L6K;}
,'b6J':function(a6J,Q6J){return a6J>=Q6J;}
,'V3m':function(O3m,K3m){return O3m<K3m;}
,'a0R':function(Q0R,z0R){return Q0R==z0R;}
,'n8K':function(e8K,M8K){return e8K>=M8K;}
,'G0C':function(t0C,x0C){return t0C<x0C;}
,'d1D':function(c1D,J1D){return c1D*J1D;}
,'O1c':function(K1c,R1c){return K1c-R1c;}
,'E5D':function(u5D,s5D){return u5D<s5D;}
,'r2R':function(h2R,q2R){return h2R/q2R;}
,'q9R':function(A9R,X9R){return A9R/X9R;}
,'b6K':function(a6K,Q6K){return a6K*Q6K;}
,'e4h':function(M4h,Z4h){return M4h==Z4h;}
,'d6m':function(c6m,J6m){return c6m>J6m;}
,'S5K':function(o5K,Y5K){return o5K-Y5K;}
,'a8J':function(Q8J,z8J){return Q8J==z8J;}
,'I7h':function(F7h,H7h){return F7h/H7h;}
,'Q6c':function(z6c,I6c){return z6c>=I6c;}
,'S4C':function(o4C,Y4C){return o4C==Y4C;}
,'c0R':function(J0R,f0R){return J0R-f0R;}
,'U3K':function(j3K,l3K){return j3K==l3K;}
,'B6A':function(U2A,j2A){return U2A<j2A;}
,'F7':function(H7,r7){return H7==r7;}
,'Z2h':function(E2h,u2h){return E2h<u2h;}
,'P1K':function(N1K,i1K){return N1K==i1K;}
,'L3C':function(C3C,D3C){return C3C==D3C;}
,'z6m':function(I6m,F6m){return I6m/F6m;}
,'t9J':function(x9J,V9J){return x9J==V9J;}
,'h9J':function(q9J,A9J){return q9J!=A9J;}
,'m1D':function(y1D,T1D){return y1D!==T1D;}
,'y7h':function(T7h,d7h){return T7h<d7h;}
,'n9m':function(e9m,M9m){return e9m-M9m;}
,'q4J':function(A4J,X4J){return A4J<=X4J;}
,'t6R':function(x6R,V6R){return x6R>=V6R;}
,'K1h':function(R1h,L1h){return R1h===L1h;}
,'q6W':function(A6W,X6W){return A6W<X6W;}
,'m6D':function(y6D,T6D){return y6D-T6D;}
,'a0h':function(Q0h,z0h){return Q0h>z0h;}
,'m5C':function(y5C,T5C){return y5C/T5C;}
,'S5':function(o5,Y5){return o5==Y5;}
,'h1c':function(q1c,A1c){return q1c-A1c;}
,'H2K':function(r2K,h2K){return r2K==h2K;}
,'v0D':function(n0D,e0D){return n0D>=e0D;}
,'D3W':function(k3W,W3W){return k3W!==W3W;}
,'Z9':function(E9,u9){return E9==u9;}
,'A3m':function(X3m,m3m){return X3m===m3m;}
,'I3':function(F3,H3){return F3/H3;}
,'d2A':function(c2A,J2A){return c2A<J2A;}
,'q1C':function(A1C,X1C){return A1C<X1C;}
,'p0K':function(b0K,a0K){return b0K/a0K;}
,'r8K':function(h8K,q8K){return h8K-q8K;}
,'S4c':function(o4c,Y4c){return o4c-Y4c;}
,'G6A':function(t6A,x6A){return t6A!==x6A;}
,'r4R':function(h4R,q4R){return h4R*q4R;}
,'F6c':function(H6c,r6c){return H6c<=r6c;}
,'b5W':function(a5W,Q5W,z5W){return a5W-Q5W+z5W;}
,'s1':function(P1,N1){return P1/N1;}
,'I4R':function(F4R,H4R){return F4R<H4R;}
,'X4A':function(m4A,y4A){return m4A==y4A;}
,'f2m':function(B2m,U1m){return B2m===U1m;}
,'j1c':function(l1c,S1c){return l1c>S1c;}
,'a0':function(Q0,z0){return Q0*z0;}
,'b4W':function(a4W,Q4W){return a4W==Q4W;}
,'S7W':function(o7W,Y7W){return o7W>Y7W;}
,'y3W':function(T3W,d3W){return T3W-d3W;}
,'k3R':function(W3R,g3R){return W3R/g3R;}
,'N9W':function(i9W,p9W){return i9W/p9W;}
,'r0R':function(h0R,q0R){return h0R<q0R;}
,'t7h':function(x7h,V7h){return x7h-V7h;}
,'t2W':function(x2W,V2W){return x2W<V2W;}
,'H3h':function(r3h,h3h){return r3h/h3h;}
,'a2C':function(Q2C,z2C){return Q2C-z2C;}
,'b8C':function(a8C,Q8C){return a8C/Q8C;}
,'Q6':function(z6,I6){return z6<I6;}
,'T6':function(d6,c6){return d6==c6;}
,'U3D':function(j3D,l3D){return j3D<=l3D;}
,'u4m':function(s4m,P4m){return s4m<P4m;}
,'w3C':function(v3C,n3C){return v3C==n3C;}
,'j6c':function(l6c,S6c){return l6c!==S6c;}
,'g7A':function(w7A,v7A){return w7A>=v7A;}
,'L6R':function(C6R,D6R){return C6R===D6R;}
,'q8R':function(A8R,X8R){return A8R*X8R;}
,'C9R':function(D9R,k9R){return D9R/k9R;}
,'u5J':function(s5J,P5J){return s5J>=P5J;}
,'t0K':function(x0K,V0K){return x0K*V0K;}
,'n3A':function(e3A,M3A){return e3A*M3A;}
,'g0':function(w0,v0){return w0<=v0;}
,'D5':function(k5,W5){return k5==W5;}
,'P8D':function(N8D,i8D){return N8D>i8D;}
,'O7h':function(K7h,R7h){return K7h-R7h;}
,'R5m':function(L5m,C5m){return L5m==C5m;}
,'t9K':function(x9K,V9K){return x9K!=V9K;}
,'Y6J':function(G6J,t6J){return G6J-t6J;}
,'a2R':function(Q2R,z2R){return Q2R-z2R;}
,'a2D':function(Q2D,z2D){return Q2D!==z2D;}
,'X3c':function(m3c,y3c){return m3c/y3c;}
,'c1J':function(J1J,f1J){return J1J<f1J;}
,'Y1C':function(G1C,t1C){return G1C==t1C;}
,'D4C':function(k4C,W4C){return k4C<W4C;}
,'L1A':function(C1A,D1A){return C1A!=D1A;}
,'u8R':function(s8R,P8R){return s8R<P8R;}
,'V7W':function(O7W,K7W){return O7W in K7W;}
,'G8':function(t8,x8){return t8*x8;}
,'g4D':function(w4D,v4D){return w4D-v4D;}
,'O0K':function(K0K,R0K){return K0K-R0K;}
,'G7W':function(t7W,x7W){return t7W==x7W;}
,'G4A':function(t4A,x4A){return t4A*x4A;}
,'x6W':function(V6W,O6W){return V6W*O6W;}
,'s9n':function(P9n,N9n){return P9n<N9n;}
,'z8h':function(I8h,F8h){return I8h==F8h;}
,'y8K':function(T8K,d8K){return T8K<d8K;}
,'a2h':function(Q2h,z2h){return Q2h>z2h;}
,'l9h':function(S9h,o9h){return S9h===o9h;}
,'s8m':function(P8m,N8m){return P8m==N8m;}
,'H1A':function(r1A,h1A,q1A){return r1A-h1A+q1A;}
,'r0':function(h0,q0){return h0<q0;}
,'d1h':function(c1h,J1h){return c1h>=J1h;}
,'N7K':function(i7K,p7K){return i7K<p7K;}
,'V6A':function(O6A,K6A){return O6A!==K6A;}
,'x8h':function(V8h,O8h){return V8h!==O8h;}
,'S2C':function(o2C,Y2C){return o2C<Y2C;}
,'n8W':function(e8W,M8W){return e8W*M8W;}
,'B9n':function(U3n,j3n){return U3n>j3n;}
,'u9h':function(s9h,P9h){return s9h<P9h;}
,'z2c':function(I2c,F2c){return I2c<=F2c;}
,'L5R':function(C5R,D5R){return C5R-D5R;}
,'w6R':function(v6R,n6R){return v6R!==n6R;}
,'S9A':function(o9A,Y9A){return o9A<Y9A;}
,'g6A':function(w6A,v6A){return w6A>=v6A;}
,'X1K':function(m1K,y1K){return m1K<y1K;}
,'W3n':function(g3n,w3n){return g3n>w3n;}
,'k5D':function(W5D,g5D){return W5D*g5D;}
,'F7m':function(H7m,r7m){return H7m==r7m;}
,'f4A':function(B4A,U0A){return B4A===U0A;}
,'y6K':function(T6K,d6K){return T6K>d6K;}
,'U9n':function(j9n,l9n){return j9n<=l9n;}
,'i1':function(p1,b1){return p1==b1;}
,'l7K':function(S7K,o7K){return S7K-o7K;}
,'R4c':function(L4c,C4c){return L4c-C4c;}
,'Y4K':function(G4K,t4K){return G4K<t4K;}
,'A6K':function(X6K,m6K){return X6K*m6K;}
,'x3':function(V3,O3){return V3>O3;}
,'g3A':function(w3A,v3A){return w3A===v3A;}
,'F4h':function(H4h,r4h){return H4h-r4h;}
,'S8W':function(o8W,Y8W){return o8W<Y8W;}
,'L3R':function(C3R,D3R){return C3R-D3R;}
,'x8C':function(V8C,O8C){return V8C===O8C;}
,'Y0D':function(G0D,t0D){return G0D/t0D;}
,'J3R':function(f3R,B3R){return f3R/B3R;}
,'I5m':function(F5m,H5m){return F5m-H5m;}
,'J6h':function(f6h,B6h){return f6h==B6h;}
,'R4A':function(L4A,C4A){return L4A>C4A;}
,'h2W':function(q2W,A2W){return q2W==A2W;}
,'m2m':function(y2m,T2m){return y2m===T2m;}
,'v4K':function(n4K,e4K){return n4K<e4K;}
,'e6C':function(M6C,Z6C){return M6C!=Z6C;}
,'j0c':function(l0c,S0c){return l0c==S0c;}
,'z7K':function(I7K,F7K){return I7K<F7K;}
,'x1R':function(V1R,O1R){return V1R*O1R;}
,'V2C':function(O2C,K2C){return O2C*K2C;}
,'u5C':function(s5C,P5C){return s5C/P5C;}
,'v3D':function(n3D,e3D){return n3D==e3D;}
,'v5C':function(n5C,e5C){return n5C===e5C;}
,'T5h':function(d5h,c5h){return d5h-c5h;}
,'a5K':function(Q5K,z5K){return Q5K!=z5K;}
,'T7n':function(d7n,c7n){return d7n>c7n;}
,'b4J':function(a4J,Q4J){return a4J*Q4J;}
,'U5':function(j5,l5){return j5-l5;}
,'t7D':function(x7D,V7D){return x7D==V7D;}
,'c7h':function(J7h,f7h){return J7h-f7h;}
,'y6A':function(T6A,d6A){return T6A==d6A;}
,'e8A':function(M8A,Z8A){return M8A*Z8A;}
,'R7R':function(L7R,C7R){return L7R===C7R;}
,'O9J':function(K9J,R9J){return K9J==R9J;}
,'b2m':function(a2m,Q2m){return a2m==Q2m;}
,'I9n':function(F9n,H9n){return F9n==H9n;}
,'B8D':function(U6D,j6D){return U6D<=j6D;}
,'o3C':function(Y3C,G3C){return Y3C<G3C;}
,'t3C':function(x3C,V3C){return x3C<V3C;}
,'o0m':function(Y0m,G0m){return Y0m>G0m;}
,'n5K':function(e5K,M5K){return e5K/M5K;}
,'k2W':function(W2W,g2W){return W2W<g2W;}
,'T0W':function(d0W,c0W){return d0W-c0W;}
,'g5K':function(w5K,v5K){return w5K<=v5K;}
,'a6A':function(Q6A,z6A){return Q6A===z6A;}
,'F9c':function(H9c,r9c){return H9c-r9c;}
,'j0A':function(l0A,S0A){return l0A==S0A;}
,'E4D':function(u4D,s4D){return u4D==s4D;}
,'N2K':function(i2K,p2K){return i2K<p2K;}
,'c5':function(J5,f5){return J5*f5;}
,'k1A':function(W1A,g1A){return W1A===g1A;}
,'n4c':function(e4c,M4c){return e4c>=M4c;}
,'z6K':function(I6K,F6K,H6K){return I6K*F6K/H6K;}
,'g4C':function(w4C,v4C){return w4C<v4C;}
,'b9h':function(a9h,Q9h){return a9h<Q9h;}
,'s3J':function(P3J,N3J){return P3J-N3J;}
,'d8h':function(c8h,J8h){return c8h*J8h;}
,'Q4A':function(z4A,I4A){return z4A-I4A;}
,'f6m':function(B6m,U2m){return B6m!==U2m;}
,'o1K':function(Y1K,G1K){return Y1K==G1K;}
,'j4D':function(l4D,S4D,o4D){return l4D-S4D+o4D;}
,'c8m':function(J8m,f8m){return J8m<f8m;}
,'i8J':function(p8J,b8J){return p8J<b8J;}
,'K3n':function(R3n,L3n){return R3n>=L3n;}
,'U4A':function(j4A,l4A){return j4A==l4A;}
,'u1C':function(s1C,P1C){return s1C==P1C;}
,'C1h':function(D1h,k1h){return D1h==k1h;}
,'z7c':function(I7c,F7c){return I7c===F7c;}
,'V0h':function(O0h,K0h){return O0h-K0h;}
,'J9D':function(f9D,B9D){return f9D<B9D;}
,'e3C':function(M3C,Z3C){return M3C<Z3C;}
,'C1C':function(D1C,k1C){return D1C<k1C;}
,'y7W':function(T7W,d7W){return T7W!==d7W;}
,'h9K':function(q9K,A9K){return q9K==A9K;}
,'k0J':function(W0J,g0J){return W0J-g0J;}
,'Q6R':function(z6R,I6R){return z6R>I6R;}
,'n8':function(e8,M8,Z8,E8){return e8*M8*Z8*E8;}
,'e3R':function(M3R,Z3R){return M3R<Z3R;}
,'x4J':function(V4J,O4J){return V4J!==O4J;}
,'S8':function(o8,Y8){return o8>Y8;}
,'J9c':function(f9c,B9c){return f9c==B9c;}
,'M0n':2,'E2J':function(u2J,s2J){return u2J*s2J;}
,'Z7W':function(E7W,u7W){return E7W<u7W;}
,'Z0h':function(E0h,u0h){return E0h===u0h;}
,'M6W':function(Z6W,E6W){return Z6W>=E6W;}
,'E5h':function(u5h,s5h){return u5h<s5h;}
,'U8':function(j8,l8){return j8*l8;}
,'V5':function(O5,K5){return O5>=K5;}
,'a0C':function(Q0C,z0C){return Q0C>=z0C;}
,'A4C':function(X4C,m4C,y4C){return X4C-m4C-y4C;}
,'t5h':function(x5h,V5h){return x5h<V5h;}
,'r5K':function(h5K,q5K){return h5K<q5K;}
,'O5R':function(K5R,R5R){return K5R==R5R;}
,'r0C':function(h0C,q0C){return h0C>=q0C;}
,'i8m':function(p8m,b8m){return p8m==b8m;}
,'D4c':function(k4c,W4c){return k4c-W4c;}
,'v2A':function(n2A,e2A){return n2A===e2A;}
,'z0D':function(I0D,F0D){return I0D*F0D;}
,'R8c':function(L8c,C8c){return L8c<=C8c;}
,'N1h':function(i1h,p1h){return i1h*p1h;}
,'z9h':function(I9h,F9h){return I9h>=F9h;}
,'n1W':function(e1W,M1W){return e1W|M1W;}
,'T9J':function(d9J,c9J){return d9J-c9J;}
,'T7m':function(d7m,c7m){return d7m===c7m;}
,'j1K':function(l1K,S1K){return l1K<S1K;}
,'X7m':function(m7m,y7m){return m7m===y7m;}
,'L6c':function(C6c,D6c){return C6c*D6c;}
,'V7C':function(O7C,K7C){return O7C>K7C;}
,'e5R':function(M5R,Z5R){return M5R*Z5R;}
,'Z3W':function(E3W,u3W){return E3W<=u3W;}
,'n7A':function(e7A,M7A){return e7A/M7A;}
,'d5c':function(c5c,J5c){return c5c>=J5c;}
,'Y7R':function(G7R,t7R,x7R){return G7R-t7R+x7R;}
,'M9R':function(Z9R,E9R){return Z9R/E9R;}
,'e7D':function(M7D,Z7D){return M7D>=Z7D;}
,'O7m':function(K7m,R7m){return K7m==R7m;}
,'A3W':function(X3W,m3W){return X3W*m3W;}
,'j4h':function(l4h,S4h){return l4h>S4h;}
,'X5W':function(m5W,y5W){return m5W<y5W;}
,'p9D':function(b9D,a9D){return b9D<a9D;}
,'m7c':function(y7c,T7c){return y7c<T7c;}
,'Z4c':function(E4c,u4c){return E4c-u4c;}
,'D7A':function(k7A,W7A){return k7A-W7A;}
,'R7C':function(L7C,C7C){return L7C-C7C;}
,'d4K':function(c4K,J4K){return c4K/J4K;}
,'Q6h':function(z6h,I6h){return z6h-I6h;}
,'R1W':function(L1W,C1W){return L1W|C1W;}
,'k9D':function(W9D,g9D){return W9D>g9D;}
,'z5J':function(I5J,F5J){return I5J/F5J;}
,'q2A':function(A2A,X2A){return A2A>=X2A;}
,'g2D':function(w2D,v2D){return w2D<=v2D;}
,'M5C':function(Z5C,E5C){return Z5C/E5C;}
,'M4m':function(Z4m,E4m){return Z4m<E4m;}
,'D0R':function(k0R,W0R){return k0R-W0R;}
,'M2c':function(Z2c,E2c){return Z2c>=E2c;}
,'V7c':function(O7c,K7c){return O7c===K7c;}
,'D0C':function(k0C,W0C){return k0C!=W0C;}
,'e0A':function(M0A,Z0A){return M0A===Z0A;}
,'v6J':function(n6J,e6J){return n6J==e6J;}
,'M2K':function(Z2K,E2K){return Z2K==E2K;}
,'t5D':function(x5D,V5D){return x5D===V5D;}
,'c3J':function(J3J,f3J){return J3J-f3J;}
,'Y2A':function(G2A,t2A){return G2A===t2A;}
,'L6':function(C6,D6){return C6==D6;}
,'v5A':function(n5A,e5A){return n5A/e5A;}
,'r3c':function(h3c,q3c,A3c){return h3c-q3c+A3c;}
,'U8J':function(j8J,l8J){return j8J==l8J;}
,'a7R':function(Q7R,z7R){return Q7R-z7R;}
,'x9W':function(V9W,O9W){return V9W!==O9W;}
,'P7':function(N7,i7){return N7<i7;}
,'O6R':function(K6R,R6R){return K6R<R6R;}
,'G4c':function(t4c,x4c){return t4c/x4c;}
,'w0W':function(v0W,n0W){return v0W<n0W;}
,'k0W':function(W0W,g0W){return W0W>g0W;}
,'T1c':function(d1c,c1c){return d1c<=c1c;}
,'J9A':function(f9A,B9A){return f9A<B9A;}
,'a7D':function(Q7D,z7D){return Q7D in z7D;}
,'M6m':function(Z6m,E6m){return Z6m*E6m;}
,'R3m':function(L3m,C3m){return L3m<C3m;}
,'B7h':function(U9h,j9h){return U9h/j9h;}
,'r4C':function(h4C,q4C){return h4C!=q4C;}
,'c8W':function(J8W,f8W){return J8W<f8W;}
,'J6c':function(f6c,B6c){return f6c!=B6c;}
,'K9R':function(R9R,L9R){return R9R>L9R;}
,'o5D':function(Y5D,G5D){return Y5D/G5D;}
,'J0W':function(f0W,B0W){return f0W/B0W;}
,'q8h':function(A8h,X8h){return A8h==X8h;}
,'y0h':function(T0h,d0h){return T0h<d0h;}
,'R9m':function(L9m,C9m){return L9m==C9m;}
,'c3W':function(J3W,f3W){return J3W!==f3W;}
,'j6h':function(l6h,S6h){return l6h==S6h;}
,'g1J':function(w1J,v1J){return w1J===v1J;}
,'n5':function(e5,M5){return e5==M5;}
,'o2D':function(Y2D,G2D){return Y2D>G2D;}
,'Z7C':function(E7C,u7C){return E7C<u7C;}
,'U2C':function(j2C,l2C){return j2C-l2C;}
,'Y9C':function(G9C,t9C){return G9C/t9C;}
,'Z8W':function(E8W,u8W){return E8W in u8W;}
,'F4A':function(H4A,r4A){return H4A-r4A;}
,'Y9R':function(G9R,t9R){return G9R/t9R;}
,'v7h':function(n7h,e7h){return n7h*e7h;}
,'W9h':function(g9h,w9h){return g9h/w9h;}
,'x7K':function(V7K,O7K){return V7K==O7K;}
,'G2h':function(t2h,x2h){return t2h-x2h;}
,'p4h':function(b4h,a4h){return b4h==a4h;}
,'C2A':function(D2A,k2A){return D2A<k2A;}
,'d9R':function(c9R,J9R){return c9R<J9R;}
,'g9A':function(w9A,v9A){return w9A<v9A;}
,'m0A':function(y0A,T0A){return y0A!==T0A;}
,'Z7A':function(E7A,u7A){return E7A>u7A;}
,'L7n':function(C7n,D7n){return C7n==D7n;}
,'j5C':function(l5C,S5C){return l5C<S5C;}
,'A5':function(X5,m5){return X5-m5;}
,'B0h':function(U8h,j8h){return U8h*j8h;}
,'x9C':function(V9C,O9C){return V9C<O9C;}
,'H1h':function(r1h,h1h){return r1h>h1h;}
,'R2h':function(L2h,C2h){return L2h-C2h;}
,'h7m':function(q7m,A7m){return q7m===A7m;}
,'J9m':function(f9m,B9m){return f9m-B9m;}
,'K8C':function(R8C,L8C){return R8C===L8C;}
,'B9':function(U3,j3){return U3<=j3;}
,'h3A':function(q3A,A3A){return q3A<A3A;}
,'y3J':function(T3J,d3J){return T3J-d3J;}
,'K5J':function(R5J,L5J){return R5J/L5J;}
,'v1R':function(n1R,e1R){return n1R===e1R;}
,'e6':function(M6,Z6){return M6>Z6;}
,'e6h':function(M6h,Z6h){return M6h==Z6h;}
,'N5A':function(i5A,p5A){return i5A==p5A;}
,'N9C':function(i9C,p9C){return i9C<p9C;}
,'C2c':function(D2c,k2c){return D2c/k2c;}
,'W3':function(g3,w3,v3){return g3-w3+v3;}
,'L7':function(C7,D7){return C7<D7;}
,'F2':function(H2,h2){return H2>h2;}
,'U2':function(j2,l2){return j2==l2;}
,'b1C':function(a1C,Q1C){return a1C>Q1C;}
,'f0D':function(B0D,U8D){return B0D<U8D;}
,'C3D':function(D3D,k3D){return D3D==k3D;}
,'J5W':function(f5W,B5W){return f5W-B5W;}
,'T4A':function(d4A,c4A,J4A){return d4A-c4A+J4A;}
,'N8R':function(i8R,p8R){return i8R!==p8R;}
,'f9C':function(B9C,U3C){return B9C<U3C;}
,'f4K':function(B4K,U0K){return B4K-U0K;}
,'Y5W':function(G5W,t5W){return G5W>t5W;}
,'U0h':function(j0h,l0h){return j0h==l0h;}
,'o5R':function(Y5R,G5R){return Y5R>G5R;}
,'q6m':function(A6m,X6m){return A6m-X6m;}
,'M7K':function(Z7K,E7K){return Z7K<E7K;}
,'z7J':function(I7J,F7J){return I7J==F7J;}
,'S8K':function(o8K,Y8K){return o8K>=Y8K;}
,'T6h':function(d6h,c6h){return d6h-c6h;}
,'D7W':function(k7W,W7W){return k7W<W7W;}
,'T4C':function(d4C,c4C){return d4C-c4C;}
,'H7K':function(r7K,h7K){return r7K>h7K;}
,'i9A':function(p9A,b9A){return p9A<b9A;}
,'z1R':function(I1R,F1R){return I1R==F1R;}
,'y4R':function(T4R,d4R,c4R){return T4R-d4R-c4R;}
,'U9m':function(j9m,l9m){return j9m==l9m;}
,'P0J':function(N0J,i0J){return N0J-i0J;}
,'Z0C':function(E0C,u0C){return E0C<u0C;}
,'W1C':function(g1C,w1C){return g1C!==w1C;}
,'E0A':function(u0A,s0A){return u0A==s0A;}
,'w2W':function(v2W,n2W){return v2W<n2W;}
,'a9':function(Q9,z9){return Q9/z9;}
,'Y1':function(G1,V1){return G1==V1;}
,'I8J':function(F8J,H8J){return F8J==H8J;}
,'q1h':function(A1h,X1h){return A1h-X1h;}
,'N5c':function(i5c,p5c){return i5c*p5c;}
,'w5R':function(v5R,n5R){return v5R-n5R;}
,'n3K':function(e3K,M3K){return e3K*M3K;}
,'W5A':function(g5A,w5A){return g5A==w5A;}
,'j6':function(l6,S6){return l6-S6;}
,'E1m':function(u1m,s1m){return u1m-s1m;}
,'e6c':function(M6c,Z6c){return M6c<Z6c;}
,'S8J':function(o8J,Y8J){return o8J==Y8J;}
,'R3c':function(L3c,C3c){return L3c>=C3c;}
,'e5D':function(M5D,Z5D){return M5D===Z5D;}
,'B1A':function(U5A,j5A){return U5A==j5A;}
,'m1R':function(y1R,T1R){return y1R===T1R;}
,'u7J':function(s7J,P7J){return s7J in P7J;}
,'n8m':function(e8m,M8m){return e8m==M8m;}
,'d1C':function(c1C,J1C){return c1C>J1C;}
,'u2c':function(s2c,P2c){return s2c&P2c;}
,'B7R':function(U9R,j9R){return U9R/j9R;}
,'J1':function(f1,B1){return f1==B1;}
,'Q7':function(z7,I7){return z7<I7;}
,'Z5':function(E5,u5){return E5==u5;}
,'D5K':function(k5K,W5K){return k5K<=W5K;}
,'s1W':function(P1W,N1W){return P1W==N1W;}
,'p0m':function(b0m,a0m){return b0m-a0m;}
,'i4c':function(p4c,b4c,a4c,Q4c){return p4c-b4c+a4c-Q4c;}
,'D3m':function(k3m,W3m){return k3m===W3m;}
,'i0h':function(p0h,b0h){return p0h<b0h;}
,'d4J':function(c4J,J4J){return c4J<J4J;}
,'P7n':function(N7n,i7n){return N7n==i7n;}
,'J5R':function(f5R,B5R){return f5R==B5R;}
,'R8':function(L8,C8){return L8<C8;}
,'G3J':function(t3J,x3J){return t3J==x3J;}
,'E6C':function(u6C,s6C){return u6C/s6C;}
,'Y3n':function(G3n,t3n){return G3n<=t3n;}
,'S7c':function(o7c,Y7c){return o7c<Y7c;}
,'b1R':function(a1R,Q1R){return a1R===Q1R;}
,'O7n':function(K7n,R7n){return K7n===R7n;}
,'d4c':function(c4c,J4c){return c4c==J4c;}
,'h0m':function(q0m,A0m){return q0m!==A0m;}
,'O0A':function(K0A,R0A){return K0A-R0A;}
,'n8c':function(e8c,M8c){return e8c!=M8c;}
,'o5h':function(Y5h,G5h){return Y5h>G5h;}
,'C2m':function(D2m,k2m){return D2m<k2m;}
,'q7c':function(A7c,X7c){return A7c-X7c;}
,'g2R':function(w2R,v2R){return w2R<v2R;}
,'j2W':function(l2W,S2W){return l2W<S2W;}
,'t3R':function(x3R,V3R){return x3R/V3R;}
,'K7J':function(R7J,L7J){return R7J in L7J;}
,'B5K':function(U7J,j7J){return U7J/j7J;}
,'h6':function(q6,A6){return q6/A6;}
,'s7A':function(P7A,N7A){return P7A-N7A;}
,'L2W':function(C2W,D2W){return C2W>=D2W;}
,'E1K':function(u1K,s1K){return u1K-s1K;}
,'b2A':function(a2A,Q2A){return a2A==Q2A;}
,'s3K':function(P3K,N3K){return P3K-N3K;}
,'E7D':function(u7D,s7D,P7D,N7D){return u7D-s7D+P7D-N7D;}
,'I3c':function(F3c,H3c){return F3c*H3c;}
,'C6K':function(D6K,k6K){return D6K-k6K;}
,'F9A':function(H9A,r9A){return H9A/r9A;}
,'M4W':function(Z4W,E4W){return Z4W/E4W;}
,'O8D':function(K8D,R8D){return K8D<R8D;}
,'a3K':function(Q3K,z3K){return Q3K<z3K;}
,'h9c':function(q9c,A9c){return q9c>A9c;}
,'n1':function(e1,M1){return e1<M1;}
,'j6R':function(l6R,S6R){return l6R-S6R;}
,'O2W':function(K2W,R2W){return K2W<R2W;}
,'M4':function(Z4,E4){return Z4<E4;}
,'x5J':function(V5J,O5J){return V5J!==O5J;}
,'j0W':function(l0W,S0W){return l0W!=S0W;}
,'v7K':function(n7K,e7K){return n7K!==e7K;}
,'Y5A':function(G5A,t5A){return G5A==t5A;}
,'E4h':function(u4h,s4h){return u4h<s4h;}
,'y7C':function(T7C,d7C){return T7C>d7C;}
,'P9K':function(N9K,i9K){return N9K-i9K;}
,'T9K':function(d9K,c9K){return d9K===c9K;}
,'M5A':function(Z5A,E5A){return Z5A==E5A;}
,'B2R':function(U1R,j1R){return U1R/j1R;}
,'x4K':function(V4K,O4K){return V4K===O4K;}
,'i0C':function(p0C,b0C){return p0C<=b0C;}
,'F1c':function(H1c,r1c){return H1c/r1c;}
,'Z8K':function(E8K,u8K){return E8K<=u8K;}
,'i7h':function(p7h,b7h){return p7h/b7h;}
,'k5R':function(W5R,g5R){return W5R-g5R;}
,'X8A':function(m8A,y8A){return m8A>y8A;}
,'Z6A':function(E6A,u6A){return E6A==u6A;}
,'D3c':function(k3c,W3c){return k3c==W3c;}
,'z9R':function(I9R,F9R){return I9R/F9R;}
,'b1h':function(a1h,Q1h){return a1h>Q1h;}
,'U8c':function(j8c,l8c){return j8c<l8c;}
,'y3K':function(T3K,d3K){return T3K<d3K;}
,'s0C':function(P0C,N0C){return P0C>=N0C;}
,'Q0J':function(z0J,I0J){return z0J<I0J;}
,'Y7J':function(G7J,t7J){return G7J in t7J;}
,'Q5h':function(z5h,I5h){return z5h<I5h;}
,'l4K':function(S4K,o4K){return S4K>o4K;}
,'i7A':function(p7A,b7A){return p7A>b7A;}
,'G3K':function(t3K,x3K){return t3K<=x3K;}
,'Z5K':function(E5K,u5K){return E5K===u5K;}
,'y5m':function(T5m,d5m){return T5m===d5m;}
,'V0':function(O0,K0){return O0<K0;}
,'l5A':function(S5A,o5A){return S5A==o5A;}
,'N4':function(i4,p4){return i4>p4;}
,'T3C':function(d3C,c3C){return d3C-c3C;}
,'J2W':function(f2W,B2W){return f2W<B2W;}
,'Q9D':function(z9D,I9D){return z9D!=I9D;}
,'u4':function(s4,P4){return s4<P4;}
,'Q3A':function(z3A,I3A){return z3A>I3A;}
,'u2K':function(s2K,P2K){return s2K-P2K;}
,'k0A':function(W0A,g0A){return W0A-g0A;}
,'L2D':function(C2D,D2D,k2D,W2D){return C2D-D2D+k2D-W2D;}
,'s8J':function(P8J,N8J){return P8J-N8J;}
,'u6J':function(s6J,P6J){return s6J<P6J;}
,'T1K':function(d1K,c1K){return d1K-c1K;}
,'j0':function(l0,S0){return l0/S0;}
,'E7m':function(u7m,s7m){return u7m!=s7m;}
,'i4A':function(p4A,b4A,a4A){return p4A-b4A-a4A;}
,'j7':function(l7,S7){return l7==S7;}
,'z6J':function(I6J,F6J){return I6J==F6J;}
,'w5h':function(v5h,n5h){return v5h>=n5h;}
,'a3W':function(Q3W,z3W){return Q3W-z3W;}
,'W9R':function(g9R,w9R){return g9R==w9R;}
,'M6J':function(Z6J,E6J){return Z6J==E6J;}
,'m9C':function(y9C,T9C){return y9C<T9C;}
,'I9':function(F9,H9){return F9>H9;}
,'A7D':function(X7D,m7D){return X7D>m7D;}
,'m1h':function(y1h,T1h){return y1h!==T1h;}
,'z9W':function(I9W,F9W){return I9W==F9W;}
,'H8c':function(r8c,h8c){return r8c/h8c;}
,'c7A':function(J7A,f7A,B7A){return J7A-f7A-B7A;}
,'z8':function(I8,F8){return I8<F8;}
,'h9A':function(q9A,A9A){return q9A/A9A;}
,'e5h':function(M5h,Z5h){return M5h>=Z5h;}
,'Q0c':function(z0c,I0c){return z0c<I0c;}
,'Z2D':function(E2D,u2D){return E2D/u2D;}
,'G4R':function(t4R,x4R){return t4R===x4R;}
,'o0J':function(Y0J,G0J){return Y0J/G0J;}
,'H1D':function(r1D,h1D){return r1D<h1D;}
,'G5':function(t5,x5){return t5==x5;}
,'S7A':function(o7A,Y7A){return o7A-Y7A;}
,'n8J':function(e8J,M8J){return e8J-M8J;}
,'p7':function(b7,a7){return b7==a7;}
,'h5h':function(q5h,A5h){return q5h!==A5h;}
,'A1W':function(X1W,m1W){return X1W==m1W;}
,'E3R':function(u3R,s3R){return u3R<s3R;}
,'N1D':function(i1D,p1D){return i1D==p1D;}
,'v6D':function(n6D,e6D){return n6D*e6D;}
,'V3W':function(O3W,K3W){return O3W!==K3W;}
,'g8K':function(w8K,v8K){return w8K<=v8K;}
,'n1J':function(e1J,M1J){return e1J/M1J;}
,'a8K':function(Q8K,z8K){return Q8K==z8K;}
,'U3A':function(j3A,l3A){return j3A==l3A;}
,'B7W':function(U9W,j9W){return U9W!==j9W;}
,'d5C':function(c5C,J5C){return c5C-J5C;}
,'o3h':function(Y3h,G3h){return Y3h-G3h;}
,'w7n':function(v7n,n7n){return v7n<n7n;}
,'K4K':function(R4K,L4K){return R4K/L4K;}
,'j8D':function(l8D,S8D){return l8D<S8D;}
,'V9n':function(O9n,K9n){return O9n>K9n;}
,'U4C':function(j4C,l4C){return j4C==l4C;}
,'p1c':function(b1c,a1c){return b1c==a1c;}
,'q1R':function(A1R,X1R){return A1R<X1R;}
,'W0D':function(g0D,w0D){return g0D&w0D;}
,'N9R':function(i9R,p9R){return i9R>=p9R;}
,'r8m':function(h8m,q8m){return h8m/q8m;}
,'a7h':function(Q7h,z7h){return Q7h-z7h;}
,'h6c':function(q6c,A6c){return q6c-A6c;}
,'c9':function(J9,f9){return J9>=f9;}
,'E7n':function(u7n,s7n){return u7n<s7n;}
,'A3':function(X3,m3){return X3===m3;}
,'Y4W':function(G4W,t4W){return G4W-t4W;}
,'r6A':function(h6A,q6A){return h6A*q6A;}
,'N6D':function(i6D,p6D){return i6D<p6D;}
,'m6m':function(y6m,T6m){return y6m*T6m;}
,'A0C':function(X0C,m0C){return X0C<=m0C;}
,'J5h':function(f5h,B5h){return f5h<B5h;}
,'m5J':function(y5J,T5J){return y5J>=T5J;}
,'Y6m':function(G6m,t6m){return G6m-t6m;}
,'g0R':function(w0R,v0R){return w0R/v0R;}
,'C4W':function(D4W,k4W){return D4W-k4W;}
,'W4K':function(g4K,w4K){return g4K==w4K;}
,'B2C':function(U1C,j1C){return U1C<j1C;}
,'a8W':function(Q8W,z8W){return Q8W in z8W;}
,'w9c':function(v9c,n9c){return v9c>n9c;}
,'v5W':function(n5W,e5W){return n5W!=e5W;}
,'z4':function(I4,F4){return I4==F4;}
,'U2c':function(j2c,l2c){return j2c-l2c;}
,'Y8C':function(G8C,t8C){return G8C-t8C;}
,'e1A':function(M1A,Z1A){return M1A<=Z1A;}
,'Z3m':function(E3m,u3m){return E3m<u3m;}
,'k9c':function(W9c,g9c){return W9c==g9c;}
,'g3c':function(w3c,v3c){return w3c<=v3c;}
,'F8A':function(H8A,r8A){return H8A*r8A;}
,'z1A':function(I1A,F1A){return I1A/F1A;}
,'W2m':function(g2m,w2m){return g2m==w2m;}
,'q2':function(A2,X2){return A2==X2;}
,'E0c':function(u0c,s0c){return u0c>=s0c;}
,'K2':function(R2,L2){return R2==L2;}
,'z4K':function(I4K,F4K){return I4K/F4K;}
,'h4A':function(q4A,A4A){return q4A==A4A;}
,'a4C':function(Q4C,z4C){return Q4C===z4C;}
,'k6h':function(W6h,g6h){return W6h==g6h;}
,'Q2W':function(z2W,I2W){return z2W==I2W;}
,'J4C':function(f4C,B4C){return f4C!==B4C;}
,'g8J':function(w8J,v8J){return w8J<v8J;}
,'c2C':function(J2C,f2C){return J2C<f2C;}
,'R5K':function(L5K,C5K){return L5K<=C5K;}
,'K5c':function(R5c,L5c){return R5c/L5c;}
,'Q1m':function(z1m,I1m){return z1m==I1m;}
,'O4h':function(K4h,R4h){return K4h<R4h;}
,'u4W':function(s4W,P4W){return s4W==P4W;}
,'n2h':function(e2h,M2h){return e2h===M2h;}
,'O5D':function(K5D,R5D){return K5D===R5D;}
,'p2J':function(b2J,a2J){return b2J-a2J;}
,'H9R':function(r9R,h9R){return r9R<h9R;}
,'e0J':function(M0J,Z0J){return M0J/Z0J;}
,'W7K':function(g7K,w7K){return g7K-w7K;}
,'B2':function(U1,j1){return U1==j1;}
,'P5h':function(N5h,i5h){return N5h>=i5h;}
,'P7m':function(N7m,i7m){return N7m==i7m;}
,'c7W':function(J7W,f7W){return J7W==f7W;}
,'b6W':function(a6W,Q6W){return a6W<=Q6W;}
,'U3J':function(j3J,l3J){return j3J!==l3J;}
,'F5D':function(H5D,r5D){return H5D!=r5D;}
,'T9m':function(d9m,c9m){return d9m/c9m;}
,'R9n':function(L9n,C9n){return L9n>C9n;}
,'B7D':function(U9D,j9D){return U9D<=j9D;}
,'z8c':function(I8c,F8c){return I8c<=F8c;}
,'w6c':function(v6c,n6c){return v6c-n6c;}
,'J1c':function(f1c,B1c){return f1c>=B1c;}
,'i8c':function(p8c,b8c,a8c,Q8c){return p8c-b8c+a8c-Q8c;}
,'A3J':function(X3J,m3J){return X3J/m3J;}
,'S8m':function(o8m,Y8m){return o8m<Y8m;}
,'p5D':function(b5D,a5D){return b5D<=a5D;}
,'r0h':function(h0h,q0h){return h0h>q0h;}
,'G3A':function(t3A,x3A){return t3A<x3A;}
,'A0':function(X0,m0){return X0<m0;}
,'W5J':function(g5J,w5J){return g5J<w5J;}
,'T9D':function(d9D,c9D){return d9D===c9D;}
,'G9n':function(t9n,x9n){return t9n<x9n;}
,'k0c':function(W0c,g0c){return W0c&g0c;}
,'R0h':function(L0h,C0h){return L0h==C0h;}
,'U1J':function(j1J,l1J){return j1J<l1J;}
,'g9n':function(w9n,v9n){return w9n>v9n;}
,'q8C':function(A8C,X8C){return A8C/X8C;}
,'I3m':function(F3m,H3m){return F3m==H3m;}
,'Y4m':function(G4m,t4m){return G4m===t4m;}
,'u5A':function(s5A,P5A){return s5A/P5A;}
,'S6A':function(o6A,Y6A){return o6A/Y6A;}
,'u9C':function(s9C,P9C){return s9C===P9C;}
,'W1':function(g1,w1){return g1*w1;}
,'B3m':function(U4m,j4m){return U4m<j4m;}
,'X2W':function(m2W,y2W){return m2W==y2W;}
,'Z7R':function(E7R,u7R){return E7R/u7R;}
,'X7n':function(m7n,y7n){return m7n<=y7n;}
,'k3h':function(W3h,g3h){return W3h*g3h;}
,'L2J':function(C2J,D2J){return C2J!==D2J;}
,'X0m':function(m0m,y0m){return m0m-y0m;}
,'q3n':function(A3n,X3n){return A3n>=X3n;}
,'f1h':function(B1h,U5h){return B1h>=U5h;}
,'V8W':function(O8W,K8W){return O8W<K8W;}
,'A2C':function(X2C,m2C){return X2C!=m2C;}
,'m2A':function(y2A,T2A){return y2A<=T2A;}
,'U5K':function(j5K,l5K){return j5K>l5K;}
,'Z0R':function(E0R,u0R){return E0R===u0R;}
,'W2A':function(g2A,w2A){return g2A===w2A;}
,'u2m':function(s2m,P2m){return s2m==P2m;}
,'Q0A':function(z0A,I0A){return z0A==I0A;}
,'A2D':function(X2D,m2D){return X2D*m2D;}
,'H6J':function(r6J,h6J){return r6J==h6J;}
,'P0K':function(N0K,i0K){return N0K-i0K;}
,'X2J':function(m2J,y2J){return m2J<=y2J;}
,'s5':function(P5,N5){return P5==N5;}
,'w8A':function(v8A,n8A){return v8A*n8A;}
,'q5C':function(A5C,X5C){return A5C/X5C;}
,'G3m':function(t3m,x3m){return t3m===x3m;}
,'W1D':function(g1D,w1D){return g1D-w1D;}
,'h6R':function(q6R,A6R){return q6R-A6R;}
,'i3W':function(p3W,b3W){return p3W/b3W;}
,'S3A':function(o3A,Y3A){return o3A-Y3A;}
,'s9':function(P9,N9){return P9*N9;}
,'z6D':function(I6D,F6D){return I6D>F6D;}
,'d3h':function(c3h,J3h){return c3h<J3h;}
,'v4m':function(n4m,e4m){return n4m===e4m;}
,'l8R':function(S8R,o8R){return S8R==o8R;}
,'q7K':function(A7K,X7K){return A7K<X7K;}
,'c1W':function(J1W,f1W){return J1W<f1W;}
,'V8J':function(O8J,K8J){return O8J==K8J;}
,'D1J':function(k1J,W1J){return k1J!=W1J;}
,'R5':function(L5,C5){return L5<C5;}
,'o7':function(Y7,G7){return Y7==G7;}
,'y1W':function(T1W,d1W){return T1W>d1W;}
,'y9n':function(T9n,d9n){return T9n==d9n;}
,'Z5m':function(E5m,u5m){return E5m<u5m;}
,'L1K':function(C1K,D1K){return C1K==D1K;}
,'P0m':function(N0m,i0m){return N0m>=i0m;}
,'K4m':function(R4m,L4m){return R4m==L4m;}
,'o6c':function(Y6c,G6c){return Y6c==G6c;}
,'E9K':function(u9K,s9K){return u9K-s9K;}
,'R7A':function(L7A,C7A){return L7A/C7A;}
,'C5A':function(D5A,k5A){return D5A/k5A;}
,'u8C':function(s8C,P8C){return s8C==P8C;}
,'w0c':function(v0c,n0c){return v0c<=n0c;}
,'F1m':function(H1m,r1m){return H1m>r1m;}
,'l6m':function(S6m,o6m){return S6m>o6m;}
,'Z9n':function(E9n,u9n){return E9n>u9n;}
,'V4R':function(O4R,K4R){return O4R===K4R;}
,'N4m':function(i4m,p4m){return i4m-p4m;}
,'t0W':function(x0W,V0W){return x0W/V0W;}
,'h1K':function(q1K,A1K){return q1K>A1K;}
,'o2m':function(Y2m,G2m){return Y2m>=G2m;}
,'X4h':function(m4h,y4h){return m4h<y4h;}
,'W5c':function(g5c,w5c){return g5c/w5c;}
,'T0m':function(d0m,c0m){return d0m-c0m;}
,'D9n':function(k9n,W9n){return k9n<W9n;}
,'y5K':function(T5K,d5K){return T5K==d5K;}
,'c3K':function(J3K,f3K){return J3K<f3K;}
,'Y1D':function(G1D,t1D){return G1D<=t1D;}
,'V3J':function(O3J,K3J){return O3J==K3J;}
,'K6D':function(R6D,L6D){return R6D<L6D;}
,'X6R':function(m6R,y6R){return m6R!==y6R;}
,'T9W':function(d9W,c9W){return d9W<c9W;}
,'u6m':function(s6m,P6m){return s6m-P6m;}
,'p9K':function(b9K,a9K){return b9K*a9K;}
,'x1D':function(V1D,O1D){return V1D>O1D;}
,'o6h':function(Y6h,G6h){return Y6h===G6h;}
,'q4':function(A4,X4){return A4<X4;}
,'z3D':function(I3D,F3D){return I3D*F3D;}
,'J':function(B,U7){return B==U7;}
,'o0W':function(Y0W,G0W){return Y0W!=G0W;}
,'P6h':function(N6h,i6h){return N6h*i6h;}
,'T6c':function(d6c,c6c){return d6c!=c6c;}
,'Q0K':function(z0K,I0K){return z0K<I0K;}
,'B1W':function(U5W,j5W){return U5W==j5W;}
,'s8c':function(P8c,N8c){return P8c/N8c;}
,'T2':function(J2,f2){return J2>f2;}
,'f4W':function(B4W,U0W){return B4W!=U0W;}
,'W6J':function(g6J,w6J){return g6J==w6J;}
,'o9J':function(Y9J,G9J){return Y9J<G9J;}
,'B8W':function(U6W,j6W){return U6W==j6W;}
,'r2D':function(h2D,q2D){return h2D>q2D;}
,'r5m':function(h5m,q5m){return h5m!=q5m;}
,'C4J':function(D4J,k4J){return D4J>k4J;}
,'w6h':function(v6h,n6h){return v6h==n6h;}
,'N4W':function(i4W,p4W){return i4W<p4W;}
,'P1A':function(N1A,i1A,p1A){return N1A-i1A+p1A;}
,'Z4A':function(E4A,u4A){return E4A/u4A;}
,'g5':function(w5,v5){return w5==v5;}
,'b2K':function(a2K,Q2K){return a2K<Q2K;}
,'i3c':function(p3c,b3c){return p3c===b3c;}
,'B3J':function(U4J,j4J){return U4J>j4J;}
,'Q5R':function(z5R,I5R){return z5R===I5R;}
,'F9J':function(H9J,r9J){return H9J==r9J;}
,'Z3J':function(E3J,u3J){return E3J<u3J;}
,'V8m':function(O8m,K8m){return O8m==K8m;}
,'s9A':function(P9A,N9A){return P9A<N9A;}
,'P4D':function(N4D,i4D){return N4D/i4D;}
,'J6C':function(f6C,B6C){return f6C/B6C;}
,'o1c':function(Y1c,G1c){return Y1c*G1c;}
,'B8m':function(U6m,j6m){return U6m==j6m;}
,'O2m':function(K2m,R2m,L2m){return K2m-R2m+L2m;}
,'b8':function(a8,Q8){return a8/Q8;}
,'I0':function(F0,H0){return F0*H0;}
,'d0A':function(c0A,J0A){return c0A*J0A;}
,'u3n':function(s3n,P3n){return s3n!==P3n;}
,'l7R':function(S7R,o7R){return S7R*o7R;}
,'n4R':function(e4R,M4R){return e4R==M4R;}
,'z5C':function(I5C,F5C){return I5C>F5C;}
,'s4R':function(P4R,N4R){return P4R-N4R;}
,'R7c':function(L7c,C7c,D7c){return L7c*C7c/D7c;}
,'k3C':function(W3C,g3C){return W3C<=g3C;}
,'E9c':function(u9c,s9c){return u9c==s9c;}
,'x4D':function(V4D,O4D,K4D,R4D){return V4D-O4D+K4D+R4D;}
,'j7h':function(l7h,S7h){return l7h!=S7h;}
,'g8W':function(w8W,v8W){return w8W>v8W;}
,'A1J':function(X1J,m1J){return X1J==m1J;}
,'Q0m':function(z0m,I0m){return z0m>=I0m;}
,'c2h':function(J2h,f2h){return J2h*f2h;}
,'X3A':function(m3A,y3A){return m3A/y3A;}
,'R3A':function(L3A,C3A){return L3A*C3A;}
,'D2R':function(k2R,W2R){return k2R>W2R;}
,'r7R':function(h7R,q7R){return h7R===q7R;}
,'v9W':function(n9W,e9W){return n9W>e9W;}
,'e0W':function(M0W,Z0W){return M0W-Z0W;}
,'P6':function(N6,i6){return N6>i6;}
,'V9m':function(O9m,K9m){return O9m-K9m;}
,'U3c':function(j3c,l3c){return j3c==l3c;}
,'A5K':function(X5K,m5K){return X5K==m5K;}
,'k7D':function(W7D,g7D){return W7D*g7D;}
,'Q9K':function(z9K,I9K){return z9K*I9K;}
,'o0A':function(Y0A,G0A){return Y0A==G0A;}
,'g2h':function(w2h,v2h){return w2h===v2h;}
,'b5J':function(a5J,Q5J){return a5J>=Q5J;}
,'P3C':function(N3C,i3C){return N3C<i3C;}
,'w6':function(v6,n6){return v6<=n6;}
,'u8h':function(s8h,P8h){return s8h>P8h;}
,'Q4D':function(z4D,I4D){return z4D-I4D;}
,'K6W':function(R6W,L6W){return R6W===L6W;}
,'s2C':function(P2C,N2C){return P2C==N2C;}
,'K4J':function(R4J,L4J){return R4J>L4J;}
,'M5J':function(Z5J,E5J){return Z5J===E5J;}
,'H9W':function(r9W,h9W){return r9W<h9W;}
,'i0R':function(p0R,b0R){return p0R===b0R;}
,'M3n':function(Z3n,E3n){return Z3n<E3n;}
,'L6h':function(C6h,D6h){return C6h==D6h;}
,'w7D':function(v7D,n7D){return v7D<=n7D;}
,'v2c':function(n2c,e2c){return n2c&e2c;}
,'o7h':function(Y7h,G7h){return Y7h-G7h;}
,'Y4':function(G4,t4){return G4==t4;}
,'r1':function(h1,q1){return h1==q1;}
,'h3R':function(q3R,A3R){return q3R==A3R;}
,'i8W':function(p8W,b8W){return p8W*b8W;}
,'M2A':function(Z2A,E2A){return Z2A===E2A;}
,'G9A':function(t9A,x9A){return t9A<x9A;}
,'c5m':function(J5m,f5m){return J5m*f5m;}
,'y8m':function(T8m,d8m){return T8m==d8m;}
,'D8m':function(k8m,W8m){return k8m==W8m;}
,'b0D':function(a0D,Q0D){return a0D>Q0D;}
,'A0h':function(X0h,m0h){return X0h<m0h;}
,'A8K':function(X8K,m8K){return X8K-m8K;}
,'m5c':function(y5c,T5c){return y5c>T5c;}
,'k0K':function(W0K,g0K){return W0K>=g0K;}
,'Q2':function(z2,I2){return z2==I2;}
,'k5h':function(W5h,g5h){return W5h>=g5h;}
,'F0J':function(H0J,r0J){return H0J==r0J;}
,'H5c':function(r5c,h5c){return r5c<h5c;}
,'k7h':function(W7h,g7h,w7h){return W7h-g7h+w7h;}
,'E8D':function(u8D,s8D){return u8D-s8D;}
,'e2W':function(M2W,Z2W){return M2W<=Z2W;}
,'v8h':function(n8h,e8h){return n8h!==e8h;}
,'Z3K':function(E3K,u3K){return E3K/u3K;}
,'Y6K':function(G6K,t6K){return G6K*t6K;}
,'y9':function(T9,d9){return T9-d9;}
,'C8R':function(D8R,k8R){return D8R-k8R;}
,'Z4C':function(E4C,u4C){return E4C/u4C;}
,'S9n':function(o9n,Y9n){return o9n>Y9n;}
,'E0m':function(u0m,s0m){return u0m-s0m;}
,'P0n':0,'H0D':function(r0D,h0D){return r0D*h0D;}
,'i5':function(p5,b5){return p5==b5;}
,'U0C':function(j0C,l0C){return j0C!=l0C;}
,'B5m':function(U7K,j7K){return U7K/j7K;}
,'U2R':function(j2R,l2R){return j2R-l2R;}
,'s8K':function(P8K,N8K){return P8K<N8K;}
,'q4W':function(A4W,X4W){return A4W==X4W;}
,'Z9m':function(E9m,u9m){return E9m==u9m;}
,'w0A':function(v0A,n0A){return v0A<n0A;}
,'B2h':function(U1h,j1h){return U1h*j1h;}
,'s8W':function(P8W,N8W){return P8W<N8W;}
,'K8h':function(R8h,L8h){return R8h!==L8h;}
,'W9W':function(g9W,w9W){return g9W*w9W;}
,'j5R':function(l5R,S5R){return l5R>S5R;}
,'i2h':function(p2h,b2h){return p2h>b2h;}
,'l6W':function(S6W,o6W){return S6W!=o6W;}
,'X6C':function(m6C,y6C){return m6C<y6C;}
,'F3C':function(H3C,r3C){return H3C==r3C;}
,'s2h':function(P2h,N2h){return P2h<N2h;}
,'E7':function(u7,s7){return u7<s7;}
,'R2R':function(L2R,C2R){return L2R===C2R;}
,'m7J':function(y7J,T7J){return y7J-T7J;}
,'Q9J':function(z9J,I9J){return z9J!=I9J;}
,'K0D':function(R0D,L0D){return R0D&L0D;}
,'E6h':function(u6h,s6h){return u6h*s6h;}
,'L7D':function(C7D,D7D){return C7D-D7D;}
,'w0K':function(v0K,n0K){return v0K-n0K;}
,'I7D':function(F7D,H7D){return F7D<H7D;}
,'D0h':function(k0h,W0h){return k0h-W0h;}
,'n3m':function(e3m,M3m){return e3m!==M3m;}
,'E0W':function(u0W,s0W){return u0W>=s0W;}
,'e9J':function(M9J,Z9J){return M9J==Z9J;}
,'d8':function(c8,J8){return c8>J8;}
,'x2A':function(V2A,O2A){return V2A>O2A;}
,'b9C':function(a9C,Q9C){return a9C===Q9C;}
,'g1W':function(w1W,v1W){return w1W|v1W;}
,'P3A':function(N3A,i3A){return N3A===i3A;}
,'V2h':function(O2h,K2h){return O2h==K2h;}
,'F6h':function(H6h,r6h){return H6h-r6h;}
,'d4':function(c4,J4){return c4/J4;}
,'J9W':function(f9W,B9W){return f9W/B9W;}
,'a9n':function(Q9n,z9n){return Q9n<z9n;}
,'f6J':function(B6J,U2J){return B6J==U2J;}
,'I9m':function(F9m,H9m,r9m){return F9m*H9m/r9m;}
,'G3W':function(t3W,x3W){return t3W!==x3W;}
,'H2A':function(r2A,h2A){return r2A-h2A;}
,'V9A':function(O9A,K9A){return O9A>=K9A;}
,'Z8c':function(E8c,u8c){return E8c-u8c;}
,'g8':function(w8,v8){return w8===v8;}
,'M7c':function(Z7c,E7c){return Z7c-E7c;}
,'t6C':function(x6C,V6C){return x6C-V6C;}
,'P2':function(N2,i2){return N2*i2;}
,'A8W':function(X8W,m8W){return X8W-m8W;}
,'U5m':function(j5m,l5m){return j5m==l5m;}
,'y2D':function(T2D,d2D){return T2D<=d2D;}
,'L5h':function(C5h,D5h){return C5h!==D5h;}
,'B7C':function(U9C,j9C){return U9C<j9C;}
,'S0R':function(o0R,Y0R){return o0R-Y0R;}
,'T6C':function(d6C,c6C){return d6C===c6C;}
,'K2A':function(R2A,L2A){return R2A===L2A;}
,'C9C':function(D9C,k9C){return D9C<=k9C;}
,'D4R':function(k4R,W4R){return k4R===W4R;}
,'g4A':function(w4A,v4A){return w4A-v4A;}
,'g2C':function(w2C,v2C){return w2C!==v2C;}
,'q3D':function(A3D,X3D){return A3D/X3D;}
,'v8C':function(n8C,e8C){return n8C===e8C;}
,'R7W':function(L7W,C7W){return L7W!=C7W;}
,'r8W':function(h8W,q8W){return h8W*q8W;}
,'C5J':function(D5J,k5J){return D5J/k5J;}
,'l4J':function(S4J,o4J){return S4J===o4J;}
,'u5W':function(s5W,P5W){return s5W*P5W;}
,'r1J':function(h1J,q1J){return h1J===q1J;}
,'w1K':function(v1K,n1K){return v1K/n1K;}
,'k9K':function(W9K,g9K){return W9K==g9K;}
,'K5W':function(R5W,L5W){return R5W==L5W;}
,'Y4J':function(G4J,t4J){return G4J===t4J;}
,'L7h':function(C7h,D7h){return C7h-D7h;}
,'K5A':function(R5A,L5A){return R5A/L5A;}
,'W6D':function(g6D,w6D){return g6D-w6D;}
,'M7h':function(Z7h,E7h){return Z7h==E7h;}
,'a3J':function(Q3J,z3J){return Q3J-z3J;}
,'x3n':function(V3n,O3n){return V3n>O3n;}
,'S2c':function(o2c,Y2c,G2c,t2c){return o2c-Y2c+G2c-t2c;}
,'p6':function(b6,a6){return b6-a6;}
,'y2C':function(T2C,d2C){return T2C!=d2C;}
,'n4C':function(e4C,M4C){return e4C-M4C;}
,'o1m':function(Y1m,G1m){return Y1m===G1m;}
,'C2':function(D2,W2){return D2==W2;}
,'K2K':function(R2K,L2K){return R2K-L2K;}
,'i3m':function(p3m,b3m){return p3m<b3m;}
,'S4R':function(o4R,Y4R){return o4R/Y4R;}
,'U7A':function(j7A,l7A){return j7A-l7A;}
,'J6':function(f6,B6){return f6==B6;}
,'I5W':function(F5W,H5W,r5W){return F5W-H5W+r5W;}
,'W6K':function(g6K,w6K){return g6K-w6K;}
,'A9n':function(X9n,m9n){return X9n!=m9n;}
,'H6D':function(r6D,h6D){return r6D<h6D;}
,'N7c':function(i7c,p7c){return i7c===p7c;}
,'F9K':function(H9K,r9K){return H9K<r9K;}
,'x4m':function(V4m,O4m){return V4m==O4m;}
,'f5C':function(B5C,U7h){return B5C!=U7h;}
,'l1h':function(S1h,o1h){return S1h*o1h;}
,'q0D':function(A0D,X0D){return A0D-X0D;}
,'g2':function(v2,n2){return v2==n2;}
,'Z1W':function(E1W,u1W){return E1W|u1W;}
,'p3A':function(b3A,a3A){return b3A===a3A;}
,'i2R':function(p2R,b2R){return p2R==b2R;}
,'K8R':function(R8R,L8R){return R8R<L8R;}
,'r3W':function(h3W,q3W){return h3W!=q3W;}
,'u7h':function(s7h,P7h,N7h){return s7h-P7h-N7h;}
,'x9h':function(V9h,O9h){return V9h<O9h;}
,'R9A':function(L9A,C9A){return L9A===C9A;}
,'V5K':function(O5K,K5K){return O5K>=K5K;}
,'S5m':function(o5m,Y5m){return o5m<Y5m;}
,'r9':function(h9,q9){return h9==q9;}
,'q7J':function(A7J,X7J){return A7J>X7J;}
,'K1R':function(R1R,L1R){return R1R==L1R;}
,'h7n':function(q7n,A7n){return q7n>=A7n;}
,'n7C':function(e7C,M7C){return e7C/M7C;}
,'R8W':function(L8W,C8W){return L8W/C8W;}
,'r3J':function(h3J,q3J){return h3J-q3J;}
,'L9D':function(C9D,D9D){return C9D<D9D;}
,'b1D':function(a1D,Q1D){return a1D-Q1D;}
,'h0A':function(q0A,A0A,X0A){return q0A*A0A/X0A;}
,'k7n':function(W7n,g7n){return W7n<=g7n;}
,'G7C':function(t7C,x7C){return t7C<=x7C;}
,'y7R':function(T7R,d7R){return T7R*d7R;}
,'k7':function(W7,g7){return W7==g7;}
,'c8K':function(J8K,f8K){return J8K>f8K;}
,'P6c':function(N6c,i6c){return N6c-i6c;}
,'z1C':function(I1C,F1C){return I1C-F1C;}
,'S0C':function(o0C,Y0C){return o0C!=Y0C;}
,'L1m':function(C1m,D1m){return C1m<D1m;}
,'o6C':function(Y6C,G6C){return Y6C>G6C;}
,'w5D':function(v5D,n5D){return v5D-n5D;}
,'d0D':function(c0D,J0D){return c0D*J0D;}
,'q8c':function(A8c,X8c){return A8c/X8c;}
,'S3m':function(o3m,Y3m){return o3m<Y3m;}
,'Q1c':function(z1c,I1c){return z1c==I1c;}
,'S8c':function(o8c,Y8c){return o8c-Y8c;}
,'Y8R':function(G8R,t8R){return G8R>t8R;}
,'S0h':function(o0h,Y0h){return o0h-Y0h;}
,'s3':function(P3,N3){return P3<N3;}
,'K3D':function(R3D,L3D){return R3D<L3D;}
,'h5R':function(q5R,A5R){return q5R<A5R;}
,'g3W':function(w3W,v3W){return w3W===v3W;}
,'p0J':function(b0J,a0J){return b0J!=a0J;}
,'x5c':function(V5c,O5c){return V5c<=O5c;}
,'O6':function(K6,R6){return K6>R6;}
,'o6R':function(Y6R,G6R){return Y6R==G6R;}
,'c3':function(J3,f3){return J3-f3;}
,'d3D':function(c3D,J3D){return c3D>=J3D;}
,'T9A':function(d9A,c9A){return d9A<c9A;}
,'g8c':function(w8c,v8c){return w8c-v8c;}
,'X1m':function(m1m,y1m){return m1m-y1m;}
,'U8m':function(j8m,l8m){return j8m==l8m;}
,'v2K':function(n2K,e2K){return n2K<=e2K;}
,'e1c':function(M1c,Z1c){return M1c>Z1c;}
,'h9m':function(q9m,A9m){return q9m/A9m;}
,'T6R':function(d6R,c6R){return d6R!==c6R;}
,'C4':function(D4,k4){return D4<k4;}
,'t8A':function(x8A,V8A){return x8A<V8A;}
,'j7n':function(l7n,S7n){return l7n>=S7n;}
,'A8m':function(X8m,m8m){return X8m>m8m;}
,'R8K':function(L8K,C8K){return L8K<=C8K;}
,'A7h':function(X7h,m7h){return X7h/m7h;}
,'s0h':function(P0h,N0h){return P0h<N0h;}
,'v6K':function(n6K,e6K){return n6K-e6K;}
,'N4K':function(i4K,p4K){return i4K-p4K;}
,'T0c':function(d0c,c0c){return d0c-c0c;}
,'t0m':function(x0m,V0m){return x0m/V0m;}
,'a5':function(Q5,z5){return Q5==z5;}
,'r7C':function(h7C,q7C){return h7C>q7C;}
,'y7D':function(T7D,d7D){return T7D-d7D;}
,'C2K':function(D2K,k2K){return D2K>k2K;}
,'i0':function(p0,b0){return p0/b0;}
,'B5':function(U7R,j7R){return U7R*j7R;}
,'m5A':function(y5A,T5A){return y5A-T5A;}
,'I2h':function(F2h,H2h){return F2h>H2h;}
,'A4R':function(X4R,m4R){return X4R*m4R;}
,'f4c':function(B4c,U0c){return B4c/U0c;}
,'l9R':function(S9R,o9R){return S9R-o9R;}
,'F6C':function(H6C,r6C){return H6C-r6C;}
,'Q7n':function(z7n,I7n){return z7n-I7n;}
,'d1R':function(c1R,J1R){return c1R<J1R;}
,'q6D':function(A6D,X6D){return A6D>X6D;}
,'Q3R':function(z3R,I3R){return z3R<I3R;}
,'W1R':function(g1R,w1R){return g1R/w1R;}
,'j0J':function(l0J,S0J){return l0J<S0J;}
,'y9h':function(T9h,d9h){return T9h==d9h;}
,'G9':function(t9,x9){return t9/x9;}
,'y8J':function(T8J,d8J){return T8J-d8J;}
,'p0n':5,'T4D':function(d4D,c4D){return d4D-c4D;}
,'i7W':function(p7W,b7W){return p7W-b7W;}
,'J8A':function(f8A,B8A){return f8A<B8A;}
,'A9':function(X9,m9){return X9===m9;}
,'v9R':function(n9R,e9R){return n9R/e9R;}
,'N8C':function(i8C,p8C){return i8C==p8C;}
,'F2W':function(H2W,r2W){return H2W==r2W;}
,'E6c':function(u6c,s6c){return u6c<s6c;}
,'S1W':function(o1W,Y1W){return o1W==Y1W;}
,'P1m':function(N1m,i1m){return N1m-i1m;}
,'A6A':function(X6A,m6A){return X6A<m6A;}
,'A0R':function(X0R,m0R){return X0R*m0R;}
,'A7R':function(X7R,m7R){return X7R*m7R;}
,'X1c':function(m1c,y1c){return m1c*y1c;}
,'W3D':function(g3D,w3D){return g3D>w3D;}
,'a3':function(Q3,z3){return Q3/z3;}
,'l1':function(S1,o1){return S1>=o1;}
,'n3W':function(e3W,M3W){return e3W!=M3W;}
,'I3W':function(F3W,H3W){return F3W!==H3W;}
,'n3c':function(e3c,M3c){return e3c*M3c;}
,'i4R':function(p4R,b4R){return p4R-b4R;}
,'O1m':function(K1m,R1m){return K1m<R1m;}
,'k4h':function(W4h,g4h){return W4h===g4h;}
,'j1A':function(l1A,S1A){return l1A>S1A;}
,'N3D':function(i3D,p3D){return i3D>p3D;}
,'M6D':function(Z6D,E6D){return Z6D*E6D;}
,'N8h':function(i8h,p8h){return i8h<p8h;}
,'D3K':function(k3K,W3K){return k3K==W3K;}
,'D8W':function(k8W,W8W){return k8W in W8W;}
,'X9m':function(m9m,y9m){return m9m<y9m;}
,'W2K':function(g2K,w2K){return g2K/w2K;}
,'C0D':function(D0D,k0D){return D0D<=k0D;}
,'j5D':function(l5D,S5D){return l5D==S5D;}
,'i9m':function(p9m,b9m,a9m,Q9m,z9m){return p9m/b9m/a9m/Q9m/z9m;}
,'I0C':function(F0C,H0C){return F0C<=H0C;}
,'f2c':function(B2c,U1c){return B2c<U1c;}
,'h8D':function(q8D,A8D){return q8D/A8D;}
,'x2K':function(V2K,O2K){return V2K*O2K;}
,'L9c':function(C9c,D9c){return C9c==D9c;}
,'V3A':function(O3A,K3A){return O3A===K3A;}
,'q2m':function(A2m,X2m){return A2m<X2m;}
,'o0':function(Y0,G0){return Y0<G0;}
,'A7W':function(X7W,m7W){return X7W==m7W;}
,'v8R':function(n8R,e8R){return n8R-e8R;}
,'Z3':function(E3,u3){return E3==u3;}
,'d2m':function(c2m,J2m){return c2m<J2m;}
,'J0':function(f0,B0){return f0==B0;}
,'t1c':function(x1c,V1c){return x1c*V1c;}
,'M4J':function(Z4J,E4J){return Z4J==E4J;}
,'N7J':function(i7J,p7J){return i7J*p7J;}
,'Q6C':function(z6C,I6C){return z6C>=I6C;}
,'H5C':function(r5C,h5C){return r5C/h5C;}
,'X6h':function(m6h,y6h){return m6h===y6h;}
,'u9R':function(s9R,P9R){return s9R<P9R;}
,'u7c':function(s7c,P7c){return s7c<P7c;}
,'n9n':function(e9n,M9n){return e9n<M9n;}
,'C6m':function(D6m,k6m){return D6m==k6m;}
,'g5m':function(w5m,v5m){return w5m<v5m;}
,'f3D':function(B3D,U4D){return B3D==U4D;}
,'Y2K':function(G2K,t2K){return G2K*t2K;}
,'p5h':function(b5h,a5h){return b5h<=a5h;}
,'V7A':function(O7A,K7A){return O7A-K7A;}
,'w1A':function(v1A,n1A){return v1A>=n1A;}
,'l9W':function(S9W,o9W){return S9W!==o9W;}
,'v4':function(n4,e4){return n4>=e4;}
,'X9K':function(m9K,y9K){return m9K==y9K;}
,'H6m':function(r6m,h6m){return r6m-h6m;}
,'z1h':function(I1h,F1h){return I1h<F1h;}
,'i3':function(p3,b3){return p3-b3;}
,'f8C':function(B8C,U6C){return B8C*U6C;}
,'Q5D':function(z5D,I5D){return z5D<=I5D;}
,'d8R':function(c8R,J8R){return c8R>J8R;}
,'f4J':function(B4J,U0J){return B4J-U0J;}
,'w1c':function(v1c,n1c){return v1c-n1c;}
,'F3R':function(H3R,r3R){return H3R>=r3R;}
,'w7m':function(v7m,n7m){return v7m==n7m;}
,'q3h':function(A3h,X3h){return A3h-X3h;}
,'g3m':function(w3m,v3m){return w3m===v3m;}
,'E0J':function(u0J,s0J){return u0J-s0J;}
,'Z3c':function(E3c,u3c){return E3c-u3c;}
,'F2J':function(H2J,r2J){return H2J==r2J;}
,'t2J':function(x2J,V2J){return x2J==V2J;}
,'m4W':function(y4W,T4W){return y4W*T4W;}
,'W2c':function(g2c,w2c){return g2c/w2c;}
,'A3K':function(X3K,m3K){return X3K>m3K;}
,'S3c':function(o3c,Y3c){return o3c<Y3c;}
,'i6A':function(p6A,b6A){return p6A===b6A;}
,'j3R':function(l3R,S3R){return l3R!=S3R;}
,'J4D':function(f4D,B4D,U0D,j0D){return f4D-B4D+U0D-j0D;}
,'B0C':function(U8C,j8C){return U8C>j8C;}
,'e7m':function(M7m,Z7m){return M7m!=Z7m;}
,'f5c':function(B5c,U7D){return B5c<=U7D;}
,'S5c':function(o5c,Y5c,G5c,t5c){return o5c-Y5c+G5c-t5c;}
,'Y5J':function(G5J,t5J){return G5J===t5J;}
,'A7C':function(X7C,m7C){return X7C<m7C;}
,'W4m':function(g4m,w4m){return g4m===w4m;}
,'T3R':function(d3R,c3R){return d3R-c3R;}
,'J1m':function(f1m,B1m){return f1m/B1m;}
,'O9D':function(K9D,R9D){return K9D<=R9D;}
,'m2K':function(y2K,T2K){return y2K==T2K;}
,'n2C':function(e2C,M2C){return e2C>M2C;}
,'c7D':function(J7D,f7D){return J7D<=f7D;}
,'m4':function(y4,T4){return y4/T4;}
,'t5C':function(x5C,V5C,O5C){return x5C-V5C-O5C;}
,'q5J':function(A5J,X5J){return A5J/X5J;}
,'q6J':function(A6J,X6J){return A6J==X6J;}
,'f3h':function(B3h,U4h){return B3h*U4h;}
,'W8R':function(g8R,w8R){return g8R*w8R;}
,'u4K':function(s4K,P4K){return s4K-P4K;}
,'N5C':function(i5C,p5C){return i5C>p5C;}
,'A2R':function(X2R,m2R){return X2R<m2R;}
,'G8K':function(t8K,x8K){return t8K<=x8K;}
,'C3':function(D3,k3){return D3<k3;}
,'V7R':function(O7R,K7R){return O7R<=K7R;}
,'z9C':function(I9C,F9C){return I9C>F9C;}
,'f6W':function(B6W,U2W){return B6W<U2W;}
,'C3n':function(D3n,k3n){return D3n<=k3n;}
,'W1h':function(g1h,w1h){return g1h==w1h;}
,'L8A':function(C8A,D8A){return C8A<D8A;}
,'N2m':function(i2m,p2m){return i2m==p2m;}
,'v6m':function(n6m,e6m){return n6m/e6m;}
,'V4c':function(O4c,K4c){return O4c-K4c;}
,'Q0W':function(z0W,I0W){return z0W>I0W;}
,'t2m':function(x2m,V2m){return x2m==V2m;}
,'f4m':function(B4m,U0m){return B4m<U0m;}
,'l8C':function(S8C,o8C){return S8C-o8C;}
,'M9W':function(Z9W,E9W){return Z9W-E9W;}
,'Q9c':function(z9c,I9c){return z9c>I9c;}
,'G2':function(V2,O2){return V2/O2;}
,'z1D':function(I1D,F1D){return I1D<=F1D;}
,'b6m':function(a6m,Q6m){return a6m>Q6m;}
,'f5J':function(B5J,U7n){return B5J>=U7n;}
,'y5':function(T5,d5){return T5/d5;}
,'l3n':function(S3n,o3n){return S3n>=o3n;}
,'a4R':function(Q4R,z4R){return Q4R%z4R;}
,'l5J':function(S5J,o5J){return S5J<o5J;}
,'m4J':function(y4J,T4J){return y4J*T4J;}
,'J9K':function(f9K,B9K){return f9K==B9K;}
,'J9J':function(f9J,B9J){return f9J<B9J;}
,'p9J':function(b9J,a9J){return b9J===a9J;}
,'s4C':function(P4C,N4C){return P4C*N4C;}
,'P6C':function(N6C,i6C){return N6C-i6C;}
,'d6D':function(c6D,J6D){return c6D>J6D;}
,'I6A':function(F6A,H6A){return F6A===H6A;}
,'t7':function(x7,V7){return x7==V7;}
,'x6m':function(V6m,O6m){return V6m<=O6m;}
,'F5R':function(H5R,r5R){return H5R==r5R;}
,'q2K':function(A2K,X2K){return A2K==X2K;}
,'X3C':function(m3C,y3C){return m3C==y3C;}
,'d2K':function(c2K,J2K){return c2K==J2K;}
,'D3A':function(k3A,W3A){return k3A===W3A;}
,'m8c':function(y8c,T8c){return y8c/T8c;}
,'p0c':function(b0c,a0c){return b0c!=a0c;}
,'l4m':function(S4m,o4m){return S4m===o4m;}
,'w9K':function(v9K,n9K){return v9K<n9K;}
,'z2K':function(I2K,F2K){return I2K==F2K;}
,'F4D':function(H4D,r4D){return H4D-r4D;}
,'s4A':function(P4A,N4A){return P4A-N4A;}
,'c0h':function(J0h,f0h){return J0h*f0h;}
,'o3R':function(Y3R,G3R){return Y3R/G3R;}
,'C6D':function(D6D,k6D){return D6D>k6D;}
,'Q1K':function(z1K,I1K){return z1K==I1K;}
,'H8':function(r8,h8){return r8>h8;}
,'D1W':function(k1W,W1W){return k1W|W1W;}
,'O1K':function(K1K,R1K){return K1K-R1K;}
,'Z1':function(E1,u1){return E1==u1;}
,'F6R':function(H6R,r6R){return H6R>=r6R;}
,'a7C':function(Q7C,z7C){return Q7C/z7C;}
,'M3D':function(Z3D,E3D){return Z3D<E3D;}
,'m4m':function(y4m,T4m){return y4m-T4m;}
,'n4A':function(e4A,M4A){return e4A<M4A;}
,'u4J':function(s4J,P4J){return s4J==P4J;}
,'M1h':function(Z1h,E1h){return Z1h==E1h;}
,'S1J':function(o1J,Y1J){return o1J>=Y1J;}
,'i9n':function(p9n,b9n){return p9n>b9n;}
,'k1m':function(W1m,g1m){return W1m-g1m;}
,'s7W':function(P7W,N7W){return P7W-N7W;}
,'T0J':function(d0J,c0J){return d0J!=c0J;}
,'X0K':function(m0K,y0K){return m0K==y0K;}
,'V3c':function(O3c,K3c){return O3c==K3c;}
,'D7C':function(k7C,W7C){return k7C*W7C;}
,'b1A':function(a1A,Q1A){return a1A<Q1A;}
,'F0K':function(H0K,r0K){return H0K>r0K;}
,'s0':function(P0,N0){return P0-N0;}
,'V4A':function(O4A,K4A){return O4A<K4A;}
,'Q8A':function(z8A,I8A){return z8A/I8A;}
,'h8A':function(q8A,A8A){return q8A>A8A;}
,'s9m':function(P9m,N9m){return P9m-N9m;}
,'L0m':function(C0m,D0m){return C0m<D0m;}
,'C7K':function(D7K,k7K){return D7K!=k7K;}
,'H4K':function(r4K,h4K){return r4K<h4K;}
,'p3C':function(b3C,a3C){return b3C==a3C;}
,'F5h':function(H5h,r5h){return H5h==r5h;}
,'e1m':function(M1m,Z1m){return M1m>Z1m;}
,'x9R':function(V9R,O9R){return V9R<O9R;}
,'Q2J':function(z2J,I2J){return z2J<I2J;}
,'f5A':function(B5A,U7m){return B5A<=U7m;}
,'G0h':function(t0h,x0h){return t0h==x0h;}
,'K1D':function(R1D,L1D){return R1D*L1D;}
,'t8D':function(x8D,V8D){return x8D>V8D;}
,'I5K':function(F5K,H5K){return F5K*H5K;}
,'x5W':function(V5W,O5W){return V5W<O5W;}
,'y2h':function(T2h,d2h){return T2h*d2h;}
,'O8A':function(K8A,R8A){return K8A>R8A;}
,'X8D':function(m8D,y8D){return m8D/y8D;}
,'O7':function(K7,R7){return K7<R7;}
,'O0J':function(K0J,R0J){return K0J-R0J;}
,'s0R':function(P0R,N0R){return P0R===N0R;}
,'a7A':function(Q7A,z7A){return Q7A-z7A;}
,'G9m':function(t9m,x9m){return t9m==x9m;}
,'N2c':function(i2c,p2c){return i2c<=p2c;}
,'P4h':function(N4h,i4h){return N4h==i4h;}
,'J7n':function(f7n,B7n){return f7n>=B7n;}
,'O2J':function(K2J,R2J){return K2J==R2J;}
,'n7W':function(e7W,M7W){return e7W==M7W;}
,'P9D':function(N9D,i9D){return N9D<i9D;}
,'w7c':function(v7c,n7c,e7c){return v7c*n7c/e7c;}
,'N0D':function(i0D,p0D){return i0D<p0D;}
,'m3D':function(y3D,T3D){return y3D/T3D;}
,'I7W':function(F7W,H7W){return F7W===H7W;}
,'b3D':function(a3D,Q3D){return a3D*Q3D;}
,'P3R':function(N3R,i3R){return N3R*i3R;}
,'W8C':function(g8C,w8C){return g8C!=w8C;}
,'O9K':function(K9K,R9K){return K9K<R9K;}
,'g4c':function(w4c,v4c){return w4c<v4c;}
,'l8h':function(S8h,o8h){return S8h*o8h;}
,'s7R':function(P7R,N7R){return P7R/N7R;}
,'b9R':function(a9R,Q9R){return a9R===Q9R;}
,'P9J':function(N9J,i9J){return N9J<i9J;}
,'K4':function(R4,L4){return R4==L4;}
,'e9D':function(M9D,Z9D){return M9D*Z9D;}
,'D4A':function(k4A,W4A){return k4A>W4A;}
,'J4h':function(f4h,B4h){return f4h-B4h;}
,'R4C':function(L4C,C4C){return L4C==C4C;}
,'S9m':function(o9m,Y9m){return o9m<Y9m;}
,'H3n':function(r3n,h3n){return r3n-h3n;}
,'h6C':function(q6C,A6C){return q6C<=A6C;}
,'X6c':function(m6c,y6c){return m6c-y6c;}
,'X9c':function(m9c,y9c){return m9c===y9c;}
,'x5A':function(V5A,O5A){return V5A/O5A;}
,'O7D':function(K7D,R7D){return K7D/R7D;}
,'m8R':function(y8R,T8R){return y8R>T8R;}
,'n3J':function(e3J,M3J){return e3J/M3J;}
,'C6W':function(D6W,k6W){return D6W===k6W;}
,'E0K':function(u0K,s0K){return u0K==s0K;}
,'J1K':function(f1K,B1K){return f1K<B1K;}
,'j9J':function(l9J,S9J){return l9J in S9J;}
,'n3':function(e3,M3){return e3<=M3;}
,'g3J':function(w3J,v3J){return w3J*v3J;}
,'M8h':function(Z8h,E8h){return Z8h<E8h;}
,'G7c':function(t7c,x7c){return t7c===x7c;}
,'k1c':function(W1c,g1c){return W1c<g1c;}
,'F1K':function(H1K,r1K){return H1K<r1K;}
,'I2D':function(F2D,H2D){return F2D<H2D;}
,'G8W':function(t8W,x8W){return t8W<x8W;}
,'i1J':function(p1J,b1J){return p1J===b1J;}
,'y7A':function(T7A,d7A){return T7A>d7A;}
,'H5J':function(r5J,h5J){return r5J>=h5J;}
,'N4J':function(i4J,p4J){return i4J-p4J;}
,'R8m':function(L8m,C8m){return L8m==C8m;}
,'w8D':function(v8D,n8D){return v8D>n8D;}
,'l6J':function(S6J,o6J){return S6J==o6J;}
,'w4h':function(v4h,n4h){return v4h===n4h;}
,'z8R':function(I8R,F8R){return I8R===F8R;}
,'t4h':function(x4h,V4h){return x4h/V4h;}
,'X0W':function(m0W,y0W){return m0W<y0W;}
,'y0C':function(T0C,d0C){return T0C>=d0C;}
,'F8D':function(H8D,r8D){return H8D-r8D;}
,'Q4h':function(z4h,I4h){return z4h==I4h;}
,'P1c':function(N1c,i1c){return N1c<=i1c;}
,'l4W':function(S4W,o4W){return S4W>=o4W;}
,'B0R':function(U8R,j8R){return U8R>j8R;}
,'V5m':function(O5m,K5m){return O5m-K5m;}
,'o4h':function(Y4h,G4h){return Y4h<G4h;}
,'d3n':function(c3n,J3n){return c3n===J3n;}
,'O0W':function(K0W,R0W){return K0W<=R0W;}
,'X9A':function(m9A,y9A){return m9A-y9A;}
,'i8K':function(p8K,b8K){return p8K!==b8K;}
,'l2A':function(S2A,o2A){return S2A===o2A;}
,'R8J':function(L8J,C8J){return L8J==C8J;}
,'l1D':function(S1D,o1D){return S1D!=o1D;}
,'F6':function(H6,r6){return H6<r6;}
,'n2D':function(e2D,M2D){return e2D/M2D;}
,'h4D':function(q4D,A4D){return q4D/A4D;}
,'c1A':function(J1A,f1A){return J1A-f1A;}
,'O5h':function(K5h,R5h){return K5h>R5h;}
,'g4R':function(w4R,v4R){return w4R==v4R;}
,'D9A':function(k9A,W9A){return k9A>=W9A;}
,'I1J':function(F1J,H1J){return F1J<H1J;}
,'m1C':function(y1C,T1C){return y1C<T1C;}
,'d4W':function(c4W,J4W){return c4W==J4W;}
,'c5K':function(J5K,f5K){return J5K>=f5K;}
,'f8':function(B8,U6){return B8-U6;}
,'M6K':function(Z6K,E6K){return Z6K==E6K;}
,'c8J':function(J8J,f8J){return J8J<f8J;}
,'i7D':function(p7D,b7D){return p7D<=b7D;}
,'w7':function(v7,n7){return v7==n7;}
,'G2C':function(t2C,x2C){return t2C>=x2C;}
,'p7n':function(b7n,a7n){return b7n<a7n;}
,'w3R':function(v3R,n3R){return v3R!==n3R;}
,'D5m':function(k5m,W5m){return k5m>W5m;}
,'Y6D':function(G6D,t6D){return G6D/t6D;}
,'T7':function(d7,c7){return d7>=c7;}
,'u1R':function(s1R,P1R){return s1R-P1R;}
,'M0D':function(Z0D,E0D){return Z0D&E0D;}
,'A1A':function(X1A,m1A){return X1A>m1A;}
,'E8A':function(u8A,s8A){return u8A-s8A;}
,'E3h':function(u3h,s3h,P3h){return u3h*s3h/P3h;}
,'H3D':function(r3D,h3D){return r3D/h3D;}
,'v7J':function(n7J,e7J){return n7J in e7J;}
,'O3R':function(K3R,R3R){return K3R-R3R;}
,'t6c':function(x6c,V6c){return x6c<V6c;}
,'i5m':function(p5m,b5m){return p5m-b5m;}
,'P2W':function(N2W,i2W){return N2W==i2W;}
,'X7':function(m7,y7){return m7>y7;}
,'J0c':function(f0c,B0c){return f0c<B0c;}
,'p3R':function(b3R,a3R){return b3R/a3R;}
,'R4R':function(L4R,C4R){return L4R===C4R;}
,'d9C':function(c9C,J9C){return c9C===J9C;}
,'V8K':function(O8K,K8K){return O8K>=K8K;}
,'W5W':function(g5W,w5W){return g5W==w5W;}
,'f9R':function(B9R,U3R){return B9R/U3R;}
,'U3W':function(j3W,l3W){return j3W/l3W;}
,'q4K':function(A4K,X4K){return A4K<X4K;}
,'k0m':function(W0m,g0m){return W0m in g0m;}
,'C7J':function(D7J,k7J){return D7J!==k7J;}
,'Y3':function(G3,t3){return G3==t3;}
,'M5W':function(Z5W,E5W){return Z5W==E5W;}
,'F0m':function(H0m,r0m){return H0m==r0m;}
,'i4C':function(p4C,b4C){return p4C-b4C;}
,'i3K':function(p3K,b3K){return p3K<b3K;}
,'t1m':function(x1m,V1m){return x1m==V1m;}
,'S3W':function(o3W,Y3W){return o3W/Y3W;}
,'d6J':function(c6J,J6J){return c6J*J6J;}
,'f0A':function(B0A,U8A){return B0A===U8A;}
,'b2c':function(a2c,Q2c){return a2c&Q2c;}
,'y8W':function(T8W,d8W){return T8W==d8W;}
,'I0h':function(F0h,H0h){return F0h>H0h;}
,'U9A':function(j9A,l9A){return j9A<l9A;}
,'s4c':function(P4c,N4c){return P4c/N4c;}
,'n2R':function(e2R,M2R){return e2R>M2R;}
,'U8W':function(j8W,l8W){return j8W-l8W;}
,'W4W':function(g4W,w4W){return g4W==w4W;}
,'N6W':function(i6W,p6W){return i6W==p6W;}
,'G2R':function(t2R,x2R){return t2R<x2R;}
,'E5R':function(u5R,s5R){return u5R<s5R;}
,'d2c':function(c2c,J2c){return c2c!=J2c;}
,'B3K':function(U4K,j4K){return U4K>j4K;}
,'L4h':function(C4h,D4h){return C4h==D4h;}
,'m0D':function(y0D,T0D){return y0D*T0D;}
,'r3m':function(h3m,q3m){return h3m<q3m;}
,'J3A':function(f3A,B3A){return f3A==B3A;}
,'s3W':function(P3W,N3W){return P3W==N3W;}
,'j3C':function(l3C,S3C){return l3C<S3C;}
,'M7J':function(Z7J,E7J){return Z7J*E7J;}
,'E9J':function(u9J,s9J){return u9J==s9J;}
,'E3C':function(u3C,s3C){return u3C<s3C;}
,'H4J':function(r4J,h4J){return r4J<h4J;}
,'v4W':function(n4W,e4W){return n4W==e4W;}
,'I2R':function(F2R,H2R){return F2R-H2R;}
,'I0R':function(F0R,H0R){return F0R==H0R;}
,'u5c':function(s5c,P5c){return s5c*P5c;}
,'e3h':function(M3h,Z3h){return M3h/Z3h;}
,'f1R':function(B1R,U5R){return B1R/U5R;}
,'V0C':function(O0C,K0C){return O0C<=K0C;}
,'w0m':function(v0m,n0m){return v0m in n0m;}
,'b7c':function(a7c,Q7c){return a7c*Q7c;}
,'T5W':function(d5W,c5W){return d5W-c5W;}
,'C1D':function(D1D,k1D){return D1D-k1D;}
,'h6h':function(q6h,A6h){return q6h<A6h;}
,'N1C':function(i1C,p1C){return i1C==p1C;}
,'b6D':function(a6D,Q6D){return a6D-Q6D;}
,'D0':function(k0,W0){return k0<=W0;}
,'G7A':function(t7A,x7A){return t7A>x7A;}
,'h5D':function(q5D,A5D){return q5D!=A5D;}
,'R0C':function(L0C,C0C){return L0C>=C0C;}
,'x8R':function(V8R,O8R){return V8R>=O8R;}
,'d8C':function(c8C,J8C){return c8C*J8C;}
,'N6J':function(i6J,p6J){return i6J>p6J;}
,'W9C':function(g9C,w9C){return g9C==w9C;}
,'I8m':function(F8m,H8m){return F8m-H8m;}
,'d5A':function(c5A,J5A){return c5A<J5A;}
,'y2R':function(T2R,d2R){return T2R-d2R;}
,'g7R':function(w7R,v7R){return w7R-v7R;}
,'Z1J':function(E1J,u1J){return E1J===u1J;}
,'p1K':function(b1K,a1K){return b1K/a1K;}
,'o7m':function(Y7m,G7m){return Y7m!=G7m;}
,'p6C':function(b6C,a6C){return b6C<a6C;}
,'b9W':function(a9W,Q9W){return a9W==Q9W;}
,'U1W':function(j1W,l1W){return j1W==l1W;}
,'t9c':function(x9c,V9c){return x9c<V9c;}
,'o9K':function(Y9K,G9K){return Y9K===G9K;}
,'j8A':function(l8A,S8A){return l8A>S8A;}
,'U5c':function(j5c,l5c){return j5c-l5c;}
,'h0K':function(q0K,A0K){return q0K==A0K;}
,'l9D':function(S9D,o9D){return S9D-o9D;}
,'z5A':function(I5A,F5A){return I5A/F5A;}
,'s6A':function(P6A,N6A){return P6A<N6A;}
,'e6R':function(M6R,Z6R){return M6R<Z6R;}
,'H8C':function(r8C,h8C){return r8C<h8C;}
,'X9D':function(m9D,y9D){return m9D<y9D;}
,'J0K':function(f0K,B0K){return f0K<B0K;}
,'U6A':function(j6A,l6A){return j6A<l6A;}
,'z4c':function(I4c,F4c){return I4c<=F4c;}
,'p8D':function(b8D,a8D){return b8D<a8D;}
,'c2R':function(J2R,f2R){return J2R<f2R;}
,'B1J':function(U5J,j5J){return U5J/j5J;}
,'U8K':function(j8K,l8K){return j8K==l8K;}
,'c7C':function(J7C,f7C){return J7C/f7C;}
,'k2J':function(W2J,g2J){return W2J>g2J;}
,'n6A':function(e6A,M6A){return e6A/M6A;}
,'O2D':function(K2D,R2D){return K2D-R2D;}
,'Y7K':function(G7K,t7K){return G7K==t7K;}
,'z5c':function(I5c,F5c){return I5c<F5c;}
,'G5K':function(t5K,x5K){return t5K-x5K;}
,'m8h':function(y8h,T8h){return y8h==T8h;}
,'n0':function(e0,M0){return e0<=M0;}
,'H8R':function(r8R,h8R){return r8R<h8R;}
,'p6c':function(b6c,a6c){return b6c>a6c;}
,'r9n':function(h9n,q9n){return h9n<q9n;}
,'Q8D':function(z8D,I8D){return z8D<=I8D;}
,'j2J':function(l2J,S2J){return l2J==S2J;}
,'a3m':function(Q3m,z3m){return Q3m===z3m;}
,'x6D':function(V6D,O6D){return V6D/O6D;}
,'V0R':function(O0R,K0R){return O0R==K0R;}
,'o5C':function(Y5C,G5C){return Y5C!=G5C;}
,'C6J':function(D6J,k6J){return D6J>k6J;}
,'V3K':function(O3K,K3K){return O3K>=K3K;}
,'H8h':function(r8h,h8h){return r8h==h8h;}
,'J7m':function(f7m,B7m){return f7m===B7m;}
,'r7W':function(h7W,q7W){return h7W==q7W;}
,'s3m':function(P3m,N3m){return P3m===N3m;}
,'p5R':function(b5R,a5R){return b5R-a5R;}
,'S2':function(o2,Y2){return o2==Y2;}
,'J3c':function(f3c,B3c){return f3c<B3c;}
,'X6':function(m6,y6){return m6<y6;}
,'x0D':function(V0D,O0D){return V0D<=O0D;}
,'q4c':function(A4c,X4c){return A4c/X4c;}
,'t2D':function(x2D,V2D){return x2D<V2D;}
,'U4R':function(j4R,l4R){return j4R/l4R;}
,'v1h':function(n1h,e1h){return n1h==e1h;}
,'H4c':function(r4c,h4c){return r4c/h4c;}
,'H4W':function(r4W,h4W){return r4W==h4W;}
,'U9':function(j9,l9){return j9<l9;}
,'a1W':function(Q1W,z1W){return Q1W==z1W;}
,'l0D':function(S0D,o0D){return S0D/o0D;}
,'U4c':function(j4c,l4c){return j4c-l4c;}
,'J5D':function(f5D,B5D){return f5D<B5D;}
,'L0K':function(C0K,D0K){return C0K<D0K;}
,'N8':function(i8,p8){return i8*p8;}
,'r2h':function(h2h,q2h){return h2h<q2h;}
,'e2J':function(M2J,Z2J){return M2J/Z2J;}
,'m9R':function(y9R,T9R){return y9R<T9R;}
,'k1K':function(W1K,g1K){return W1K==g1K;}
,'E1c':function(u1c,s1c){return u1c>=s1c;}
,'C5W':function(D5W,k5W){return D5W!==k5W;}
,'r3':function(h3,q3){return h3===q3;}
,'q2c':function(A2c,X2c){return A2c>=X2c;}
,'b5c':function(a5c,Q5c){return a5c-Q5c;}
,'F3A':function(H3A,r3A){return H3A-r3A;}
,'o0c':function(Y0c,G0c){return Y0c&G0c;}
,'c2D':function(J2D,f2D){return J2D==f2D;}
,'I7R':function(F7R,H7R){return F7R/H7R;}
,'j6C':function(l6C,S6C){return l6C<S6C;}
,'l2K':function(S2K,o2K){return S2K>o2K;}
,'u1h':function(s1h,P1h){return s1h*P1h;}
,'x1h':function(V1h,O1h){return V1h===O1h;}
,'q1D':function(A1D,X1D){return A1D>X1D;}
,'W5C':function(g5C,w5C){return g5C!=w5C;}
,'c6K':function(J6K,f6K){return J6K<f6K;}
,'T4h':function(d4h,c4h){return d4h===c4h;}
,'y0R':function(T0R,d0R){return T0R/d0R;}
,'D3J':function(k3J,W3J){return k3J>W3J;}
,'D7R':function(k7R,W7R){return k7R===W7R;}
,'X4D':function(m4D,y4D){return m4D<=y4D;}
,'R3K':function(L3K,C3K){return L3K<=C3K;}
,'I7C':function(F7C,H7C){return F7C<H7C;}
,'I5':function(F5,H5){return F5-H5;}
,'m4c':function(y4c,T4c){return y4c/T4c;}
,'l9C':function(S9C,o9C){return S9C>o9C;}
,'O6h':function(K6h,R6h){return K6h<R6h;}
,'O9c':function(K9c,R9c){return K9c==R9c;}
,'C9W':function(D9W,k9W){return D9W>k9W;}
,'e0c':function(M0c,Z0c){return M0c&Z0c;}
,'e1K':function(M1K,Z1K){return M1K==Z1K;}
,'e8D':function(M8D,Z8D){return M8D<Z8D;}
,'f6D':function(B6D,U2D){return B6D<U2D;}
,'m4K':function(y4K,T4K){return y4K-T4K;}
,'F0W':function(H0W,r0W){return H0W-r0W;}
,'t7n':function(x7n,V7n){return x7n>=V7n;}
,'j1m':function(l1m,S1m){return l1m<S1m;}
,'g7W':function(w7W,v7W){return w7W<v7W;}
,'v6W':function(n6W,e6W){return n6W===e6W;}
,'m3n':function(y3n,T3n){return y3n<T3n;}
,'O6c':function(K6c,R6c){return K6c>R6c;}
,'B8K':function(U6K,j6K){return U6K>j6K;}
,'D2h':function(k2h,W2h){return k2h/W2h;}
,'S7C':function(o7C,Y7C){return o7C-Y7C;}
,'h7':function(q7,A7){return q7<A7;}
,'v9C':function(n9C,e9C){return n9C==e9C;}
,'b8R':function(a8R,Q8R){return a8R<Q8R;}
,'d7X':(function(S9X){return (function(O9X,x9X){return (function(K9X){return {c7X:K9X}
;}
)(function(f7X){var G9X,B7X=((0x1BE,0xB5)<2.18E2?(0x1C5,0):(0x1C0,5.)>(143.9E1,0xC2)?33.5E1:(5.810E2,11));for(var V9X=O9X;B7X<f7X["length"];B7X++){var t9X=x9X(f7X,B7X);G9X=B7X===((0x159,0x15F)<(5.68E2,109)?(8.01E2,"i"):(19,0x17F)>=(0x216,82.4E1)?'i':(11.200E2,32)<(0xF4,0x1C9)?(10.,0):(99,128))?t9X:G9X^t9X;}
return G9X?V9X:!V9X;}
);}
)((function(o9X,j9X,U9X,Y9X){var l9X=((14,41.)<=(0x11,23.6E1)?(146.,31):(0x11D,51.0E1)<=0xB4?(36.30E1,'u'):(0x3F,0x235));return o9X(S9X,l9X)-Y9X(j9X,U9X)>l9X;}
)(parseInt,Date,(function(j9X){return (''+j9X)["substring"]((12.6E2>(0x3E,142.3E1)?0x1C2:(147.,1.065E3)>=138.?(91,1):(22.5E1,4.810E2)<=25.?127:(76.2E1,18)),(j9X+'')["length"]-((11.22E2,0x1F8)>(11.25E2,0x10B)?(54.5E1,1):(118.4E1,0x49)));}
)('_getTime2'),function(j9X,U9X){return new j9X()[U9X]();}
),function(f7X,B7X){var J7X=parseInt(f7X["charAt"](B7X),((30,49)<8.?0x166:(0xB1,106.)<=48.90E1?(9.60E1,16):(0x1F9,63.2E1)))["toString"]((13.02E2>=(107.2E1,2)?(7.100E2,2):1.063E3>(123,109.9E1)?(12.370E2,'o'):(0x62,1.8E1)));return J7X["charAt"](J7X["length"]-((139.,0x2E)<=(143,85.)?(104.,1):(1.0E1,28.70E1)<(30.1E1,0x50)?(0x174,18):(0x185,127.10E1)));}
);}
)('1m5n2du2m'),'u6D':function(s6D,P6D){return s6D<P6D;}
,'v4J':function(n4J,e4J){return n4J==e4J;}
,'M2m':function(Z2m,E2m){return Z2m==E2m;}
,'G5m':function(t5m,x5m){return t5m>x5m;}
,'t3h':function(x3h,V3h){return x3h-V3h;}
,'y1A':function(T1A,d1A){return T1A>d1A;}
,'d7c':function(c7c,J7c){return c7c>=J7c;}
,'u1D':function(s1D,P1D){return s1D==P1D;}
,'f8c':function(B8c,U6c){return B8c/U6c;}
,'R6A':function(L6A,C6A){return L6A===C6A;}
,'l6D':function(S6D,o6D){return S6D/o6D;}
,'S3K':function(o3K,Y3K){return o3K>=Y3K;}
,'J3C':function(f3C,B3C){return f3C>B3C;}
,'E9D':function(u9D,s9D){return u9D>s9D;}
,'N3n':function(i3n,p3n){return i3n!=p3n;}
,'t0A':function(x0A,V0A){return x0A>V0A;}
,'b4K':function(a4K,Q4K){return a4K/Q4K;}
,'K1C':function(R1C,L1C){return R1C>L1C;}
,'y3':function(T3,d3){return T3===d3;}
,'b4':function(a4,Q4){return a4<=Q4;}
,'N6m':function(i6m,p6m){return i6m==p6m;}
,'b0n':4,'L8D':function(C8D,D8D){return C8D>D8D;}
,'K6m':function(R6m,L6m){return R6m==L6m;}
,'h0W':function(q0W,A0W){return q0W>=A0W;}
,'w2J':function(v2J,n2J){return v2J==n2J;}
,'i7C':function(p7C,b7C){return p7C>b7C;}
,'z4m':function(I4m,F4m){return I4m===F4m;}
,'G8c':function(t8c,x8c){return t8c>x8c;}
,'v1C':function(n1C,e1C){return n1C<e1C;}
,'L9J':function(C9J,D9J){return C9J==D9J;}
,'O6C':function(K6C,R6C){return K6C-R6C;}
,'S3J':function(o3J,Y3J){return o3J<Y3J;}
,'p4D':function(b4D,a4D){return b4D/a4D;}
,'I2C':function(F2C,H2C){return F2C<H2C;}
,'C5C':function(D5C,k5C){return D5C-k5C;}
,'L9K':function(C9K,D9K){return C9K<D9K;}
,'b5A':function(a5A,Q5A){return a5A/Q5A;}
,'r1W':function(h1W,q1W){return h1W<q1W;}
,'e2':function(M2,Z2){return M2!=Z2;}
,'C8h':function(D8h,k8h){return D8h>k8h;}
,'o7n':function(Y7n,G7n){return Y7n>=G7n;}
,'Y8h':function(G8h,t8h){return G8h*t8h;}
,'u3D':function(s3D,P3D){return s3D<P3D;}
,'f2A':function(B2A,U1A){return B2A<U1A;}
,'C9h':function(D9h,k9h){return D9h/k9h;}
,'w9J':function(v9J,n9J){return v9J==n9J;}
,'H7c':function(r7c,h7c){return r7c-h7c;}
,'v9h':function(n9h,e9h){return n9h-e9h;}
,'x4':function(V4,O4){return V4<O4;}
,'h0J':function(q0J,A0J){return q0J!=A0J;}
,'b8h':function(a8h,Q8h){return a8h==Q8h;}
,'a8m':function(Q8m,z8m){return Q8m-z8m;}
,'v5c':function(n5c,e5c){return n5c<e5c;}
,'I3K':function(F3K,H3K){return F3K<H3K;}
,'t6':function(x6,V6){return x6<V6;}
,'T0':function(d0,c0){return d0<c0;}
,'E1A':function(u1A,s1A){return u1A-s1A;}
,'m6J':function(y6J,T6J){return y6J==T6J;}
,'t1K':function(x1K,V1K){return x1K==V1K;}
,'m2c':function(y2c,T2c){return y2c&T2c;}
,'C4m':function(D4m,k4m){return D4m<k4m;}
,'Z3A':function(E3A,u3A,s3A){return E3A-u3A+s3A;}
,'u6K':function(s6K,P6K){return s6K-P6K;}
,'F9D':function(H9D,r9D){return H9D>r9D;}
,'j7D':function(l7D,S7D){return l7D==S7D;}
,'M1C':function(Z1C,E1C){return Z1C>E1C;}
,'L1':function(C1,D1){return C1/D1;}
,'b4m':function(a4m,Q4m){return a4m<Q4m;}
,'Z0':function(E0,u0){return E0*u0;}
,'O3h':function(K3h,R3h){return K3h<R3h;}
,'K4W':function(R4W,L4W){return R4W<=L4W;}
,'T0K':function(d0K,c0K){return d0K==c0K;}
,'H4m':function(r4m,h4m){return r4m===h4m;}
,'y1J':function(T1J,d1J){return T1J==d1J;}
,'R1J':function(L1J,C1J){return L1J/C1J;}
,'P9c':function(N9c,i9c){return N9c>i9c;}
,'D8c':function(k8c,W8c){return k8c-W8c;}
,'r3K':function(h3K,q3K){return h3K>q3K;}
,'t5R':function(x5R,V5R){return x5R-V5R;}
,'G0R':function(t0R,x0R){return t0R==x0R;}
,'t1A':function(x1A,V1A){return x1A>V1A;}
,'G8m':function(t8m,x8m){return t8m==x8m;}
,'e9K':function(M9K,Z9K){return M9K==Z9K;}
,'x1C':function(V1C,O1C){return V1C<O1C;}
,'H2c':function(r2c,h2c){return r2c&h2c;}
,'N9h':function(i9h,p9h){return i9h-p9h;}
,'H1R':function(r1R,h1R){return r1R!=h1R;}
,'v3n':function(n3n,e3n){return n3n!=e3n;}
,'H7J':function(r7J,h7J){return r7J==h7J;}
,'J0J':function(f0J,B0J){return f0J!=B0J;}
,'G1J':function(t1J,x1J){return t1J<x1J;}
,'o6':function(Y6,G6){return Y6<G6;}
,'r7h':function(h7h,q7h){return h7h>q7h;}
,'Z8J':function(E8J,u8J){return E8J>=u8J;}
,'r5':function(h5,q5){return h5!=q5;}
,'C4K':function(D4K,k4K){return D4K<k4K;}
,'Z8m':function(E8m,u8m){return E8m==u8m;}
,'h4h':function(q4h,A4h){return q4h-A4h;}
,'I8K':function(F8K,H8K){return F8K!==H8K;}
,'i9':function(p9,b9){return p9*b9;}
,'e0m':function(M0m,Z0m){return M0m!==Z0m;}
,'i2D':function(p2D,b2D){return p2D/b2D;}
,'A1':function(X1,T1){return X1==T1;}
,'O1':function(K1,R1){return K1==R1;}
,'P6R':function(N6R,i6R){return N6R<i6R;}
,'L0J':function(C0J,D0J){return C0J-D0J;}
,'R3J':function(L3J,C3J){return L3J<=C3J;}
,'N2A':function(i2A,p2A){return i2A<p2A;}
,'G3c':function(t3c,x3c){return t3c*x3c;}
,'K9W':function(R9W,L9W){return R9W-L9W;}
,'f1C':function(B1C,U5C){return B1C!=U5C;}
,'i3J':function(p3J,b3J){return p3J-b3J;}
,'b3n':function(a3n,Q3n){return a3n!=Q3n;}
,'i1W':function(p1W,b1W){return p1W!=b1W;}
,'h0c':function(q0c,A0c){return q0c*A0c;}
,'L0W':function(C0W,D0W){return C0W-D0W;}
,'T3c':function(d3c,c3c){return d3c<c3c;}
,'n0n':3,'s1J':function(P1J,N1J){return P1J/N1J;}
,'l7J':function(S7J,o7J){return S7J!=o7J;}
,'K9C':function(R9C,L9C){return R9C>L9C;}
,'M5c':function(Z5c,E5c){return Z5c>E5c;}
,'b3h':function(a3h,Q3h){return a3h==Q3h;}
,'q9W':function(A9W,X9W,m9W,y9W){return A9W-X9W+m9W-y9W;}
,'G1W':function(t1W,x1W){return t1W==x1W;}
,'p8A':function(b8A,a8A){return b8A/a8A;}
,'M1R':function(Z1R,E1R){return Z1R===E1R;}
,'R0R':function(L0R,C0R){return L0R===C0R;}
,'r7D':function(h7D,q7D){return h7D<q7D;}
,'l6K':function(S6K,o6K){return S6K==o6K;}
,'l4':function(S4,o4){return S4<o4;}
,'o2J':function(Y2J,G2J){return Y2J==G2J;}
,'z4W':function(I4W,F4W){return I4W==F4W;}
,'E6R':function(u6R,s6R){return u6R<s6R;}
,'D2C':function(k2C,W2C){return k2C-W2C;}
,'b7J':function(a7J,Q7J){return a7J>Q7J;}
,'q5c':function(A5c,X5c){return A5c-X5c;}
,'w6C':function(v6C,n6C){return v6C-n6C;}
,'y3m':function(T3m,d3m){return T3m===d3m;}
,'o8A':function(Y8A,G8A){return Y8A<G8A;}
,'l3':function(S3,o3){return S3<o3;}
,'f4':function(B4,U0){return B4-U0;}
,'j9c':function(l9c,S9c){return l9c*S9c;}
,'G3D':function(t3D,x3D,V3D,O3D){return t3D-x3D+V3D-O3D;}
,'a5m':function(Q5m,z5m){return Q5m<z5m;}
,'J0m':function(f0m,B0m){return f0m==B0m;}
,'n0h':function(e0h,M0h){return e0h===M0h;}
,'o9c':function(Y9c,G9c){return Y9c-G9c;}
,'U7W':function(j7W,l7W){return j7W>l7W;}
,'j0m':function(l0m,S0m){return l0m>S0m;}
,'E6':function(u6,s6){return u6<s6;}
,'J2J':function(f2J,B2J){return f2J==B2J;}
,'i5K':function(p5K,b5K){return p5K<b5K;}
,'F0A':function(H0A,r0A){return H0A<r0A;}
,'P5R':function(N5R,i5R){return N5R>i5R;}
,'u8':function(s8,P8){return s8-P8;}
,'a1':function(Q1,z1){return Q1==z1;}
,'j5h':function(l5h,S5h){return l5h<S5h;}
,'k6':function(W6,g6){return W6<g6;}
,'p2':function(b2,a2){return b2==a2;}
,'R2C':function(L2C,C2C){return L2C==C2C;}
,'N6K':function(i6K,p6K){return i6K<p6K;}
,'T1m':function(d1m,c1m){return d1m==c1m;}
,'s2D':function(P2D,N2D){return P2D/N2D;}
,'x2c':function(V2c,O2c){return V2c<=O2c;}
,'I4C':function(F4C,H4C){return F4C!==H4C;}
,'k7m':function(W7m,g7m){return W7m!=g7m;}
,'V1J':function(O1J,K1J){return O1J===K1J;}
,'w9D':function(v9D,n9D){return v9D*n9D;}
,'T8A':function(d8A,c8A){return d8A/c8A;}
,'g9':function(w9,v9){return w9==v9;}
,'W8h':function(g8h,w8h){return g8h<w8h;}
,'q8':function(A8,X8){return A8===X8;}
,'P0A':function(N0A,i0A){return N0A>i0A;}
,'a7W':function(Q7W,z7W){return Q7W>=z7W;}
,'d8c':function(c8c,J8c){return c8c==J8c;}
,'z8C':function(I8C,F8C){return I8C<=F8C;}
,'p0W':function(b0W,a0W){return b0W-a0W;}
,'T2W':function(d2W,c2W){return d2W>c2W;}
,'l5W':function(S5W,o5W){return S5W==o5W;}
,'B9h':function(U3h,j3h,l3h,S3h){return U3h-j3h+l3h-S3h;}
,'R3W':function(L3W,C3W){return L3W/C3W;}
,'n0R':function(e0R,M0R){return e0R===M0R;}
,'k6C':function(W6C,g6C){return W6C/g6C;}
,'F7n':function(H7n,r7n){return H7n<r7n;}
,'e9c':function(M9c,Z9c){return M9c===Z9c;}
,'E2':function(u2,s2){return u2<=s2;}
,'X5D':function(m5D,y5D){return m5D<=y5D;}
,'J6R':function(f6R,B6R){return f6R>=B6R;}
,'L0c':function(C0c,D0c){return C0c<=D0c;}
,'L4D':function(C4D,D4D,k4D,W4D){return C4D-D4D+k4D+W4D;}
,'U0R':function(j0R,l0R){return j0R<l0R;}
,'s5m':function(P5m,N5m){return P5m<N5m;}
,'u7K':function(s7K,P7K){return s7K>P7K;}
,'D8':function(k8,W8){return k8==W8;}
,'K9h':function(R9h,L9h){return R9h<L9h;}
,'e0K':function(M0K,Z0K){return M0K<=Z0K;}
,'X0J':function(m0J,y0J){return m0J!=y0J;}
,'F0c':function(H0c,r0c){return H0c>r0c;}
,'Z2C':function(E2C,u2C){return E2C==u2C;}
,'o7D':function(Y7D,G7D){return Y7D!==G7D;}
,'c0C':function(J0C,f0C){return J0C<=f0C;}
,'P0W':function(N0W,i0W){return N0W-i0W;}
,'F0n':8,'p9c':function(b9c,a9c){return b9c-a9c;}
,'z6W':function(I6W,F6W){return I6W<F6W;}
,'S9':function(o9,Y9){return o9/Y9;}
,'M9C':function(Z9C,E9C){return Z9C<E9C;}
,'k6c':function(W6c,g6c){return W6c*g6c;}
,'M1D':function(Z1D,E1D){return Z1D===E1D;}
,'H1C':function(r1C,h1C){return r1C>h1C;}
,'j2D':function(l2D,S2D){return l2D-S2D;}
,'s7C':function(P7C,N7C){return P7C<N7C;}
,'g3K':function(w3K,v3K){return w3K*v3K;}
,'p2W':function(b2W,a2W){return b2W==a2W;}
,'Q3C':function(z3C,I3C){return z3C==I3C;}
,'z3n':function(I3n,F3n){return I3n<F3n;}
,'h5W':function(q5W,A5W){return q5W==A5W;}
,'c9n':function(J9n,f9n){return J9n-f9n;}
,'L3h':function(C3h,D3h){return C3h-D3h;}
,'i2C':function(p2C,b2C){return p2C-b2C;}
,'T9c':function(d9c,c9c){return d9c!=c9c;}
,'o0K':function(Y0K,G0K){return Y0K-G0K;}
,'t7m':function(x7m,V7m){return x7m==V7m;}
,'j7m':function(l7m,S7m){return l7m/S7m;}
,'g0h':function(w0h,v0h){return w0h/v0h;}
,'c9h':function(J9h,f9h){return J9h/f9h;}
,'D9':function(k9,W9){return k9/W9;}
,'U7c':function(j7c,l7c){return j7c>l7c;}
,'p1m':function(b1m,a1m){return b1m<a1m;}
,'H6W':function(r6W,h6W){return r6W!=h6W;}
,'b5C':function(a5C,Q5C){return a5C*Q5C;}
,'T5D':function(d5D,c5D){return d5D-c5D;}
,'A5m':function(X5m,m5m){return X5m!=m5m;}
,'l1C':function(S1C,o1C){return S1C!=o1C;}
,'I7A':function(F7A,H7A){return F7A>H7A;}
,'W6W':function(g6W,w6W){return g6W%w6W;}
,'C1R':function(D1R,k1R){return D1R/k1R;}
,'r2C':function(h2C,q2C){return h2C==q2C;}
,'T3A':function(d3A,c3A){return d3A-c3A;}
,'H9C':function(r9C,h9C){return r9C!==h9C;}
,'k8A':function(W8A,g8A){return W8A/g8A;}
,'K6J':function(R6J,L6J){return R6J*L6J;}
,'V8':function(O8,K8){return O8/K8;}
,'Y4D':function(G4D,t4D){return G4D-t4D;}
,'n0C':function(e0C,M0C){return e0C==M0C;}
,'f1D':function(B1D,U5D){return B1D*U5D;}
,'R0':function(L0,C0){return L0<C0;}
,'w1m':function(v1m,n1m){return v1m-n1m;}
,'D6A':function(k6A,W6A){return k6A-W6A;}
,'r6K':function(h6K,q6K){return h6K*q6K;}
,'s0n':1,'f7J':function(B7J,U9J){return B7J>U9J;}
,'T2J':function(d2J,c2J){return d2J<=c2J;}
,'B8J':function(U6J,j6J){return U6J<j6J;}
,'p7m':function(b7m,a7m){return b7m===a7m;}
,'U3m':function(j3m,l3m){return j3m===l3m;}
,'L7m':function(C7m,D7m){return C7m!==D7m;}
,'R9':function(L9,C9){return L9>=C9;}
,'c6A':function(J6A,f6A){return J6A-f6A;}
,'i7R':function(p7R,b7R){return p7R<=b7R;}
,'x7J':function(V7J,O7J){return V7J*O7J;}
,'v2m':function(n2m,e2m){return n2m==e2m;}
,'S2R':function(o2R,Y2R){return o2R<Y2R;}
,'G4C':function(t4C,x4C){return t4C==x4C;}
,'S3D':function(o3D,Y3D){return o3D-Y3D;}
,'S2h':function(o2h,Y2h){return o2h==Y2h;}
,'u6W':function(s6W,P6W){return s6W==P6W;}
,'t0c':function(x0c,V0c){return x0c>=V0c;}
,'a9A':function(Q9A,z9A,I9A){return Q9A*z9A/I9A;}
,'P2J':function(N2J,i2J){return N2J-i2J;}
,'V8c':function(O8c,K8c){return O8c>=K8c;}
,'d4m':function(c4m,J4m){return c4m-J4m;}
,'P0c':function(N0c,i0c){return N0c&i0c;}
,'h2J':function(q2J,A2J){return q2J>A2J;}
,'G8J':function(t8J,x8J){return t8J==x8J;}
,'H9h':function(r9h,h9h){return r9h/h9h;}
,'a3c':function(Q3c,z3c){return Q3c/z3c;}
,'g9m':function(w9m,v9m){return w9m==v9m;}
,'f8h':function(B8h,U6h){return B8h*U6h;}
,'Y1R':function(G1R,t1R){return G1R===t1R;}
,'t6h':function(x6h,V6h){return x6h===V6h;}
,'Z2R':function(E2R,u2R){return E2R<u2R;}
,'B6K':function(U2K,j2K){return U2K>j2K;}
,'g7C':function(w7C,v7C){return w7C*v7C;}
,'E2W':function(u2W,s2W){return u2W==s2W;}
,'J7':function(f7,B7){return f7-B7;}
,'T8D':function(d8D,c8D,J8D,f8D){return d8D-c8D+J8D-f8D;}
,'Q7m':function(z7m,I7m){return z7m==I7m;}
,'j2m':function(l2m,S2m){return l2m/S2m;}
,'k6R':function(W6R,g6R){return W6R!==g6R;}
,'w0J':function(v0J,n0J){return v0J-n0J;}
,'K2c':function(R2c,L2c){return R2c/L2c;}
,'z2A':function(I2A,F2A){return I2A<F2A;}
,'L1c':function(C1c,D1c){return C1c<D1c;}
,'W4J':function(g4J,w4J){return g4J-w4J;}
,'b7K':function(a7K,Q7K){return a7K>Q7K;}
,'z3h':function(I3h,F3h){return I3h*F3h;}
,'q9C':function(A9C,X9C){return A9C<X9C;}
,'O3C':function(K3C,R3C){return K3C<=R3C;}
,'p6R':function(b6R,a6R){return b6R!=a6R;}
,'H2m':function(r2m,h2m){return r2m==h2m;}
,'O1A':function(K1A,R1A){return K1A-R1A;}
,'I8W':function(F8W,H8W){return F8W!==H8W;}
,'N5J':function(i5J,p5J){return i5J/p5J;}
,'A8J':function(X8J,m8J){return X8J>m8J;}
,'g8m':function(w8m,v8m){return w8m==v8m;}
,'f3n':(function(){var k4n={}
,l4n=function(S4n,o4n){var Y4n=o4n&((19.40E1,28.)<0x125?(0x1DF,0xffff):(0x15E,3.34E2));var G4n=o4n-Y4n;return ((G4n*S4n|((0x1D9,0x43)<(103,0x1FC)?(0x1DC,0):100<(14.01E2,0x50)?"j":0xCD<(2.88E2,106)?"j":(12.,0xF7)))+(Y4n*S4n|0))|0;}
,B3n=function(t4n,x4n,V4n){if(k4n[V4n]!==undefined){return k4n[V4n];}
var O4n=0xcc9e2d51,K4n=((0x220,7.68E2)>=61?(1.075E3,0x1b873593):(0x5E,80.));var R4n=V4n;var L4n=x4n&~0x3;for(var C4n=((5,9.09E2)>=(8.5E1,0x257)?(0x1AF,0):(0x18C,78.));C4n<L4n;C4n+=4){var D4n=(t4n.charCodeAt(C4n)&0xff)|((t4n.charCodeAt(C4n+1)&0xff)<<8)|((t4n.charCodeAt(C4n+2)&(1.44E2<(97.,0xC1)?(8.25E2,0xff):(4.55E2,28.3E1)))<<16)|((t4n.charCodeAt(C4n+3)&0xff)<<24);D4n=l4n(D4n,O4n);D4n=((D4n&0x1ffff)<<((12,0x210)<(14.94E2,117)?0x188:99.>(45.,0x32)?(0x2B,15):(55,23.3E1)))|(D4n>>>((28.20E1,45.6E1)<=(114.2E1,7.03E2)?(73,17):(52.30E1,62.)>=71?(0x146,'l'):(0xAC,133.)));D4n=l4n(D4n,K4n);R4n^=D4n;R4n=((R4n&((44.90E1,62.)!=(2.77E2,62)?(92.2E1,1.472E3):(0x12A,8.69E2)<(0x20D,104.)?(114.0E1,"b"):(65,80)<(102,118.)?(9.,0x7ffff):(19,0x112)))<<((0x124,0x130)<0x210?(0x14E,13):(9.5E1,9)))|(R4n>>>((0x22F,90.60E1)>0x158?(5,19):(115.,8.31E2)));R4n=(R4n*5+0xe6546b64)|0;}
D4n=0;switch(x4n%4){case 3:D4n=(t4n.charCodeAt(L4n+2)&0xff)<<(2.1E1<(0x6C,27)?(0x129,16):(38,0xF4));case 2:D4n|=(t4n.charCodeAt(L4n+((2.46E2,11.28E2)>=107?(0xFD,1):(6.55E2,3.74E2)))&0xff)<<8;case 1:D4n|=(t4n.charCodeAt(L4n)&0xff);D4n=l4n(D4n,O4n);D4n=((D4n&0x1ffff)<<15)|(D4n>>>17);D4n=l4n(D4n,K4n);R4n^=D4n;}
R4n^=x4n;R4n^=R4n>>>((0x1A9,122.)>=(3.47E2,111.)?(0x218,16):(0x188,0x85)<117.?(51,0.65):(11.57E2,8.05E2));R4n=l4n(R4n,0x85ebca6b);R4n^=R4n>>>(93.<(14.75E2,64.7E1)?(57.7E1,13):0x190<(0x1B6,91.)?(60,'F'):(0x99,6));R4n=l4n(R4n,0xc2b2ae35);R4n^=R4n>>>(2.69E2>=(91.7E1,60.)?(76.0E1,16):(0x20B,56.40E1));k4n[V4n]=R4n;return R4n;}
;return {l4n:l4n,B3n:B3n}
;}
)(),'P8A':function(N8A,i8A){return N8A<i8A;}
,'l1R':function(S1R,o1R){return S1R===o1R;}
,'B3W':function(U4W,j4W){return U4W-j4W;}
,'V1W':function(O1W,K1W){return O1W|K1W;}
,'u2A':function(s2A,P2A){return s2A===P2A;}
,'A2h':function(X2h,m2h){return X2h<m2h;}
,'p6h':function(b6h,a6h){return b6h<a6h;}
,'f2K':function(B2K,U1K){return B2K==U1K;}
,'k7c':function(W7c,g7c){return W7c<=g7c;}
,'p0A':function(b0A,a0A){return b0A<a0A;}
,'O0c':function(K0c,R0c){return K0c&R0c;}
}
;(function(){var H6n=Q9U.d7X.c7X("31")?"createElement":"function",D0p=Q9U.d7X.c7X("f4")?"stx":"rightClickHighlighted",h0n=Q9U.d7X.c7X("67")?"undefined":"timeAsDisplay";function _stxKernel_js(_stxThirdParty,_exports){var p2p=Q9U.d7X.c7X("3e61")?"doCleanupGaps":"createDataSegment",m4p=Q9U.d7X.c7X("4fae")?"dataSet":"appends",E0n=Q9U.d7X.c7X("76")?"dataSegment":"useChartLegend",H3p=Q9U.d7X.c7X("4b81")?"barsStr":"line",X1p=Q9U.d7X.c7X("56")?"rt":"xaxis",a2n="numeric",e7p=0.3,e6p=(1.2710E3<(0x151,131)?(0x154,"H"):(0x18B,3)<=0x101?(0xE7,33):(0x1BB,115.)),f5n="vertical",W5p=Q9U.d7X.c7X("31f8")?"horizontal":"Field",R6n=Q9U.d7X.c7X("3622")?"center":"saveLayout",g8p="right",f0p=Q9U.d7X.c7X("eeab")?"middle":"allowScrollPast",x1p="bottom",R7p="stx_watermark",n5p="mouse",i0n=Q9U.d7X.c7X("7bd3")?"callout":6,M7p=0.2,b7p=0.8,Z2p=20,J9p="el",q6p="stx-show",B1n="os",f6p=Q9U.d7X.c7X("ae")?"Compare To":30,B4p=Q9U.d7X.c7X("b54")?"callRightClick":"stx_solo_lit",S4p=Q9U.d7X.c7X("f5de")?"stx-grab":null,P6n=Q9U.d7X.c7X("f7")?"drawMountainChart":"us",D7p="touchend",E2n="touchmove",z5n="mousedown",M0p="art",p8p="*",r1n="chart",w2p=12,m7p="year",u5p="all",z1n="object",j1p="C",T9p="om",G0n="an",y3p="te",Y0n=((0xBF,12)<94?(4.7E2,"Q"):(5.7E1,146.5E1)),j1n="F",H2p="#FFFFFF",u9p="#000000",D8p="re",J6n="ur",I0n="top",Q3p="le",J8p="f",Y6n="O",k3p=(126<=(21.,1.425E3)?(82.9E1,"."):(0x98,71)),v0p="x_",U2p=32,T7p="week",y2n="D",N8n="ge",M2n="can",d0n="month",L7p="ee",u7X=(24.20E1<=(8.68E2,81.)?(94.10E1,7):99.<(0x244,1.157E3)?(0xBD,"w"):(0xAC,0x4)),L2n="day",c6n="ine",P4p="p",K6p="g",Q2n="calculate",f2n="underlay",J8n="tap",d5n="stx-drag-chart",P7X=250,I1p="mouseup",k9p="stx_",v9p="one",d1p="ne",B8p="no",b1n="stx_crosshair_drawing",S1n="stx_crosshair",i8n="segment",e8n="ar",C0n="upd",c5n="lin",p7X="in",L6p=")",Y1n=" (",W8p="%",R5p=(0x1EF>(0x6,8.55E2)?14:5.45E2<(19.8E1,66.4E1)?(0x11E,10000):(0x9E,0x125)),g5p=((58.2E1,138)<=(0x9B,1.416E3)?(0xD,1000):(11.,95)>0xA7?3.33E2:(0x1CC,0x159)<=4.?0x207:(0x1F3,0x99)),T0n=0.01,u7p=0.1,k7p="measureUnlit",p4p="li",s1p="mMeasure",G7p="_",v5n="inline-block",q1p=((148,74.2E1)<(136.0E1,0x73)?'q':(6.29E2,6.0E1)<=72.?(25,50):(0x3C,5.97E2)),p1p=60,T7X="v",t7p="mousemove",d2p="px",s5p="none",Z2n="block",H7p="stx-crosshair-on",x2p="dl",a5p=100,S2p="millisecond",Y2p="second",G7X=":",K8n="tA",r4p="ec",u0n="R",i8p="to",G2n="au",S8p="stx_candle_shadow",l8n="stx_candle_down",R0n="stx_candle_up",A7p="ned",O5p="nd",P3p=((49.2E1,0x14D)>=30.?(2.260E2,"u"):(0xD6,26.)),F7p="ed",Z8p="h",H5p="z",S0p="n",L0p="o",p5n="er",B5p="y",T5n="et",g6n="P",c1n=((0x3A,3.95E2)<=19.1E1?(35.,8.05E2):142.>=(0x50,0x20)?(73,"a"):22>(106.,93.80E1)?(0x95,12):(70,0x9)),N7p="ef",W0p=((138,101.7E1)<(0xAD,8.5E1)?(0xA8,'px'):(119.10E1,115.)<=34.1E1?(0x197,"l"):(0xB7,6.4E1)>=0x4C?(0x1D4,'W'):(0xE4,93.7E1)),r8p="i",o2p="left",t2n="stx_grid_border",m7X="border",R1n="fill",n3p="text",j5n="st",T6n="stroke",M2p="grid",Q8n="stx_yaxis",h7p="drawYAxis",w7p=0.5,w3p="",d4p=((0xCB,0x1CF)>=(0xD1,22)?(0x163,"0"):42.>=(57.1E1,0x32)?(0xB4,'Q'):(106.2E1,62)>114.80E1?(19,'Q'):(144.,0x2F)),q2p=10,V0p=((14.,0xF4)>1.1260E3?66.:(0x134,0xBA)>=(17.40E1,0x3F)?(65.,"1"):(80.,29.90E1)>=54.80E1?(109,'a'):(128,49)),a0p="m",G2p=". ",W7p="rror",p9p="on",y4p="ti",e1p=": ",g4p=((3.280E2,0x32)<=83.9E1?(7.5E1,"s"):(0x1DB,0x73)),n5n=(48.<(0x131,118)?(0x94,"e"):(0x107,6.60E1)),A1p="is",k7X=((103,83.60E1)<=0xCD?false:(0x43,0x1BF)>=0x219?(47.5E1,54.):(43.0E1,63)<19.70E1?(126.,"x"):(0x153,14.75E2)),f9p=((1.99E2,66.)<0xCC?(33.,"X"):(6.48E2,61.)<=(31,33.)?(0x22B,3.550E2):(4.3E1,21.)),O8p="k",w2n="ic",R8n="T",a1p=((0x14A,3.570E2)>=0x11A?(6.0E1,"A"):(0x6B,1.69E2)>=9.39E2?(0xA8,0.0):(0x5,0x49)),E3p="t",e5n="c",o4p="r",S5n=(69.9E1>=(120,3.5E1)?(12.51E2,"d"):(148.,120.9E1)),Z1n="drawing",o2n="vector",f0n="layout",b5n=" ",y9p="transparent",I1n="b",c8n="div",R4p="-",U5p=false,L8p=true,B9p="#zoomOut",K8p="#zoomIn",c0p=((0x23F,0xB6)>(3,136)?(46,"#"):21.90E1>=(13.63E2,1.29E3)?(137,0x129):(21.,33.)>=(4.60E1,118)?(144,0x8D):(9.8E1,0x131)),z9p='dl',C5p='lo',l6n='ow',b5p='co',O9p='las',C8n='it',E6n='ane',y0n='trol',c2n='nel',l2n='> ',x0p='pan',T1p='dle',v6p='play',R9p='ate',U1p='oa',c6p='f',b4p='spl',Q7p='tod',G5p='um',t7X=(30.3E1>=(2.,0)?(104.,'j'):(0x111,9.48E2)),v2n='ome',k6n='In',n7X='ut',a5n='Ou',V1n='oo',F1n='z',V1p='hartSize',z2p=';"><',e7X='2px',w0n='2',P1n='om',A3p='tt',J1n='lay',Y1p='tyl',g9p='ols',s9p='tr',n8n='rt_co',X9p='tx_',R5n='lass',j0p='one',Y6p='cro',u6n='air',n2p='sh',B0p='ros',B2n='iv',N7X=';"></',b2n='ay',J5p='yle',T8p='r_x',m1p='ai',l0p='_cro',D6n='shair',j8n='os',p3p='x_c',v2p='>)</',h2n='ana',Q9p='eM',K0n='ou',G9p='ele',s7X='ck',B2p='li',c9p='ig',t8n='">',I8p='xt',T3p=((104.60E1,0x17D)>(0x1A2,149)?(6,'T'):20.1E1>=(0x2E,1.344E3)?(31.70E1,0x20A):(10.44E2,75)),L8n='lete',M1p='De',K4p='><',j7p='>(</',L4p='uctio',T5p='eInst',h5n='let',k5n=((0x1DD,0x257)>=(0x239,0x169)?(0xAB,'D'):(100.5E1,149.0E1)),X6p='se',R3p='u',B7p='></',l6p=';</',j9p='">&',V8p='ras',g3p='"><',K7p='tn',V2n='Ca',Q7X='h',z8n='as',o0p='Tr',k2n='rla',P6p='=""><',E5p='k',V5n='ic',A9p='Cl',x4p='ht',w7X='g',S5p='yRi',E8p='> <',X4p='"></',Z7p='r',s8n='eri',b3p='nt',G3p='I',g1p='ticky',V4p='S',H0n='"> <',V7X='ick',j5p='St',N9p='v',K5n='nc',F9p='0px',T8n=(0x6C>=(0x19E,37)?(57,'1'):(42.0E1,2.86E2)>=84.5E1?10000:(97.,0xBA)),U2n=((55,0x1B5)>8?(10.55E2,':'):(1.049E3,11.64E2)),J2n='ef',h8n='in',L3p='rg',y1p='m',L2p='; ',W1n='on',E0p='pl',L0n='is',i6p='le',z4p='ty',W2n='el',O2n='anc',h1p='_c',Y3p='tion',p0p='nnota',O4p='x_a',e0p='ass',i5n=((0xCB,26)>=(1.403E3,119)?'F':(115.5E1,88.80E1)>=(20.8E1,0x160)?(0x219,'>'):(15.70E1,49.6E1)<0x59?0.5:(145.,3.84E2)),r7X='</',I7X='ve',O0p=';">',m1n='ne',D5p=((147.,140.8E1)<=(138,66.)?'z':5.49E2>=(121.,0x1B)?(14.94E2,'o'):(3.,6.15E2)<3.61E2?(36.5E1,'z'):(71.,45.5E1)),q8p=': ',Z5n='y',S1p='a',I5p='l',o9p='p',m5p='i',A2p='d',s6p='e',O7p='yl',M8n='" ',H0p='ave',e8p='on_',u1p='tati',t8p='no',O0n='an',i1p='_',s4p='tx',D1p='b',F8n='-',O5n='x',l3p='t',W6p='="',t0n='ss',g1n='la',P2p='c',m6p=' ',t5p='n',P9p='pa',X7p='s',p2n='<',G8p=null,H=function(A){STX.Comparison.mouseHasMoved=A;}
,Q=function(F){STXChart.CANDLEEVEN=F;}
,P=function(N){STXChart.CANDLEDOWN=N;}
,E=function(u){STXChart.CANDLEUP=u;}
,M=function(Z){STXChart.CLOSEEVEN=Z;}
,k=function(W){STXChart.CLOSEDOWN=W;}
,C=function(D){STXChart.CLOSEUP=D;}
,R=function(L){STXChart.NONE=L;}
,O=function(K){STX.camelCaseRegExp=K;}
,plotSpline=_stxThirdParty.plotSpline,plotSplinePrimitive=_stxThirdParty.plotSplinePrimitive,timezoneJS=_stxThirdParty.timezoneJS,STX=_exports.STX,STXChart=_exports.STXChart,$$=_exports.$$,$$$=_exports.$$$;STXChart.prototype.plugins={}
;if(STX.isSurface){var G=function(V){STX.gesturePointerId=V;}
,S=function(Y){STX.gesture.target=Y.body;}
;STX.gesture=new MSGesture();S(document);G(G8p);}
STXChart.htmlControls={"annotationSave":(p2n+X7p+P9p+t5p+m6p+P2p+g1n+t0n+W6p+X7p+l3p+O5n+F8n+D1p+l3p+t5p+m6p+X7p+s4p+i1p+O0n+t8p+u1p+e8p+X7p+H0p+M8n+X7p+l3p+O7p+s6p+W6p+A2p+m5p+X7p+o9p+I5p+S1p+Z5n+q8p+t5p+D5p+m1n+O0p+X7p+S1p+I7X+r7X+X7p+o9p+O0n+i5n),"annotationCancel":(p2n+X7p+o9p+S1p+t5p+m6p+P2p+I5p+e0p+W6p+X7p+s4p+F8n+D1p+l3p+t5p+m6p+X7p+l3p+O4p+p0p+Y3p+h1p+O2n+W2n+M8n+X7p+z4p+i6p+W6p+A2p+L0n+E0p+S1p+Z5n+q8p+t5p+W1n+s6p+L2p+y1p+S1p+L3p+h8n+F8n+I5p+J2n+l3p+U2n+T8n+F9p+O0p+P2p+S1p+K5n+W2n+r7X+X7p+o9p+O0n+i5n),"mSticky":(p2n+A2p+m5p+N9p+m6p+m5p+A2p+W6p+y1p+j5p+V7X+Z5n+H0n+X7p+P9p+t5p+m6p+m5p+A2p+W6p+y1p+V4p+g1p+G3p+b3p+s8n+D5p+Z7p+X4p+X7p+o9p+S1p+t5p+E8p+X7p+P9p+t5p+m6p+m5p+A2p+W6p+y1p+j5p+V7X+S5p+w7X+x4p+A9p+V5n+E5p+M8n+P2p+g1n+t0n+P6p+X7p+o9p+S1p+t5p+m6p+m5p+A2p+W6p+D5p+I7X+k2n+Z5n+o0p+z8n+Q7X+V2n+t5p+M8n+P2p+I5p+S1p+t0n+W6p+X7p+s4p+F8n+D1p+K7p+M8n+X7p+z4p+i6p+W6p+A2p+L0n+o9p+g1n+Z5n+U2n+t5p+W1n+s6p+g3p+X7p+o9p+O0n+m6p+P2p+g1n+t0n+W6p+X7p+s4p+F8n+m5p+P2p+D5p+F8n+l3p+V8p+Q7X+j9p+t5p+D1p+X7p+o9p+l6p+X7p+o9p+S1p+t5p+B7p+X7p+o9p+S1p+t5p+E8p+X7p+o9p+O0n+m6p+m5p+A2p+W6p+y1p+D5p+R3p+X6p+k5n+s6p+h5n+T5p+Z7p+L4p+t5p+X7p+g3p+X7p+o9p+S1p+t5p+j7p+X7p+o9p+S1p+t5p+K4p+X7p+P9p+t5p+m6p+m5p+A2p+W6p+y1p+D5p+R3p+X7p+s6p+M1p+L8n+T3p+s6p+I8p+t8n+Z7p+c9p+x4p+F8n+P2p+B2p+s7X+m6p+l3p+D5p+m6p+A2p+G9p+l3p+s6p+r7X+X7p+o9p+O0n+K4p+X7p+o9p+O0n+m6p+m5p+A2p+W6p+y1p+K0n+X7p+Q9p+h2n+w7X+s6p+T3p+s6p+I8p+t8n+Z7p+c9p+x4p+F8n+P2p+I5p+m5p+P2p+E5p+m6p+l3p+D5p+m6p+y1p+S1p+t5p+S1p+w7X+s6p+r7X+X7p+P9p+t5p+K4p+X7p+o9p+S1p+t5p+v2p+X7p+o9p+S1p+t5p+B7p+X7p+o9p+O0n+B7p+X7p+o9p+S1p+t5p+B7p+A2p+m5p+N9p+i5n),"crossX":(p2n+A2p+m5p+N9p+m6p+P2p+g1n+X7p+X7p+W6p+X7p+l3p+p3p+Z7p+j8n+D6n+m6p+X7p+s4p+l0p+X7p+X7p+Q7X+m1p+T8p+M8n+X7p+l3p+J5p+W6p+A2p+m5p+X7p+E0p+b2n+q8p+t5p+W1n+s6p+N7X+A2p+m5p+N9p+i5n),"crossY":(p2n+A2p+B2n+m6p+P2p+I5p+e0p+W6p+X7p+s4p+i1p+P2p+B0p+n2p+u6n+m6p+X7p+l3p+O5n+i1p+Y6p+t0n+Q7X+u6n+i1p+Z5n+M8n+X7p+z4p+i6p+W6p+A2p+L0n+E0p+S1p+Z5n+q8p+t5p+j0p+N7X+A2p+B2n+i5n),"chartControls":(p2n+A2p+m5p+N9p+m6p+P2p+R5n+W6p+X7p+X9p+P2p+Q7X+S1p+n8n+t5p+s9p+g9p+M8n+X7p+Y1p+s6p+W6p+A2p+L0n+o9p+J1n+q8p+t5p+W1n+s6p+L2p+D1p+D5p+A3p+P1n+q8p+w0n+e7X+z2p+A2p+m5p+N9p+m6p+m5p+A2p+W6p+P2p+V1p+g3p+X7p+o9p+S1p+t5p+m6p+m5p+A2p+W6p+F1n+V1n+y1p+a5n+l3p+M8n+P2p+I5p+z8n+X7p+W6p+X7p+s4p+F8n+F1n+D5p+P1n+F8n+D5p+n7X+X4p+X7p+o9p+O0n+K4p+X7p+o9p+S1p+t5p+m6p+m5p+A2p+W6p+F1n+V1n+y1p+k6n+M8n+P2p+I5p+S1p+t0n+W6p+X7p+l3p+O5n+F8n+F1n+D5p+D5p+y1p+F8n+m5p+t5p+X4p+X7p+o9p+S1p+t5p+B7p+A2p+m5p+N9p+B7p+A2p+B2n+i5n),"home":(p2n+A2p+m5p+N9p+m6p+m5p+A2p+W6p+Q7X+v2n+M8n+P2p+I5p+S1p+X7p+X7p+W6p+X7p+l3p+O5n+i1p+t7X+G5p+o9p+i1p+Q7p+b2n+m6p+Q7X+v2n+M8n+X7p+l3p+J5p+W6p+A2p+m5p+b4p+b2n+U2n+t5p+D5p+m1n+g3p+X7p+P9p+t5p+B7p+X7p+o9p+S1p+t5p+B7p+A2p+B2n+i5n),"floatDate":(p2n+A2p+m5p+N9p+m6p+P2p+I5p+S1p+t0n+W6p+X7p+s4p+F8n+c6p+I5p+U1p+l3p+F8n+A2p+R9p+M8n+X7p+z4p+i6p+W6p+A2p+L0n+v6p+q8p+t5p+D5p+m1n+N7X+A2p+B2n+i5n),"handleTemplate":(p2n+A2p+B2n+m6p+P2p+g1n+t0n+W6p+X7p+s4p+F8n+m5p+P2p+D5p+F8n+Q7X+S1p+t5p+T1p+M8n+X7p+l3p+Z5n+I5p+s6p+W6p+A2p+L0n+o9p+g1n+Z5n+q8p+t5p+W1n+s6p+z2p+X7p+x0p+B7p+X7p+P9p+t5p+B7p+A2p+m5p+N9p+l2n),"iconsTemplate":(p2n+A2p+B2n+m6p+P2p+g1n+X7p+X7p+W6p+X7p+s4p+F8n+o9p+S1p+c2n+F8n+P2p+W1n+y0n+g3p+A2p+B2n+m6p+P2p+I5p+S1p+X7p+X7p+W6p+X7p+l3p+O5n+F8n+o9p+E6n+I5p+F8n+l3p+C8n+i6p+X4p+A2p+B2n+K4p+A2p+m5p+N9p+m6p+P2p+I5p+z8n+X7p+W6p+X7p+s4p+F8n+D1p+K7p+F8n+o9p+O0n+W2n+g3p+X7p+x0p+m6p+P2p+O9p+X7p+W6p+X7p+s4p+F8n+m5p+b5p+F8n+R3p+o9p+X4p+X7p+P9p+t5p+B7p+A2p+m5p+N9p+K4p+A2p+m5p+N9p+m6p+P2p+I5p+e0p+W6p+X7p+s4p+F8n+D1p+K7p+F8n+o9p+O0n+W2n+g3p+X7p+o9p+O0n+m6p+P2p+I5p+S1p+t0n+W6p+X7p+s4p+F8n+m5p+b5p+F8n+c6p+D5p+P2p+R3p+X7p+X4p+X7p+P9p+t5p+B7p+A2p+m5p+N9p+K4p+A2p+B2n+m6p+P2p+I5p+S1p+t0n+W6p+X7p+s4p+F8n+D1p+K7p+F8n+o9p+S1p+m1n+I5p+g3p+X7p+P9p+t5p+m6p+P2p+O9p+X7p+W6p+X7p+s4p+F8n+m5p+b5p+F8n+A2p+l6n+t5p+X4p+X7p+P9p+t5p+B7p+A2p+B2n+K4p+A2p+B2n+m6p+P2p+I5p+z8n+X7p+W6p+X7p+s4p+F8n+D1p+K7p+F8n+o9p+E6n+I5p+g3p+X7p+o9p+O0n+m6p+P2p+I5p+S1p+X7p+X7p+W6p+X7p+l3p+O5n+F8n+m5p+b5p+F8n+s6p+A2p+C8n+X4p+X7p+P9p+t5p+B7p+A2p+m5p+N9p+K4p+A2p+m5p+N9p+m6p+P2p+I5p+e0p+W6p+X7p+s4p+F8n+D1p+l3p+t5p+F8n+o9p+S1p+m1n+I5p+g3p+X7p+o9p+O0n+m6p+P2p+I5p+e0p+W6p+X7p+l3p+O5n+F8n+m5p+b5p+F8n+P2p+C5p+X6p+X4p+X7p+o9p+S1p+t5p+B7p+A2p+m5p+N9p+B7p+A2p+B2n+i5n),"baselineHandle":(p2n+A2p+m5p+N9p+m6p+P2p+I5p+S1p+t0n+W6p+X7p+s4p+F8n+D1p+S1p+X7p+W2n+m5p+m1n+F8n+Q7X+S1p+t5p+z9p+s6p+m6p+c6p+S1p+M8n+X7p+l3p+Z5n+I5p+s6p+W6p+A2p+m5p+X7p+E0p+b2n+q8p+t5p+W1n+s6p+N7X+A2p+B2n+i5n),}
;STXChart.prototype.registerHTMLElements=function(){var N1p="DIV",h5p="chartControls",c=this.chart.container;for(var control in STXChart.htmlControls){if(typeof this.chart[control]==h0n&&typeof this.controls[control]==h0n){if(!this.allowZoom&&Q9U.J(control,h5p))continue;var el=$$$(c0p+control,c);if(el){this.chart[control]=el;this.controls[control]=el;}
else{var rawHTML=STXChart.htmlControls[control],div=document.createElement(N1p);div.innerHTML=rawHTML;el=div.firstChild;c.appendChild(el);this.chart[control]=el;this.controls[control]=el;el.id=control;}
}
}
if(this.controls.chartControls){var zoomIn=$$$(K8p,this.controls.chartControls),zoomOut=$$$(B9p,this.controls.chartControls);STX.safeClickTouch(zoomIn,(function(self){return function(e){self.zoomIn();e.stopPropagation();}
;}
)(this));STX.safeClickTouch(zoomOut,(function(self){return function(e){self.zoomOut();e.stopPropagation();}
;}
)(this));if(!STX.touchDevice){zoomIn.onmouseover=(function(self){return function(e){self.modalBegin();}
;}
)(this);zoomIn.onmouseout=(function(self){return function(e){self.modalEnd();}
;}
)(this);zoomOut.onmouseover=(function(self){return function(e){self.modalBegin();}
;}
)(this);zoomOut.onmouseout=(function(self){return function(e){self.modalEnd();}
;}
)(this);}
}
if(this.controls.home){STX.safeClickTouch(this.controls.home,(function(self){return function(e){self.home({animate:L8p}
);e.stopPropagation();}
;}
)(this));if(!STX.touchDevice){this.controls.home.onmouseover=(function(self){return function(e){self.modalBegin();}
;}
)(this);this.controls.home.onmouseout=(function(self){return function(e){self.modalEnd();}
;}
)(this);}
}
}
;O(/-([a-z])/g);STX.makeCamelCase=function(name){return name.replace(STX.camelCaseRegExp,function(g){return g[Q9U.s0n].toUpperCase();}
);}
;STXChart.prototype.cloneStyle=function(styleObject){var i2p="backgroundAttachment",rc={}
,nativeCamelSupport=U5p;function capitalize(g){return g[Q9U.s0n].toUpperCase();}
for(var i in styleObject){var v=styleObject[i];if(Q9U.j7(i,i2p))nativeCamelSupport=L8p;if(nativeCamelSupport){if(v&&Q9U.o7(v.constructor,String)&&isNaN(i)){rc[i]=v;}
}
else if(!isNaN(i)){var x=styleObject.getPropertyValue(v);if(x){v=v.split(R4p);var ii=Q9U.P0n;jj=v.length;var vcc=v[Q9U.P0n];while(++ii<jj){vcc+=v[ii].charAt(Q9U.P0n).toUpperCase()+v[ii].slice(Q9U.s0n);}
rc[vcc]=x;}
}
else{var icc=i.replace(STX.camelCaseRegExp,capitalize);rc[icc]=v;}
}
return rc;}
;STXChart.prototype.canvasStyle=function(className){var s=this.styles[className];if(!s){var div=document.createElement(c8n);div.className=className;document.body.appendChild(div);var styles=getComputedStyle(div);s=this.styles[className]=this.cloneStyle(styles);document.body.removeChild(div);if(!styles){this.styles[className]=G8p;}
}
return s;}
;STXChart.prototype.colorOrStyle=function(str){var U6p="(",i4p="rg",C4p="rgba(",o5n=(30.5E1>(0x13C,2.5E2)?(62.40E1,5537595):(84.80E1,74.2E1)<9?(79,'D'):(0xF8,66.)),K0p=1158437,w4p=862971282,c7p=524740276;if(str.indexOf(c0p)!=-Q9U.s0n)return str;var p4n=-c7p,b4n=-w4p,i4n=Q9U.M0n;for(var N4n=Q9U.s0n;Q9U.f3n.B3n(N4n.toString(),N4n.toString().length,K0p)!==p4n;N4n++){i4n+=Q9U.M0n;}
if(Q9U.f3n.B3n(i4n.toString(),i4n.toString().length,o5n)!==b4n){context.lineTo(Math.floor(xbase),previousOpen);this.activeDrawing.abort();}
if(str.indexOf(C4p)!=-Q9U.s0n)return str;if(str.indexOf((i4p+I1n+U6p))!=-Q9U.s0n)return str;if(Q9U.t7(str,y9p))return str;return this.canvasStyle(str);}
;STXChart.prototype.clearStyles=function(){this.styles={}
;}
;STXChart.prototype.setStyle=function(obj,attribute,value){if(!this.styles[obj]){this.canvasStyle(obj);}
if(!this.styles[obj])this.styles[obj]={}
;this.styles[obj][STX.makeCamelCase(attribute)]=value;}
;STXChart.prototype.canvasFont=function(className,ctx){var A6n="bad css style for class ";if(!ctx)ctx=this.chart.context;var style=this.canvasStyle(className);if(!style)return ;var result=style.fontStyle+b5n+style.fontWeight+b5n+style.fontSize+b5n+style.fontFamily;if(result.indexOf(h0n)==-Q9U.s0n){ctx.font=result;}
else{this.styles[className]=G8p;console.log(A6n+className);}
}
;STXChart.prototype.canvasColor=function(className,ctx){if(!ctx)ctx=this.chart.context;var style=this.canvasStyle(className);if(!style)return ;var color=style.color;if(STX.isTransparent(color))color=this.defaultColor;ctx.globalAlpha=1;ctx.fillStyle=color;ctx.strokeStyle=color;var opacity=style.opacity;if(typeof opacity!=h0n)ctx.globalAlpha=opacity;}
;STXChart.prototype.getCanvasFontSize=function(className){var K6n="12",s=this.canvasStyle(className),fs=s.fontSize;if(!fs)fs=K6n;return parseInt(STX.stripPX(fs));}
;STXChart.prototype.getCanvasColor=function(className){var s=this.canvasStyle(className);return s.color;}
;STXChart.hideDates=function(){return U5p;}
;STXChart.prototype.runPrepend=function(o,args,self){var prepends=this["prepend"+o];if(!prepends)return false;if(!self)self=this;for(var i=0;Q9U.O7(i,prepends.length);i++){var rv=prepends[i].apply(self,args);if(rv)return rv;}
return false;}
;STXChart.prototype.runAppend=function(o,args,self){var appends=this["append"+o];if(!appends)return false;if(!self)self=this;for(var i=0;Q9U.L7(i,appends.length);i++){var rv=appends[i].apply(self,args);if(rv)return rv;}
return false;}
;STXChart.registerDrawingTool=function(name,func){STXChart.drawingTools[name]=func;}
;STXChart.prototype.createBlock=function(left,width,top,height,className,context){if(!context)context=this.chart.context;if(typeof (height)=="undefined"){return ;}
this.canvasColor(className,context);context.fillRect(left,top,width,height);context.globalAlpha=1;}
;STXChart.prototype.changeOccurred=function(change){if(this.currentlyImporting)return ;if(this.changeCallback)this.changeCallback(this,change);if(Q9U.k7(change,f0n)){this.dispatch(f0n,this.layout);}
else if(Q9U.w7(change,o2n)){this.dispatch(Z1n,this.drawingObjects);}
}
;STXChart.prototype.setChartType=function(chartType){this.layout.chartType=chartType;if(this.displayInitialized)this.draw();this.changeOccurred(f0n);}
;STXChart.prototype.setAggregationType=function(aggregationType){this.layout.aggregationType=aggregationType;if(this.chart.canvas){this.createDataSet();this.draw();}
this.changeOccurred("layout");}
;STXChart.prototype.setChartScale=function(chartScale){if(!chartScale)chartScale="linear";this.layout.chartScale=chartScale;if(this.chart.canvas)this.draw();this.changeOccurred("layout");}
;STXChart.prototype.setAdjusted=function(data){this.layout.adj=data;if(this.chart.canvas){this.createDataSet();this.draw();}
this.changeOccurred((f0n));}
;STXChart.prototype.setVolumeUnderlay=function(data){this.layout.volumeUnderlay=data;if(this.chart.canvas)this.draw();this.changeOccurred("layout");}
;STXChart.prototype.serializeDrawings=function(){var arr=[];for(var i=0;Q9U.e7(i,this.drawingObjects.length);i++){arr.push(this.drawingObjects[i].serialize());}
return arr;}
;STXChart.prototype.abortDrawings=function(){for(var i=0;Q9U.E7(i,this.drawingObjects.length);i++){this.drawingObjects[i].abort(true);}
this.drawingObjects=[];}
;STXChart.prototype.reconstructDrawings=function(arr){for(var i=0;Q9U.P7(i,arr.length);i++){var rep=arr[i];if(Q9U.p7(rep.name,"fibonacci"))rep.name="retracement";var Factory=STXChart.drawingTools[rep.name];if(!Factory){if(STX.Drawing[rep.name]){Factory=STX.Drawing[rep.name];STXChart.registerDrawingTool(rep.name,Factory);}
}
if(Factory){var drawing=new Factory();drawing.reconstruct(this,rep);this.drawingObjects.push(drawing);}
}
}
;STXChart.prototype.clearDrawings=function(cantUndo){var before=STX.shallowClone(this.drawingObjects);this.abortDrawings();if(cantUndo){this.undoStamps=[];}
else{this.undoStamp(before,STX.shallowClone(this.drawingObjects));}
this.changeOccurred(o2n);this.createDataSet();this.draw();}
;STXChart.prototype.createDrawing=function(type,parameters){var drawing=new STX.Drawing[type]();drawing.reconstruct(this,parameters);this.drawingObjects.push(drawing);this.draw();return drawing;}
;STXChart.prototype.removeDrawing=function(drawing){for(var i=0;Q9U.Q7(i,this.drawingObjects.length);i++){if(Q9U.F7(this.drawingObjects[i],drawing)){this.drawingObjects.splice(i,1);this.changeOccurred("vector");this.draw();return ;}
}
}
;STXChart.prototype.dateFromTick=function(tick,chart,nativeDate){if(!chart)chart=this.chart;var data_len=chart.dataSet.length,dt,iter,ctr=0;if(Q9U.h7(tick,0)){iter=this.standardMarketIterator(chart.dataSet[0].DT);while(Q9U.X7(ctr,tick)){dt=iter.previous();ctr-=1;}
}
else if(Q9U.T7(tick,data_len)){iter=this.standardMarketIterator(chart.dataSet[Q9U.J7(data_len,1)].DT);while(Q9U.U9(data_len-1+ctr,tick)){dt=iter.next();ctr+=1;}
}
else{dt=chart.dataSet[tick].DT;}
if(nativeDate){return new Date(dt.getTime());}
return STX.yyyymmddhhmm(dt);}
;STXChart.prototype.calculateYAxisMargins=function(yAxis){yAxis.zoom=yAxis.initialMarginTop+yAxis.initialMarginBottom;yAxis.scroll=Q9U.S9((yAxis.initialMarginTop-yAxis.initialMarginBottom),Q9U.M0n);}
;STXChart.prototype.home=function(params){var B1p="har",U9p="ag";this.swipe.amplitude=0;this.grabbingScreen=false;if(STXChart.insideChart)STX.unappendClassName(this.container,(D0p+R4p+S5n+o4p+U9p+R4p+e5n+B1p+E3p));if(typeof params!="object"){params={maintainWhitespace:params}
;}
if(typeof params.maintainWhitespace=="undefined")params.maintainWhitespace=true;this.cancelTouchSingleClick=true;if(!this.chart.dataSet||!this.chart.dataSet.length){this.draw();return ;}
this.micropixels=0;var barsDisplayedOnScreen=Math.floor(Q9U.G9(this.chart.width,this.layout.candleWidth));for(var chartName in this.charts){var chart=this.charts[chartName];if(params.chart&&Q9U.V9(params.chart,chart))continue;var homeScroll=Math.min(barsDisplayedOnScreen+1,chart.dataSet.length);if(this.chart.allowScrollPast)homeScroll=barsDisplayedOnScreen+1;var wsInTicks;if(params.maintainWhitespace&&Q9U.R9(this.preferences.whitespace,0)){wsInTicks=Q9U.D9(this.preferences.whitespace,this.layout.candleWidth);homeScroll-=wsInTicks;}
if(Q9U.g9(this.yaxisLabelStyle,"roundRectArrow")&&!((Q9U.n9(this.layout.chartType,"line")||Q9U.Z9(this.layout.chartType,"mountain"))&&this.extendLastTick)){var margin=3,height=this.getCanvasFontSize("stx_yaxis")+Q9U.s9(margin,2),leftMargin=Q9U.i9(height,0.66);wsInTicks=Q9U.a9(leftMargin,this.layout.candleWidth);if(Q9U.I9(wsInTicks,1))homeScroll-=wsInTicks;}
homeScroll=Math.ceil(homeScroll);if(params.animate){var self=this;this.scrollTo(chart,homeScroll,function(self,chart,homeScroll){return function(){self.calculateYAxisMargins(chart.panel.yAxis);chart.scroll=homeScroll;self.draw();}
;}
(self,chart,homeScroll));}
else{chart.scroll=homeScroll;this.calculateYAxisMargins(chart.panel.yAxis);}
}
this.draw();}
;STXChart.prototype.tickFromDate=function(dt,chart,adj,forward){if(!chart)chart=this.chart;if(!chart.dataSet||!chart.dataSet.length)return 0;if(!adj)adj=0;if(!chart){chart=this.chart;}
var target=Q9U.r9(dt.constructor,Date)?dt:STX.strToDateTime(dt);if(!STXChart.isDailyInterval(this.layout.interval))target.setMinutes(target.getMinutes()+adj);var ms=target.getTime(),total=chart.tickCache[ms];if(total||Q9U.A9(total,0)){return total;}
var firstDate=chart.dataSet[0].DT,lastDate=chart.dataSet[Q9U.y9(chart.dataSet.length,1)].DT;if(Q9U.c9(target,firstDate)&&Q9U.B9(target,lastDate)){for(var i=0;Q9U.l3(i,chart.dataSet.length);i++){var d=chart.dataSet[i].DT;if(Q9U.Y3(d.getTime(),target.getTime())){chart.tickCache[ms]=i;return i;}
if(Q9U.x3(d,target)){chart.tickCache[ms]=forward?i:Q9U.K3(i,1);return chart.tickCache[ms];}
}
}
var intoThePast=Q9U.C3(target,firstDate),start=intoThePast?firstDate:lastDate,iter=this.standardMarketIterator(start),ticks=iter.futureTick({end:target}
);total=intoThePast?ticks*-1:Q9U.W3(chart.dataSet.length,1,ticks);chart.tickCache[ms]=total;return total;}
;STXChart.XAxisLabel=function(hz,grid,text){this.hz=hz;this.grid=grid;this.text=text;}
;STXChart.prototype.createXAxis=function(chart){var C5n="xis",b1p="eateX";if(Q9U.n3(chart.dataSegment.length,0))return null;if(STXChart.hideDates())return null;var arguments$=[chart],axisRepresentation=this.runPrepend("createXAxis",arguments$);if(axisRepresentation)return axisRepresentation;var interval=this.layout.interval;if(Q9U.Z3(chart.xAxis.axisType,"numeric")){return this.createNumericXAxis(chart);}
axisRepresentation=this.createTickXAxisWithDates(chart);this.runAppend((e5n+o4p+b1p+a1p+C5n),arguments$);return axisRepresentation;}
;STXChart.prototype.drawXAxis=function(chart,axisRepresentation){var arguments$=[chart,axisRepresentation];if(this.runPrepend("drawXAxis",arguments$))return ;if(!axisRepresentation)return ;var priorBoundary=null,context=this.chart.context;this.canvasFont("stx_xaxis");context.textAlign="center";context.textBaseline="middle";var obj;for(var j=0;Q9U.s3(j,axisRepresentation.length);j++){obj=axisRepresentation[j];var w=context.measureText(obj.text+"   ").width,w2=Math.max(w,chart.xAxis.minimumLabelWidth);obj.hz=Math.floor(obj.hz+this.micropixels)+0.5;obj.left=Q9U.i3(obj.hz,(w2/2));obj.right=obj.hz+(Q9U.a3(w2,2));obj.unpaddedRight=obj.hz+(Q9U.I3(w,2));}
var plotter=new STX.Plotter();plotter.newSeries("line","stroke",this.canvasStyle("stx_grid"));plotter.newSeries("boundary","stroke",this.canvasStyle("stx_grid_dark"));plotter.newSeries("border","stroke",this.canvasStyle("stx_grid_border"));var bottom=chart.panel.bottom,yAxis=chart.panel.yAxis,prevRight=-1,nextBoundaryLeft=Math.MAX_VALUE,drawBorders=chart.xAxis.displayBorder||Q9U.r3(chart.xAxis.displayBorder,null);if(Q9U.A3(this.axisBorders,true))drawBorders=true;if(Q9U.y3(this.axisBorders,false))drawBorders=false;var b=drawBorders?Q9U.c3(yAxis.bottom,0.5):yAxis.bottom,middle=Q9U.B3(bottom,this.xaxisHeight/2);if(drawBorders)middle+=3;for(var nb=0;Q9U.l4(nb,axisRepresentation.length);nb++){if(Q9U.Y4(axisRepresentation[nb].grid,"boundary")){nextBoundaryLeft=axisRepresentation[nb].left;break;}
}
var prevHz=0,count=0;for(var i=0;Q9U.x4(i,axisRepresentation.length);i++){obj=axisRepresentation[i];if(Q9U.K4(i,nb)){for(nb++;Q9U.C4(nb,axisRepresentation.length);nb++){if(Q9U.W4(axisRepresentation[nb].grid,"boundary")){nextBoundaryLeft=axisRepresentation[nb].left;break;}
}
if(Q9U.v4(nb,axisRepresentation.length)){nb=-1;nextBoundaryLeft=Math.MAX_VALUE;}
if(prevRight>-1){if(Q9U.M4(obj.left,prevRight))continue;}
}
else{if(prevRight>-1){if(Q9U.u4(obj.left,prevRight))continue;}
if(Q9U.N4(obj.right,nextBoundaryLeft))continue;}
prevRight=obj.right;if((Q9U.b4(Math.floor(obj.unpaddedRight),this.chart.right))){count++;if(chart.xAxis.displayGridLines){plotter.moveTo(obj.grid,obj.hz,yAxis.top);plotter.lineTo(obj.grid,obj.hz,b);}
if(drawBorders){plotter.moveTo("border",obj.hz,b+0.5);plotter.lineTo("border",obj.hz,b+6);}
prevHz=obj.hz;this.canvasColor(Q9U.z4(obj.grid,"boundary")?"stx_xaxis_dark":"stx_xaxis");context.fillText(obj.text,obj.hz,middle);}
}
if(drawBorders){var bb=Math.round(yAxis.bottom)+0.5,wb=Math.round(chart.right)+0.5;plotter.moveTo("border",chart.left,bb);plotter.lineTo("border",wb,bb);}
plotter.draw(context);context.textAlign="left";this.runAppend("drawXAxis",arguments$);}
;STXChart.prototype.createNumericXAxis=function(chart){axisRepresentation=[];chart.xaxis=[];for(var i=0;Q9U.H4(i,chart.maxTicks);i++){if(chart.dataSegment[i])break;chart.xaxis.push(null);}
for(var j=i;Q9U.q4(j,chart.maxTicks);j++){if(!chart.dataSegment[i])break;}
var filledScreenRatio=Q9U.m4((j-i),chart.maxTicks),idealTickSizePixels=chart.xAxis.idealTickSizePixels?chart.xAxis.idealTickSizePixels:chart.xAxis.autoComputedTickSizePixels,idealTicks=Math.round(Q9U.d4((this.chart.width*filledScreenRatio),idealTickSizePixels)),minMax=this.determineMinMax(chart.dataSegment,["index"]),maxPoint=minMax[1],minPoint=minMax[0],range=Q9U.f4(maxPoint,minPoint);function niceNum(range,round){var exponent,fraction,niceFraction;exponent=Math.floor(Math.log10(range));fraction=Q9U.j0(range,Math.pow(10,exponent));if(round){if(Q9U.o0(fraction,1.5))niceFraction=1;else if(Q9U.V0(fraction,3))niceFraction=2;else if(Q9U.R0(fraction,7))niceFraction=5;else niceFraction=10;}
else{if(Q9U.D0(fraction,1))niceFraction=1;else if(Q9U.g0(fraction,2))niceFraction=2;else if(Q9U.n0(fraction,5))niceFraction=5;else niceFraction=10;}
return Q9U.Z0(niceFraction,Math.pow(10,exponent));}
var niceRange=niceNum(Q9U.s0(maxPoint,minPoint),false),tickSpacing=niceNum(Q9U.i0(range,(idealTicks-1)),true),niceMin=Q9U.a0(Math.floor(minPoint/tickSpacing),tickSpacing),niceMax=Q9U.I0(Math.ceil(maxPoint/tickSpacing),tickSpacing),nextLabel=niceMin;if(Q9U.r0(niceMin,minPoint))nextLabel=niceMin+tickSpacing;var hz;for(i;Q9U.A0(i,chart.maxTicks);i++){var prices=chart.dataSegment[i];if(prices){var obj={index:prices.index,data:prices}
;chart.xaxis.push(obj);if(Q9U.T0(prices.index,nextLabel))continue;if(Q9U.J0(prices.index,nextLabel)){hz=chart.left+Q9U.U8(i,this.layout.candleWidth)+this.micropixels;}
else if(Q9U.S8(prices.index,nextLabel)){hz=chart.left+Q9U.G8(i,this.layout.candleWidth)-3+this.micropixels;}
axisRepresentation.push(new STXChart.XAxisLabel(hz,"line",nextLabel));nextLabel+=tickSpacing;}
else{chart.xaxis.push(null);}
}
return axisRepresentation;}
;STXChart.prototype.createTickXAxisWithDates=function(chart){var f7p=" < ",u0p="Tic",l7X="sP",Y7p="ser",D1n="Da",Q8p="With",o6n="eate",U1n="cr";if(!chart)chart=this.chart;chart.xaxis=[];if(!this.timeIntervalMap){this.timePossibilities=[STX.MILLISECOND,STX.SECOND,STX.MINUTE,STX.HOUR,STX.DAY,STX.MONTH,STX.YEAR];this.timeIntervalMap={}
;this.timeIntervalMap[STX.MILLISECOND]={arr:[1,2,5,10,20,50,100,250,500],minTimeUnit:0,maxTimeUnit:1000}
;this.timeIntervalMap[STX.SECOND]={arr:[1,2,5,10,15,30],minTimeUnit:0,maxTimeUnit:60}
;this.timeIntervalMap[STX.MINUTE]={arr:[1,2,5,10,15,30],minTimeUnit:0,maxTimeUnit:60}
;this.timeIntervalMap[STX.HOUR]={arr:[1,2,3,4,6,12],minTimeUnit:0,maxTimeUnit:24}
;this.timeIntervalMap[STX.DAY]={arr:[1,2,7,14],minTimeUnit:1,maxTimeUnit:32}
;this.timeIntervalMap[STX.MONTH]={arr:[1,2,3,6],minTimeUnit:1,maxTimeUnit:13}
;this.timeIntervalMap[STX.YEAR]={arr:[1,2,3,5],minTimeUnit:1,maxTimeUnit:20000000}
;this.timeIntervalMap[STX.DECADE]={arr:[10],minTimeUnit:0,maxTimeUnit:2000000}
;}
var daysInMonth=[31,28,31,30,31,30,31,31,30,31,30,31],periodicity=this.layout.periodicity,interval=this.layout.interval,idealTickSizePixels=chart.xAxis.idealTickSizePixels?chart.xAxis.idealTickSizePixels:chart.xAxis.autoComputedTickSizePixels,idealTicks=Q9U.V8(this.chart.width,idealTickSizePixels);for(var x=0;Q9U.R8(x,chart.dataSegment.length);x++)if(chart.dataSegment[x])break;if(Q9U.D8(x,chart.dataSegment.length))return [];var timeRange=0;if(Q9U.g8(interval,parseInt(interval,10))){timeRange=Q9U.n8(interval,periodicity,60000,chart.dataSegment.length);}
else{timeRange=Q9U.u8(chart.dataSegment[chart.dataSegment.length-1].DT.getTime(),chart.dataSegment[x].DT.getTime());}
timeRange=Q9U.N8((timeRange/chart.dataSegment.length),chart.maxTicks);var msPerTick=Q9U.b8(timeRange,idealTicks);for(i=0;Q9U.z8(i,this.timePossibilities.length);i++){if(Q9U.H8(this.timePossibilities[i],msPerTick))break;}
if(Q9U.q8(i,0)){console.log((U1n+o6n+R8n+w2n+O8p+f9p+a1p+k7X+A1p+Q8p+D1n+E3p+n5n+g4p+e1p+a1p+g4p+Y7p+y4p+p9p+b5n+n5n+W7p+G2p+a0p+l7X+n5n+o4p+u0p+O8p+f7p+V0p));}
if(Q9U.m8(i,this.timePossibilities.length)){i--;}
else if(Q9U.d8(i,0)){var prevUnit=this.timePossibilities[Q9U.f8(i,1)],prevMap=this.timeIntervalMap[prevUnit],prevMultiplier=prevMap.arr[Q9U.j6(prevMap.arr.length,1)];if(Q9U.o6(msPerTick-(prevUnit*prevMultiplier),this.timePossibilities[i]-msPerTick))i--;}
var timeUnit=this.timePossibilities[i];if(chart.xAxis.timeUnit)timeUnit=chart.xAxis.timeUnit;chart.xAxis.activeTimeUnit=timeUnit;var timeInterval=STX.clone(this.timeIntervalMap[timeUnit]);for(i=0;Q9U.t6(i,timeInterval.arr.length);i++){if(Q9U.O6(timeInterval.arr[i]*timeUnit,msPerTick))break;}
if(Q9U.L6(i,timeInterval.arr.length)){i--;}
else{if(Q9U.k6(msPerTick-timeInterval.arr[i-1]*timeUnit,timeInterval.arr[i]*timeUnit-msPerTick))i--;}
var timeUnitMultiplier=timeInterval.arr[i];if(chart.xAxis.timeUnitMultiplier)timeUnitMultiplier=chart.xAxis.timeUnitMultiplier;axisRepresentation=[];for(i=0;Q9U.w6(i,chart.maxTicks);i++){if(chart.dataSegment[i])break;}
if(Q9U.e6(i,0)&&Q9U.E6(i,chart.maxTicks)){var iter1=this.standardMarketIterator(chart.dataSegment[i].DT,chart.xAxis.adjustTimeZone?this.displayZone:this.dataZone);for(var j=i;Q9U.P6(j,0);j--){var dt=iter1.previous();chart.xaxis.unshift({DT:dt,Date:STX.yyyymmddhhmmssmmm(dt)}
);}
}
var dtShifted=0,nextTimeUnit=timeInterval.minTimeUnit,previousTimeUnitLarge=-1,firstTick=true,candleWidth=this.layout.candleWidth,iter=this.standardMarketIterator(chart.dataSegment[Q9U.p6(chart.dataSegment.length,1)].DT,chart.xAxis.adjustTimeZone?this.displayZone:this.dataZone);for(i;Q9U.Q6(i,chart.maxTicks);i++){if(Q9U.F6(i,chart.dataSegment.length)){prices=chart.dataSegment[i];if(prices.displayDate&&chart.xAxis.adjustTimeZone){dtShifted=prices.displayDate;}
else{dtShifted=prices.DT;}
if(i&&prices.leftOffset)candleWidth=Q9U.h6((prices.leftOffset-prices.candleWidth/2),i);}
else{if(!chart.xAxis.futureTicks)break;dtShifted=iter.next();}
var obj={DT:dtShifted,Date:STX.yyyymmddhhmmssmmm(dtShifted)}
;if(Q9U.X6(i,chart.dataSegment.length))obj.data=chart.dataSegment[i];else obj.data=null;chart.xaxis.push(obj);var currentTimeUnit,currentTimeUnitLarge;if(Q9U.T6(timeUnit,STX.MILLISECOND)){currentTimeUnit=dtShifted.getMilliseconds();currentTimeUnitLarge=dtShifted.getSeconds();}
else if(Q9U.J6(timeUnit,STX.SECOND)){currentTimeUnit=dtShifted.getSeconds();currentTimeUnitLarge=dtShifted.getMinutes();}
else if(Q9U.U2(timeUnit,STX.MINUTE)){currentTimeUnit=dtShifted.getMinutes();currentTimeUnitLarge=dtShifted.getHours();}
else if(Q9U.S2(timeUnit,STX.HOUR)){currentTimeUnit=dtShifted.getHours()+Q9U.G2(dtShifted.getMinutes(),60);currentTimeUnitLarge=dtShifted.getDate();}
else if(Q9U.K2(timeUnit,STX.DAY)){currentTimeUnit=dtShifted.getDate();currentTimeUnitLarge=dtShifted.getMonth()+1;}
else if(Q9U.C2(timeUnit,STX.MONTH)){currentTimeUnit=dtShifted.getMonth()+1;currentTimeUnitLarge=dtShifted.getFullYear();}
else if(Q9U.g2(timeUnit,STX.YEAR)){currentTimeUnit=dtShifted.getFullYear();currentTimeUnitLarge=dtShifted.getFullYear()+1000;}
else{currentTimeUnit=dtShifted.getFullYear();currentTimeUnitLarge=0;}
var text=null,hz;if(Q9U.e2(previousTimeUnitLarge,currentTimeUnitLarge)){if(Q9U.E2(currentTimeUnit,nextTimeUnit)){nextTimeUnit=timeInterval.minTimeUnit;}
hz=chart.left+(Q9U.P2(i,candleWidth))-1;text=null;if(Q9U.p2(timeUnit,STX.HOUR)||(Q9U.Q2(timeUnit,STX.MINUTE)&&Q9U.F2(previousTimeUnitLarge,currentTimeUnitLarge))){if(chart.xAxis.formatter){text=chart.xAxis.formatter(dtShifted,"boundary",STX.DAY,1);}
else{if(this.internationalizer){text=this.internationalizer.monthDay.format(dtShifted);}
else{text=(dtShifted.getMonth()+1)+"/"+dtShifted.getDate();}
}
}
else if(Q9U.q2(timeUnit,STX.DAY)){if(Q9U.T2(previousTimeUnitLarge,currentTimeUnitLarge)){text=dtShifted.getFullYear();}
else{text=STX.monthAsDisplay(dtShifted.getMonth(),false,this);}
}
else if(Q9U.B2(timeUnit,STX.MONTH)){text=dtShifted.getFullYear();}
if(text&&previousTimeUnitLarge!=-1){axisRepresentation.push(new STXChart.XAxisLabel(hz,"boundary",text));}
}
if(Q9U.l1(currentTimeUnit,nextTimeUnit)){if(Q9U.Y1(nextTimeUnit,timeInterval.minTimeUnit)){if(Q9U.O1(currentTimeUnitLarge,previousTimeUnitLarge))continue;}
var labelDate=new Date(dtShifted);hz=chart.left+Q9U.L1(((2*i+1)*candleWidth),2)-1;var boundaryTimeUnit=Q9U.W1(Math.floor(currentTimeUnit/timeUnitMultiplier),timeUnitMultiplier);if(Q9U.n1(boundaryTimeUnit,currentTimeUnit)){if(Q9U.Z1(this.layout.interval,"week"))boundaryTimeUnit=currentTimeUnit;else hz-=Q9U.s1(candleWidth,4);}
if(Q9U.i1(timeUnit,STX.MILLISECOND)){labelDate.setMilliseconds(boundaryTimeUnit);}
else if(Q9U.a1(timeUnit,STX.SECOND)){labelDate.setMilliseconds(0);labelDate.setSeconds(boundaryTimeUnit);}
else if(Q9U.I1(timeUnit,STX.MINUTE)){labelDate.setMilliseconds(0);labelDate.setSeconds(0);labelDate.setMinutes(boundaryTimeUnit);}
else if(Q9U.r1(timeUnit,STX.HOUR)){labelDate.setMilliseconds(0);labelDate.setSeconds(0);labelDate.setMinutes(0);labelDate.setHours(boundaryTimeUnit);}
else if(Q9U.A1(timeUnit,STX.DAY)){labelDate.setDate(Math.max(1,boundaryTimeUnit));}
else if(Q9U.J1(timeUnit,STX.MONTH)){labelDate.setDate(1);labelDate.setMonth(Q9U.U5(boundaryTimeUnit,1));}
else if(Q9U.S5(timeUnit,STX.YEAR)){labelDate.setDate(1);labelDate.setMonth(0);}
else{labelDate.setDate(1);labelDate.setMonth(0);}
nextTimeUnit=boundaryTimeUnit+timeUnitMultiplier;if(Q9U.G5(timeUnit,STX.DAY))timeInterval.maxTimeUnit=daysInMonth[labelDate.getMonth()]+1;if(Q9U.V5(nextTimeUnit,timeInterval.maxTimeUnit))nextTimeUnit=timeInterval.minTimeUnit;previousTimeUnitLarge=currentTimeUnitLarge;if(firstTick&&Q9U.R5(boundaryTimeUnit,currentTimeUnit))continue;if(chart.xAxis.formatter){text=chart.xAxis.formatter(labelDate,"line",timeUnit,timeUnitMultiplier);}
else{if(Q9U.D5(timeUnit,STX.DAY)){text=labelDate.getDate();}
else if(Q9U.g5(timeUnit,STX.MONTH)){text=STX.monthAsDisplay(dtShifted.getMonth(),false,this);}
else if(Q9U.n5(timeUnit,STX.YEAR)||Q9U.Z5(timeUnit,STX.DECADE)){text=labelDate.getFullYear();}
else{text=STX.timeAsDisplay(labelDate,this,timeUnit);}
}
axisRepresentation.push(new STXChart.XAxisLabel(hz,"line",text));}
firstTick=false;}
return axisRepresentation;}
;var cached=Q9U.P0n,notcached=Q9U.P0n;STXChart.prototype.createYAxis=function(panel,parameters){if(this.runPrepend("createYAxis",arguments))return ;var chart=panel.chart,isAChart=(Q9U.s5(panel.name,chart.name));if(!parameters)parameters={}
;parameters.noChange=false;var yAxis=parameters.yAxis?parameters.yAxis:panel.yAxis;if(STXChart.enableCaching&&Q9U.i5(yAxis.high,panel.cacheHigh)&&Q9U.a5(yAxis.low,panel.cacheLow)){var leftTick=Q9U.I5(chart.dataSet.length,chart.scroll),rightTick=leftTick+chart.maxTicks;panel.cacheLeft=Math.min(panel.cacheLeft,leftTick);panel.cacheRight=Math.max(panel.cacheRight,rightTick);panel.cacheLeft=leftTick;panel.cacheRight=rightTick;parameters.noChange=true;cached++;}
else{panel.cacheLeft=1000000;panel.cacheRight=-1;panel.cacheHigh=yAxis.high;panel.cacheLow=yAxis.low;notcached++;}
var idealX=chart.xAxis.idealTickSizePixels?chart.xAxis.idealTickSizePixels:chart.xAxis.autoComputedTickSizePixels;if(yAxis.goldenRatioYAxis){if(Q9U.r5(yAxis.idealTickSizePixels,idealX/1.618))parameters.noChange=false;}
if(!parameters.noChange){var height=yAxis.height=Q9U.A5(yAxis.bottom,yAxis.top),pricePerPix=Q9U.y5((yAxis.high-yAxis.low),(height-yAxis.zoom));if(parameters.ground&&!yAxis.semiLog){yAxis.high=yAxis.high+Q9U.c5(yAxis.zoom,pricePerPix);}
else{yAxis.high=yAxis.high+Q9U.B5((yAxis.zoom/2),pricePerPix)+Q9U.l7R(yAxis.scroll,pricePerPix);var unadjustedLow=yAxis.low;yAxis.low=Q9U.Y7R(yAxis.low,(yAxis.zoom/2)*pricePerPix,yAxis.scroll*pricePerPix);if(yAxis.semiLog&&Q9U.V7R(yAxis.low,0))yAxis.low=unadjustedLow;}
if(yAxis.min||Q9U.R7R(yAxis.min,0))yAxis.low=yAxis.min;if(yAxis.max||Q9U.D7R(yAxis.max,0))yAxis.high=yAxis.max;yAxis.shadow=Q9U.g7R(yAxis.high,yAxis.low);if(yAxis.semiLog&&(!this.activeDrawing||Q9U.n7R(this.activeDrawing.name,"projection"))){yAxis.logHigh=Q9U.Z7R(Math.log(yAxis.high),Math.LN10);var semilow=Math.max(yAxis.low,0.000000001);yAxis.logLow=Q9U.s7R(Math.log(semilow),Math.LN10);if(Q9U.i7R(yAxis.low,0))yAxis.logLow=0;yAxis.logShadow=Q9U.a7R(yAxis.logHigh,yAxis.logLow);}
var fontHeight;if(yAxis.goldenRatioYAxis&&isAChart){yAxis.idealTickSizePixels=Q9U.I7R(idealX,1.618);if(Q9U.r7R(yAxis.idealTickSizePixels,0)){fontHeight=this.getCanvasFontSize("stx_yaxis");yAxis.idealTickSizePixels=Q9U.A7R(fontHeight,5);}
}
else{if(!yAxis.idealTickSizePixels){fontHeight=this.getCanvasFontSize("stx_yaxis");if(isAChart){yAxis.idealTickSizePixels=Q9U.y7R(fontHeight,5);}
else{yAxis.idealTickSizePixels=Q9U.c7R(fontHeight,2);}
}
}
var idealTicks=Math.round(Q9U.B7R(height,yAxis.idealTickSizePixels)),shadow=parameters.range?Q9U.l9R(parameters.range[1],parameters.range[0]):yAxis.shadow;yAxis.priceTick=Math.floor(Q9U.Y9R(shadow,idealTicks));var n=1;for(var zz=0;Q9U.x9R(zz,10);zz++){if(Q9U.K9R(yAxis.priceTick,0))break;n*=10;yAxis.priceTick=Q9U.C9R(Math.floor(shadow/idealTicks*n),n);}
if(Q9U.W9R(zz,10))yAxis.priceTick=0.00000001;yAxis.priceTick=Q9U.v9R(Math.round(shadow/idealTicks*n),n);var verticalTicks=Math.round(Q9U.M9R(shadow,yAxis.priceTick));if(parameters.range&&Q9U.u9R(verticalTicks,shadow)&&!yAxis.noEvenDivisorTicks){while(Q9U.N9R(verticalTicks,1)){if(Q9U.b9R(shadow%verticalTicks,0))break;verticalTicks--;}
yAxis.priceTick=Q9U.z9R(shadow,verticalTicks);}
if(yAxis.minimumPriceTick){var yAxisPriceTick=yAxis.minimumPriceTick;fontHeight=this.getCanvasFontSize("stx_yaxis");for(var i=0;Q9U.H9R(i,100);i++){var numberOfTicks=Q9U.q9R(shadow,yAxisPriceTick);if(Q9U.m9R(height/numberOfTicks,fontHeight*2))yAxisPriceTick+=yAxis.minimumPriceTick;else break;}
if(Q9U.d9R(i,100))yAxis.priceTick=yAxisPriceTick;}
yAxis.multiplier=Q9U.f9R(yAxis.height,yAxis.shadow);}
if(!this.activeDrawing||Q9U.j3R(this.activeDrawing.name,"projection")){yAxis.high=this.valueFromPixel(panel.top,panel,yAxis);if(yAxis.semiLog){yAxis.logHigh=Q9U.o3R(Math.log(yAxis.high),Math.LN10);var semilow2=Math.max(yAxis.low,0.00000000001);yAxis.logLow=Q9U.t3R(Math.log(semilow2),Math.LN10);yAxis.logShadow=Q9U.O3R(yAxis.logHigh,yAxis.logLow);}
yAxis.shadow=Q9U.L3R(yAxis.high,yAxis.low);}
yAxis.multiplier=Q9U.k3R(yAxis.height,yAxis.shadow);if(!yAxis.decimalPlaces&&Q9U.w3R(yAxis.decimalPlaces,0)){if(isAChart){var labelDecimalPlaces=0;for(var j=0;Q9U.e3R(j,panel.yAxis.shadowBreaks.length);j++){var brk=panel.yAxis.shadowBreaks[j];if(Q9U.E3R(panel.yAxis.shadow,brk[0]))labelDecimalPlaces=brk[1];}
yAxis.printDecimalPlaces=labelDecimalPlaces;}
else yAxis.printDecimalPlaces=null;}
else{yAxis.printDecimalPlaces=yAxis.decimalPlaces;}
this.runAppend("createYAxis",arguments);}
;STXChart.prototype.drawYAxis=function(panel,parameters){var r2p="gr",b8p="rid",V0n="x_g",y0p="'";if(!parameters)parameters={}
;var yAxis=parameters.yAxis?parameters.yAxis:panel.yAxis;if(yAxis.fractional){if(!yAxis.originalPriceFormatter)yAxis.originalPriceFormatter={func:yAxis.priceFormatter}
;if(!yAxis.fractional.resolution)yAxis.fractional.resolution=yAxis.minimumPrice;if(!yAxis.fractional.formatter)yAxis.fractional.formatter=y0p;if(!yAxis.priceFormatter)yAxis.priceFormatter=function(stx,panel,price){var A8p="+",whole=Math.floor(Q9U.P3R(Math.round(price/yAxis.fractional.resolution),yAxis.fractional.resolution)),frac=Math.round(Q9U.p3R((price-whole),yAxis.fractional.resolution)),_nds=Math.floor(frac);return whole+yAxis.fractional.formatter+(Q9U.Q3R(_nds,q2p)?d4p:w3p)+_nds+(Q9U.F3R(frac-_nds,w7p)?A8p:w3p);}
;}
else{if(yAxis.originalPriceFormatter){yAxis.priceFormatter=yAxis.originalPriceFormatter.func;yAxis.originalPriceFormatter=G8p;}
}
if(yAxis.pretty)return this.drawYAxisPretty(panel,parameters);if(this.runPrepend(h7p,arguments))return ;if(!parameters.noDraw&&!yAxis.noDraw){if(!yAxis.yAxisPlotter||!parameters.noChange){var chart=panel.chart,isAChart=(Q9U.h3R(panel.name,chart.name)&&Q9U.X3R(yAxis,panel.yAxis));if(!yAxis.priceTick)return ;var shadow=yAxis.shadow;if(parameters.range){shadow=Q9U.T3R(parameters.range[Q9U.s0n],parameters.range[Q9U.P0n]);}
var verticalTicks=Q9U.J3R(shadow,yAxis.priceTick);verticalTicks=Math.round(verticalTicks);var logStart,logPriceTick;if(yAxis.semiLog){logStart=Q9U.U4R(Math.log(this.valueFromPixel(yAxis.bottom,panel)),Math.LN10);logPriceTick=Q9U.S4R((yAxis.logHigh-yAxis.logLow),verticalTicks);}
var textStyle=yAxis.textStyle?yAxis.textStyle:Q8n;yAxis.yAxisPlotter=new STX.Plotter();yAxis.yAxisPlotter.newSeries(M2p,T6n,this.canvasStyle((j5n+V0n+b8p)));yAxis.yAxisPlotter.newSeries(n3p,R1n,this.colorOrStyle(textStyle));yAxis.yAxisPlotter.newSeries(m7X,T6n,this.canvasStyle(t2n));var priceOffset=Q9U.P0n,high=parameters.range?parameters.range[Q9U.s0n]:yAxis.high,low=parameters.range?parameters.range[Q9U.P0n]:yAxis.low,drawBorders=(Q9U.G4R(yAxis.displayBorder,G8p)?chart.panel.yAxis.displayBorder:yAxis.displayBorder);if(Q9U.V4R(this.axisBorders,U5p))drawBorders=U5p;if(Q9U.R4R(this.axisBorders,L8p))drawBorders=L8p;var edgeOfAxis,position=(Q9U.D4R(yAxis.position,G8p)?chart.panel.yAxis.position:yAxis.position);if(Q9U.g4R(position,o2p)){edgeOfAxis=yAxis.left+yAxis.width;}
else{edgeOfAxis=yAxis.left;}
var borderEdge=Math.round(edgeOfAxis)+w7p,tickWidth=drawBorders?Q9U.n0n:Q9U.P0n;if(Q9U.n4R(position,o2p))tickWidth=drawBorders?-Q9U.n0n:Q9U.P0n;if(isAChart)if(Q9U.Z4R(yAxis.shadow,Q9U.s0n)){priceOffset=Q9U.s4R(((parseInt(low/yAxis.priceTick,q2p)+Q9U.s0n)*yAxis.priceTick),low);}
else{priceOffset=Q9U.i4R(yAxis.priceTick,Math.round((low%yAxis.priceTick)*panel.chart.roundit)/panel.chart.roundit);}
else priceOffset=Q9U.a4R(high,yAxis.priceTick);var fontHeight=this.getCanvasFontSize(Q8n);for(var i=Q9U.P0n;Q9U.I4R(i,verticalTicks);i++){var price;if(yAxis.semiLog){var logPrice=logStart+(Q9U.r4R(i,logPriceTick));price=Math.pow(q2p,logPrice);}
else{if(isAChart)price=low+Q9U.A4R(i,yAxis.priceTick)+priceOffset;else price=Q9U.y4R(high,(i*yAxis.priceTick),priceOffset);}
var y=this.pixelFromPrice(price,panel,yAxis),y2=Math.round(y)+w7p;if(Q9U.J4R((y2+fontHeight/Q9U.M0n),panel.bottom))continue;if(Q9U.U0R((y2-fontHeight/Q9U.M0n),panel.top))continue;if(yAxis.displayGridLines){yAxis.yAxisPlotter.moveTo((r2p+r8p+S5n),panel.left,y2);yAxis.yAxisPlotter.lineTo("grid",panel.right,y2);}
if(drawBorders){yAxis.yAxisPlotter.moveTo("border",Q9U.S0R(borderEdge,0.5),y2);yAxis.yAxisPlotter.lineTo("border",borderEdge+tickWidth,y2);}
if(yAxis.priceFormatter){price=yAxis.priceFormatter(this,panel,price);}
else{price=this.formatYAxisPrice(price,panel,G8p,yAxis);}
var backgroundColor=yAxis.textBackground?this.containerColor:G8p,textXPosition=edgeOfAxis+tickWidth+Q9U.n0n;if(Q9U.G0R(position,o2p)){textXPosition=yAxis.left+Q9U.n0n;if(yAxis.justifyRight)textXPosition=yAxis.left+yAxis.width+tickWidth-3;}
else{if(yAxis.justifyRight)textXPosition=edgeOfAxis+yAxis.width;}
yAxis.yAxisPlotter.addText(n3p,price,textXPosition,y2,backgroundColor,G8p,fontHeight);}
if(drawBorders){var b=Math.round(yAxis.bottom)+w7p;yAxis.yAxisPlotter.moveTo("border",borderEdge,yAxis.top);yAxis.yAxisPlotter.lineTo("border",borderEdge,b);yAxis.yAxisPlotter.draw(this.chart.context,m7X);}
}
this.plotYAxisGrid(panel);}
this.runAppend(h7p,arguments);}
;STXChart.prototype.drawYAxisPretty=function(panel,parameters){var q4p="borde",V8n="ror",m3p="wYAxis",g2n="ax",P1p="tx_y",d0p="x_yaxis";if(this.runPrepend("drawYAxis",arguments))return ;if(!parameters)parameters={}
;var yAxis=parameters.yAxis?parameters.yAxis:panel.yAxis;if(!parameters.noDraw&&!yAxis.noDraw){if(!yAxis.yAxisPlotter||!parameters.noChange){var chart=panel.chart,isAChart=(Q9U.V0R(panel.name,chart.name)&&Q9U.R0R(yAxis,panel.yAxis));if(!yAxis.priceTick)return ;if(isNaN(yAxis.high)||isNaN(yAxis.low))return ;var shadow=yAxis.shadow;if(parameters.range){shadow=Q9U.D0R(parameters.range[1],parameters.range[0]);}
var verticalTicks=Q9U.g0R(yAxis.height,yAxis.idealTickSizePixels);verticalTicks=Math.round(verticalTicks);var textStyle=yAxis.textStyle?yAxis.textStyle:(j5n+d0p);yAxis.yAxisPlotter=new STX.Plotter();yAxis.yAxisPlotter.newSeries("grid","stroke",this.canvasStyle("stx_grid"));yAxis.yAxisPlotter.newSeries("text","fill",this.colorOrStyle(textStyle));yAxis.yAxisPlotter.newSeries("border","stroke",this.canvasStyle("stx_grid_border"));var priceOffset=0,high=parameters.range?parameters.range[1]:yAxis.high,low=parameters.range?parameters.range[0]:yAxis.low,drawBorders=(Q9U.n0R(yAxis.displayBorder,null)?chart.panel.yAxis.displayBorder:yAxis.displayBorder);if(Q9U.Z0R(this.axisBorders,false))drawBorders=false;if(Q9U.s0R(this.axisBorders,true))drawBorders=true;var edgeOfAxis,position=(Q9U.i0R(yAxis.position,null)?chart.panel.yAxis.position:yAxis.position);if(Q9U.a0R(position,"left")){edgeOfAxis=yAxis.left+yAxis.width;}
else{edgeOfAxis=yAxis.left;}
var borderEdge=Math.round(edgeOfAxis)+0.5,tickWidth=drawBorders?3:0;if(Q9U.I0R(position,(W0p+N7p+E3p)))tickWidth=drawBorders?-3:0;var fontHeight=this.getCanvasFontSize((g4p+P1p+g2n+A1p)),increments=yAxis.increments,l=increments.length,p=0,n=1,inc=0,closest=0,pow=0,diff=Number.MAX_VALUE;for(var z=0;Q9U.r0R(z,100);z++){inc=Q9U.A0R(increments[p],Math.pow(10,pow));n=Math.floor(Q9U.y0R(shadow,inc));var newDiff=Math.abs(Q9U.c0R(verticalTicks,n));if(Q9U.B0R(newDiff,diff)){break;}
else{diff=newDiff;}
if(Q9U.l8R(n,verticalTicks)){closest=inc;break;}
else if(Q9U.Y8R(n,verticalTicks)){p++;if(Q9U.x8R(p,l)){p=0;pow++;}
}
else{p--;if(Q9U.K8R(p,0)){p=Q9U.C8R(l,1);pow--;}
}
closest=inc;}
var lowLabel=Q9U.W8R(Math.ceil(low/closest),closest),lowPixelSize=Q9U.v8R(yAxis.bottom,this.pixelFromPrice(lowLabel,panel,yAxis)),closestInc=0;if(Q9U.M8R(lowPixelSize,yAxis.idealTickSizePixels)&&yAxis.semiLog&&yAxis.prettySemiLog){var divisor;for(divisor=Math.ceil(low);Q9U.u8R(divisor,lowLabel)&&Q9U.N8R(lowLabel%divisor,0);++divisor);if(Q9U.b8R(divisor,lowLabel)){if(Q9U.z8R(lowLabel,closest)){closest=divisor;closestInc=divisor;}
lowLabel=divisor;}
}
var i=0;for(var zz=0;Q9U.H8R(zz,100);zz++){var price=lowLabel+Q9U.q8R(i,closest);if(Q9U.m8R(price,high))break;closest+=closestInc;i++;var y=this.pixelFromPrice(price,panel,yAxis),y2=Math.round(y)+0.5;if(Q9U.d8R((y2+fontHeight/2),panel.bottom))continue;if(Q9U.f8R((y2-fontHeight/2),panel.top))continue;if(yAxis.displayGridLines){yAxis.yAxisPlotter.moveTo("grid",panel.left,y2);yAxis.yAxisPlotter.lineTo("grid",panel.right,y2);}
if(drawBorders){yAxis.yAxisPlotter.moveTo("border",Q9U.j6R(borderEdge,0.5),y2);yAxis.yAxisPlotter.lineTo("border",borderEdge+tickWidth,y2);}
if(yAxis.priceFormatter){price=yAxis.priceFormatter(this,panel,price);}
else{price=this.formatYAxisPrice(price,panel,null,yAxis);}
var backgroundColor=yAxis.textBackground?this.containerColor:null,textXPosition=edgeOfAxis+tickWidth+3;if(Q9U.o6R(position,"left")){textXPosition=yAxis.left+3;if(yAxis.justifyRight)textXPosition=yAxis.left+yAxis.width+tickWidth-3;}
else{if(yAxis.justifyRight)textXPosition=edgeOfAxis+yAxis.width;}
yAxis.yAxisPlotter.addText("text",price,textXPosition,y2,backgroundColor,null,fontHeight);}
if(Q9U.t6R(zz,100)){console.log((S5n+o4p+c1n+m3p+g6n+o4p+T5n+E3p+B5p+e1p+c1n+g4p+g4p+p5n+y4p+L0p+S0p+b5n+n5n+o4p+V8n+G2p+H5p+H5p+b5n+o4p+n5n+c1n+e5n+Z8p+F7p+b5n+V0p+d4p+d4p));}
if(drawBorders){var b=Math.round(yAxis.bottom)+0.5;yAxis.yAxisPlotter.moveTo((q4p+o4p),borderEdge,yAxis.top);yAxis.yAxisPlotter.lineTo("border",borderEdge,b);yAxis.yAxisPlotter.draw(this.chart.context,"border");}
}
this.plotYAxisGrid(panel);}
this.runAppend("drawYAxis",arguments);}
;STXChart.prototype.plotYAxisGrid=function(panel){var M6p="plotYAxisGrid";if(this.runPrepend(M6p,arguments))return ;var context=this.chart.context;panel.yAxis.yAxisPlotter.draw(context,M2p);this.runAppend(M6p,arguments);}
;STXChart.prototype.plotYAxisText=function(panel){var o3p="ext",h1n="tYA",n0p="plo";if(this.runPrepend((n0p+h1n+k7X+A1p+R8n+o3p),arguments))return ;var arr=panel.yaxisLHS.concat(panel.yaxisRHS);for(var i=0;Q9U.O6R(i,arr.length);i++){var yAxis=arr[i];if(!yAxis.yAxisPlotter)continue;if(yAxis.noDraw)continue;this.canvasFont("stx_yaxis");this.canvasColor("stx_yaxis");var context=this.chart.context;context.textBaseline="middle";if(yAxis.justifyRight)context.textAlign="right";else context.textAlign="left";var fontHeight=this.getCanvasFontSize("stx_yaxis");yAxis.yAxisPlotter.draw(context,"text");context.textBaseline="alphabetic";context.textAlign="left";}
this.runAppend("plotYAxisText",arguments);}
;STXChart.prototype.formatYAxisPrice=function(price,panel,requestedDecimalPlaces,yAxis){if(Q9U.L6R(price,null)||typeof price=="undefined")return "";var yax=yAxis?yAxis:panel.yAxis,decimalPlaces=requestedDecimalPlaces;if(!decimalPlaces&&Q9U.k6R(decimalPlaces,0))decimalPlaces=yax.printDecimalPlaces;if(!decimalPlaces&&Q9U.w6R(decimalPlaces,0)){if(Q9U.e6R(yax.priceTick,0.01))decimalPlaces=4;else if(Q9U.E6R(yax.priceTick,0.1))decimalPlaces=2;else if(Q9U.P6R(yax.priceTick,1))decimalPlaces=1;else decimalPlaces=0;}
if(Q9U.p6R(panel.name,panel.chart.name)){if(Q9U.Q6R(yax.priceTick,100)){return STX.condenseInt(price);}
}
if(this.internationalizer){if(Q9U.F6R(decimalPlaces,this.internationalizer.priceFormatters.length))decimalPlaces=Q9U.h6R(this.internationalizer.priceFormatters.length,1);price=this.internationalizer.priceFormatters[decimalPlaces].format(price);}
else{price=price.toFixed(decimalPlaces);}
return price;}
;STXChart.prototype.formatPrice=function(price,panel){if(!price||typeof price==(P3p+O5p+N7p+r8p+A7p))return "";if(!panel)panel=this.currentPanel;if(!panel)panel=this.chart.panel;if(!panel)return price;var decimalPlaces=panel.decimalPlaces;if(!decimalPlaces&&Q9U.X6R(decimalPlaces,0)){decimalPlaces=panel.chart.decimalPlaces;}
if(!decimalPlaces&&Q9U.T6R(decimalPlaces,0)){return price;}
if(this.internationalizer){if(Q9U.J6R(decimalPlaces,this.internationalizer.priceFormatters.length))decimalPlaces=Q9U.U2R(this.internationalizer.priceFormatters.length,1);price=this.internationalizer.priceFormatters[decimalPlaces].format(price);}
else{price=price.toFixed(decimalPlaces);}
return price;}
;STXChart.prototype.createCrosshairs=function(){var n6n="createCrosshairs";if(this.runPrepend(n6n,arguments))return ;if(this.controls.crossX.onmousedown)return ;this.controls.crossY.onmousedown=function(e){if(!e)e=event;if(e.preventDefault)e.preventDefault();return U5p;}
;this.controls.crossX.onmousedown=function(e){if(!e)e=event;if(e.preventDefault)e.preventDefault();return U5p;}
;this.runAppend(n6n,arguments);}
;STXChart.prototype.determineMinMax=function(quotes,fields,sum,bypassTransform,length){var highValue=Number.MAX_VALUE*-1,lowValue=Number.MAX_VALUE,isTransform=false,l=quotes.length;if(length)l=length;for(var i=0;Q9U.S2R(i,l);i++){var quote=quotes[i];if(!quote)continue;if(!bypassTransform){if(quote.transform){isTransform=true;quote=quote.transform;}
else if(isTransform)continue;}
var acc=0;for(var j=0;Q9U.G2R(j,fields.length);j++){var f=quote[fields[j]];if(!f)continue;if(typeof (f)=="number")f=[f];for(var v=0;Q9U.V2R(v,f.length);v++){var val=f[v];if(val||Q9U.R2R(val,0)){if(sum){acc+=val;if(Q9U.D2R(acc,highValue))highValue=acc;if(Q9U.g2R(acc,lowValue))lowValue=acc;}
else{if(Q9U.n2R(val,highValue))highValue=val;if(Q9U.Z2R(val,lowValue))lowValue=val;}
}
}
}
}
if(highValue==Number.MAX_VALUE*-1)highValue=0;if(Q9U.s2R(lowValue,Number.MAX_VALUE))lowValue=0;return [lowValue,highValue];}
;STXChart.prototype.calculateYAxisRange=function(panel,yAxis,low,high){if(Q9U.i2R(low,Number.MAX_VALUE)){low=0;high=0;}
var cheight=panel.height,newHigh=null,newLow=null;if(!yAxis.bottomOffset)yAxis.bottomOffset=this.xaxisHeight;yAxis.bottom=Q9U.a2R(panel.bottom,yAxis.bottomOffset);yAxis.top=panel.top;yAxis.height=Q9U.I2R(yAxis.bottom,yAxis.top);var verticalPad=Math.round(Math.abs(Q9U.r2R(cheight,5)));if(Q9U.A2R(cheight-Math.abs(yAxis.scroll),verticalPad)){yAxis.scroll=(Q9U.y2R(cheight,verticalPad))*(Q9U.c2R(yAxis.scroll,0)?-1:1);}
var pricePerPix=Q9U.B2R((high-low),yAxis.height);if(low||Q9U.l1R(low,0)){if(Q9U.Y1R(high-low,0)){newHigh=Q9U.x1R(high,2);newLow=0;}
else{if((this.layout.semiLog||Q9U.K1R(this.layout.chartScale,"log"))&&newHigh){var logLow=Q9U.C1R(Math.log(low),Math.LN10),logHigh=Q9U.W1R(Math.log(high),Math.LN10);newHigh=Math.pow(10,logHigh);newLow=Math.pow(10,logLow);}
else{newHigh=high;newLow=low;}
}
yAxis.high=newHigh;yAxis.low=newLow;}
if(yAxis.max||Q9U.v1R(yAxis.max,0))yAxis.high=yAxis.max;if(yAxis.min||Q9U.M1R(yAxis.min,0))yAxis.low=yAxis.min;yAxis.shadow=Q9U.u1R(yAxis.high,yAxis.low);if(Q9U.N1R(panel.chart.name,panel.name)&&Q9U.b1R(panel.yAxis,yAxis)){var isLogScale=(this.layout.semiLog||Q9U.z1R(this.layout.chartScale,"log"));if(panel.chart.isComparison)isLogScale=false;if(Q9U.H1R(yAxis.semiLog,isLogScale)){this.clearPixelCache();yAxis.semiLog=isLogScale;}
}
}
;STXChart.prototype.renderYAxis=function(chart){if(this.runPrepend("renderYAxis",arguments))return ;var panel=chart.panel,arr=panel.yaxisRHS.concat(panel.yaxisLHS),i;for(i=0;Q9U.q1R(i,arr.length);i++){var yAxis=arr[i],low=null,high=null;if(Q9U.m1R(panel.yAxis,yAxis)){low=chart.lowValue;high=chart.highValue;}
this.calculateYAxisRange(panel,yAxis,low,high);}
var parameters={}
;for(i=0;Q9U.d1R(i,arr.length);i++){parameters.yAxis=arr[i];this.createYAxis(panel,parameters);this.drawYAxis(panel,parameters);}
this.runAppend("renderYAxis",arguments);}
;STXChart.prototype.initializeDisplay=function(chart){if(this.runPrepend("initializeDisplay",arguments))return ;var fields=[];for(var field in chart.series){if(chart.series[field].parameters.shareYAxis)fields.push(field);}
var panel=chart.panel=this.panels[chart.name],minMax,length=null,ticksOnScreen=Math.floor(Q9U.f1R((chart.width-this.micropixels),this.layout.candleWidth));if(Q9U.j5R(chart.scroll,chart.maxTicks)&&Q9U.o5R(chart.maxTicks,ticksOnScreen+1))length=Q9U.t5R(chart.dataSegment.length,1);if(!STXChart.chartShowsHighs(this.layout.chartType)){fields.push("Close");minMax=this.determineMinMax(chart.dataSegment,fields,null,null,length);if(Q9U.O5R(this.layout.chartType,"baseline_delta")){var base=chart.baseline.actualLevel;if(chart.transformFunc)base=chart.transformFunc(this,chart,base);var diff=Math.max(Q9U.L5R(base,minMax[0]),Q9U.k5R(minMax[1],base));if(this.repositioningBaseline){minMax=[chart.lowValue,chart.highValue];}
else{minMax[0]=Q9U.w5R(base,diff);minMax[1]=base+diff;}
}
}
else{fields.push("Close","High","Low");minMax=this.determineMinMax(chart.dataSegment,fields,null,null,length);}
chart.lowValue=minMax[0];chart.highValue=minMax[1];this.runAppend("initializeDisplay",arguments);}
;STXChart.prototype.computePosition=function(x,offset){if(typeof offset==h0n)offset=Q9U.P0n;var position=Q9U.e5R(x,this.layout.candleWidth)+offset+this.micropixels;return position;}
;STXChart.prototype.computeColor=function(open,close){if(Q9U.E5R(open,close))return R0n;if(Q9U.P5R(open,close))return l8n;return S8p;}
;STXChart.prototype.computeLength=function(high,low){var h=this.pixelFromPrice(high),l=this.pixelFromPrice(low);return Q9U.p5R(l,h);}
;STXChart.prototype.setSeriesRenderer=function(renderer){var params=renderer.params;if(this.chart.seriesRenderers[renderer.params.name])return this.chart.seriesRenderers[renderer.params.name];if(params.yAxis){this.addYAxis(this.panels[params.panel],params.yAxis);}
renderer.stx=this;this.chart.seriesRenderers[renderer.params.name]=renderer;return renderer;}
;STXChart.prototype.setMarket=function(marketDefinition,chart){if(!chart)chart=this.chart;var parms={tz_lib:timezoneJS.Date,data_tz:this.dataZone,display_tz:this.displayZone,market_definition:marketDefinition}
;chart.market=new STX.Market(parms);}
;STXChart.prototype.setMarketFactory=function(factory){this.marketFactory=factory;}
;STXChart.prototype.removeSeriesRenderer=function(renderer){for(var r in this.chart.seriesRenderers){if(Q9U.Q5R(renderer.params.name,this.chart.seriesRenderers[r].params.name)){var toDelete=this.chart.seriesRenderers[renderer.params.name],yAxis=toDelete.params.yAxis,panel=this.panels[toDelete.params.panel];delete  this.chart.seriesRenderers[renderer.params.name];this.deleteYAxisIfUnused(panel,yAxis);return ;}
}
}
;STXChart.prototype.getSeriesRenderer=function(name){return this.chart.seriesRenderers[name];}
;STXChart.prototype.drawHistogram=function(params,seriesParams){if(!seriesParams||!seriesParams.length)return ;var panelName=params.panel;if(!panelName)panelName="chart";var c=this.panels[panelName];if(!c)return ;var yAxis=params.yAxis?params.yAxis:c.yAxis,b=Math.floor(yAxis.bottom)+0.5,t=Math.floor(yAxis.top)+0.5,type=params.type;if(Q9U.F5R(type,"histogram"))type=params.subtype;var quotes=this.chart.dataSegment,bordersOn=false;this.getDefaultColor();var sp;for(sp=0;Q9U.h5R(sp,seriesParams.length);sp++){bordersOn|=(seriesParams[sp].border_color_up&&!STX.isTransparent(seriesParams[sp].border_color_up));bordersOn|=(seriesParams[sp].border_color_down&&!STX.isTransparent(seriesParams[sp].border_color_down));}
if(!params.name)params.name="Data";var multiplier=yAxis.multiplier;if(!params.heightPercentage)params.heightPercentage=0.7;if(!params.widthFactor)params.widthFactor=0.8;var histMax=0,histMin=0;for(var i=0;Q9U.X5R(i,this.chart.maxTicks);i++){var prices=quotes[i];if(!prices)continue;var total=0;for(sp=0;Q9U.T5R(sp,seriesParams.length);sp++){if(prices[seriesParams[sp].field]){if(Q9U.J5R(params.subtype,"stacked"))total+=prices[seriesParams[sp].field];else total=prices[seriesParams[sp].field];if(Q9U.U7c(total,histMax))histMax=total;if(Q9U.S7c(total,histMin))histMin=total;}
}
}
if(!params.bindToYAxis){if(Q9U.G7c(histMax,0)&&Q9U.V7c(histMin,0)){this.watermark(panelName,"center","bottom",this.translateIf(params.name+" Not Available"));return ;}
multiplier=Q9U.R7c((b-t),params.heightPercentage,(histMax-histMin));}
var offset=0.5;if(Q9U.k7c(this.layout.candleWidth,1)||!bordersOn)offset=0;this.startClip(panelName);var context=this.chart.context,shaveOff=Math.max(0,Q9U.w7c((1-params.widthFactor),this.layout.candleWidth,2)),tops={}
,bottoms={}
,self=this,candleWidth=1;function drawBars(field,color,opacity,isBorder,isUp,shift,candleWidth){if(!opacity)opacity=1;if(STX.isIE8)context.globalAlpha=0.5;else context.globalAlpha=opacity;context.beginPath();var prevTop=b+0.5,farLeft=Math.floor(Q9U.M7c(self.pixelFromBar(0,c.chart),self.layout.candleWidth/2)),prevRight=farLeft;for(var i=0;Q9U.u7c(i,quotes.length);i++){var bottom=bottoms[i];if(!bottom)bottom=b;if(Q9U.N7c(i,0))prevTop=bottom;var quote=quotes[i];if(!quote||!quote[field]){prevTop=bottom;prevRight+=self.layout.candleWidth;continue;}
var y=Q9U.b7c((quote[field]-histMin),multiplier);if(isNaN(y))continue;var myCandleWidth=self.layout.candleWidth;if(quote.candleWidth){myCandleWidth=quote.candleWidth;if(Q9U.z7c(i,0))farLeft=prevRight=Math.floor(Q9U.H7c(self.pixelFromBar(0,c.chart),quote.candleWidth/2));}
var top=Math.min(Math.floor(Q9U.q7c(bottom,y))+0.5,bottom);if(isUp){if(Q9U.m7c(quote.Close,quote.iqPrevClose)){prevTop=top;prevRight+=myCandleWidth;continue;}
}
else{if(Q9U.d7c(quote.Close,quote.iqPrevClose)){prevTop=top;prevRight+=myCandleWidth;continue;}
}
var x0,x1,variableWidthRatio=Q9U.f7c(myCandleWidth,self.layout.candleWidth),start=prevRight+Q9U.j9c((shaveOff+shift*candleWidth),variableWidthRatio);x0=Math.round(start)+(isBorder?0:offset);x1=Q9U.o9c(Math.round(start+candleWidth*variableWidthRatio),(isBorder?0:offset));if(Q9U.t9c(x1-x0,2))x1=x0+1;if(isBorder)roundPixel=0;else roundPixel=0.5;if(Q9U.O9c(x0%1,roundPixel))x0+=0.5;if(Q9U.L9c(x1%1,roundPixel))x1+=0.5;context.moveTo(x0,bottom);if(Q9U.k9c(b,bottom)){context.lineTo(x1,bottom);}
else{context.moveTo(x1,bottom);if(isBorder&&!shaveOff){if(bottoms[i+1])context.moveTo(x1,Math.max(top,Math.min(bottom,bottoms[i+1])));}
}
context.lineTo(x1,top);context.lineTo(x0,top);if(isBorder&&shift){if(Q9U.w9c(tops[i],top)||Q9U.e9c(i,0))context.lineTo(x0,Math.min(bottom,tops[i]));}
else if(isBorder&&!shaveOff&&Q9U.E9c(type,"clustered")){if(Q9U.P9c(i,0)&&tops[Q9U.p9c(i,1)]&&Q9U.Q9c(tops[i-1],top))context.lineTo(x0,Math.min(bottom,tops[Q9U.F9c(i,1)]));}
else if(isBorder&&!shaveOff){if(Q9U.h9c(prevTop,top)||Q9U.X9c(i,0))context.lineTo(x0,Math.min(bottom,prevTop));}
else{context.lineTo(x0,bottom);}
prevTop=top;prevRight+=myCandleWidth;if(Q9U.T9c(type,"clustered")||isBorder)tops[i]=top;}
if(!color)color="auto";if(isBorder){context.strokeStyle=Q9U.J9c(color,"auto")?self.defaultColor:color;context.stroke();}
else{context.fillStyle=Q9U.U3c(color,(G2n+i8p))?self.defaultColor:color;context.fill();}
context.closePath();}
for(sp=0;Q9U.S3c(sp,seriesParams.length);sp++){var param=seriesParams[sp];candleWidth=Q9U.G3c(this.layout.candleWidth,params.widthFactor);var shift=0;if(Q9U.V3c(type,"clustered")){shift=sp;candleWidth/=seriesParams.length;}
drawBars(param.field,param.fill_color_up,param.opacity_up,null,true,shift,candleWidth);drawBars(param.field,param.fill_color_down,param.opacity_down,null,null,shift,candleWidth);if(Q9U.R3c(this.layout.candleWidth,2)&&bordersOn){drawBars(param.field,param.border_color_up,param.opacity_up,true,true,shift,candleWidth);drawBars(param.field,param.border_color_down,param.opacity_down,true,null,shift,candleWidth);}
if(Q9U.D3c(type,"stacked"))bottoms=STX.shallowClone(tops);}
context.globalAlpha=1;this.endClip();}
;STXChart.prototype.drawHeatmap=function(params,seriesParams){if(!seriesParams||!seriesParams.length)return ;var panelName=params.panel;if(!panelName)panelName="chart";var c=this.panels[panelName];if(!c)return ;var yAxis=params.yAxis?params.yAxis:c.yAxis,b=Math.floor(yAxis.bottom)+0.5,t=Math.floor(yAxis.top)+0.5,quotes=this.chart.dataSegment;this.getDefaultColor();if(!params.name)params.name="Data";if(!params.widthFactor)params.widthFactor=1;var offset=0.5;if(Q9U.g3c(c.chart.tmpWidth,1))offset=0;var height=null,halfHeight=null,self=this,lineWidth=null;function drawCells(field,color,isBorder,widthFactor,myoffset){context.beginPath();context.fillStyle=color;context.strokeStyle=color;var t=yAxis.top,b=yAxis.bottom,myCandleWidth=Q9U.n3c(self.layout.candleWidth,widthFactor),xc=Math.floor(Q9U.Z3c(self.pixelFromBar(0,c.chart),self.layout.candleWidth)),x0,x1;for(var x=0;Q9U.s3c(x,quotes.length);x++){var quote=quotes[x];if(!quote)continue;if(quote.candleWidth){if(Q9U.i3c(x,0)){xc+=self.layout.candleWidth;}
else{xc+=Q9U.a3c((quote.candleWidth+myCandleWidth/widthFactor),2);}
myCandleWidth=Q9U.I3c(quote.candleWidth,widthFactor);}
else{xc+=self.layout.candleWidth;}
x0=Q9U.r3c(xc,myCandleWidth/2,myoffset);x1=xc+Q9U.X3c(myCandleWidth,2)-myoffset;if(Q9U.T3c(x1-x0,2))x1=x0+1;if(quote.transform)quote=quote.transform;var cellValues=quote[field];if(!cellValues)continue;if(typeof cellValues=="number")cellValues=[cellValues];for(var i=0;Q9U.J3c(i,cellValues.length);i++){var v=self.pixelFromPrice(cellValues[i],c,yAxis);if(!lineWidth){var v1=self.pixelFromPrice(Q9U.U4c(cellValues[i],params.height),c,yAxis);context.lineWidth=1;height=Q9U.S4c(v1,v);halfHeight=Q9U.G4c(height,2);lineWidth=context.lineWidth;}
if(isBorder){var tc=v+halfHeight,bc=Q9U.V4c(v,halfHeight);context.moveTo(x0,tc);context.lineTo(x0,bc);context.lineTo(x1,bc);context.lineTo(x1,tc);context.lineTo(x0,tc);}
else{context.fillRect(x0,Q9U.R4c(v,halfHeight),Q9U.D4c(x1,x0),height);}
}
}
if(isBorder)context.stroke();context.closePath();}
this.startClip(panelName);var context=this.chart.context;context.globalAlpha=params.opacity;for(var sp=0;Q9U.g4c(sp,seriesParams.length);sp++){var param=seriesParams[sp];drawCells(param.field,param.color,null,params.widthFactor,param.border_color?offset:-offset/4);if(param.border_color&&Q9U.n4c(this.layout.candleWidth,2)){drawCells(param.field,param.border_color,true,params.widthFactor,offset);}
}
context.lineWidth=1;context.globalAlpha=1;this.endClip();}
;STXChart.prototype.startClip=function(panelName,allowYAxis){if(!panelName)panelName="chart";var panel=this.panels[panelName],yAxis=panel.yAxis;this.chart.context.save();this.chart.context.beginPath();var left=panel.left,width=panel.width;if(allowYAxis){left=0;width=this.width;}
this.chart.context.rect(left,panel.top,width,yAxis.height);this.chart.context.clip();}
;STXChart.prototype.endClip=function(){this.chart.context.restore();}
;STXChart.prototype.drawCandlesHighPerformance=function(panel,fillColor,borderColor,condition){var chart=panel.chart,quotes=chart.dataSegment,context=this.chart.context,t=panel.yAxis.top,b=panel.yAxis.bottom,top,bottom,length,borderOffset=0;if(borderColor&&!STX.isTransparent(borderColor))borderOffset=0.5;var leftTick=Q9U.Z4c(chart.dataSet.length,chart.scroll),rightTick=leftTick+chart.maxTicks;context.beginPath();context.fillStyle=fillColor;var yAxis=panel.yAxis,whitespace=Q9U.s4c(chart.tmpWidth,2),candleWidth=this.layout.candleWidth,xbase=Q9U.i4c(panel.left,0.5*candleWidth,this.micropixels,1);for(var x=0;Q9U.z4c(x,quotes.length);x++){xbase+=Q9U.H4c(candleWidth,2);candleWidth=this.layout.candleWidth;xbase+=Q9U.q4c(candleWidth,2);var quote=quotes[x];if(!quote)continue;if(quote.projection)continue;if(quote.candleWidth){xbase+=Q9U.m4c((quote.candleWidth-candleWidth),2);candleWidth=quote.candleWidth;if(Q9U.d4c(this.layout.chartType,"volume_candle"))whitespace=Q9U.f4c(candleWidth,2);}
if(Q9U.j0c(quote.Open,quote.Close))continue;if(Q9U.o0c(condition,STXChart.CANDLEUP)&&Q9U.t0c(quote.Open,quote.Close))continue;if(Q9U.O0c(condition,STXChart.CANDLEDOWN)&&Q9U.L0c(quote.Open,quote.Close))continue;if(Q9U.k0c(condition,STXChart.CLOSEUP)&&Q9U.w0c(quote.Close,quote.iqPrevClose))continue;if(Q9U.e0c(condition,STXChart.CLOSEDOWN)&&Q9U.E0c(quote.Close,quote.iqPrevClose))continue;if(Q9U.P0c(condition,STXChart.CLOSEEVEN)&&Q9U.p0c(quote.Close,quote.iqPrevClose))continue;if(quote.transform)quote=quote.transform;var cache=quote.cache,tick=leftTick+x;if(Q9U.Q0c(tick,panel.cacheLeft)||Q9U.F0c(tick,panel.cacheRight)||!cache.open){var o=(yAxis.semiLog?this.pixelFromPrice(quote.Open,panel):(Q9U.h0c((yAxis.high-quote.Open),yAxis.multiplier))+yAxis.top),c=(yAxis.semiLog?this.pixelFromPrice(quote.Close,panel):(Q9U.X0c((yAxis.high-quote.Close),yAxis.multiplier))+yAxis.top);top=Math.floor(Math.min(o,c))+borderOffset;bottom=Math.max(o,c);length=Math.floor(Q9U.T0c(bottom,top));if(Q9U.J0c(top,t)){if(Q9U.U8c(top+length,t)){cache.open=top;cache.close=top;continue;}
length-=Q9U.S8c(t,top);top=t;}
if(Q9U.G8c(top+length,b)){length-=(top+length-b);}
length=Math.max(length,2);cache.open=top;cache.close=cache.open+length;}
if(Q9U.V8c(cache.open,b))continue;if(Q9U.R8c(cache.close,t))continue;flr_xbase=Math.floor(xbase)+0.5;var xstart=Math.floor(Q9U.D8c(flr_xbase,whitespace))+borderOffset,xend=Q9U.g8c(Math.round(flr_xbase+whitespace),borderOffset);if(Q9U.n8c(quote.Open,quote.Close)){context.moveTo(xstart,cache.open);context.lineTo(xend,cache.open);context.lineTo(xend,cache.close);context.lineTo(xstart,cache.close);context.lineTo(xstart,cache.open);}
}
context.fill();if(borderOffset){context.lineWidth=1;context.strokeStyle=borderColor;context.stroke();}
}
;STXChart.prototype.drawCandles=function(panel,colorFunction,isOutline){var chart=panel.chart;if(!chart){chart=panel;panel=panel.chart;}
var quotes=chart.dataSegment,context=this.chart.context,t=panel.yAxis.top,b=panel.yAxis.bottom,top,bottom,length,borderColor="transparent",fillColor="transparent",borderOffset=0;if(!STX.isTransparent(borderColor))borderOffset=0.5;var leftTick=Q9U.Z8c(chart.dataSet.length,chart.scroll),rightTick=leftTick+chart.maxTicks,yAxis=panel.yAxis,whitespace=Q9U.s8c(chart.tmpWidth,2),candleWidth=this.layout.candleWidth,xbase=Q9U.i8c(panel.left,0.5*candleWidth,this.micropixels,1);for(var x=0;Q9U.z8c(x,quotes.length);x++){xbase+=Q9U.H8c(candleWidth,2);candleWidth=this.layout.candleWidth;xbase+=Q9U.q8c(candleWidth,2);var quote=quotes[x];if(!quote)continue;if(quote.projection)continue;if(quote.candleWidth){xbase+=Q9U.m8c((quote.candleWidth-candleWidth),2);candleWidth=quote.candleWidth;if(Q9U.d8c(this.layout.chartType,"volume_candle"))whitespace=Q9U.f8c(candleWidth,2);}
if(!quote.Open&&Q9U.j6c(quote.Open,0))continue;if(Q9U.o6c(quote.Open,quote.Close))continue;var myColor=colorFunction(this,quote,isOutline?"outline":"solid");if(!myColor)continue;if(isOutline)borderColor=myColor;else fillColor=myColor;context.beginPath();context.fillStyle=fillColor;if(quote.transform)quote=quote.transform;var cache=quote.cache,tick=leftTick+x;if(Q9U.t6c(tick,panel.cacheLeft)||Q9U.O6c(tick,panel.cacheRight)||!cache.open){var o=(yAxis.semiLog?this.pixelFromPrice(quote.Open,panel):(Q9U.L6c((yAxis.high-quote.Open),yAxis.multiplier))+yAxis.top),c=(yAxis.semiLog?this.pixelFromPrice(quote.Close,panel):(Q9U.k6c((yAxis.high-quote.Close),yAxis.multiplier))+yAxis.top);top=Math.floor(Math.min(o,c))+borderOffset;bottom=Math.max(o,c);length=Math.floor(Q9U.w6c(bottom,top));if(Q9U.e6c(top,t)){if(Q9U.E6c(top+length,t)){cache.open=top;cache.close=top;continue;}
length-=Q9U.P6c(t,top);top=t;}
if(Q9U.p6c(top+length,b)){length-=(top+length-b);}
length=Math.max(length,2);cache.open=top;cache.close=cache.open+length;}
if(Q9U.Q6c(cache.open,b))continue;if(Q9U.F6c(cache.close,t))continue;flr_xbase=Math.floor(xbase)+0.5;var xstart=Math.floor(Q9U.h6c(flr_xbase,whitespace))+borderOffset,xend=Q9U.X6c(Math.round(flr_xbase+whitespace),borderOffset);if(Q9U.T6c(quote.Open,quote.Close)){context.moveTo(xstart,cache.open);context.lineTo(xend,cache.open);context.lineTo(xend,cache.close);context.lineTo(xstart,cache.close);context.lineTo(xstart,cache.open);}
if(Q9U.J6c(fillColor,"transparent"))context.fill();if(borderOffset){context.lineWidth=1;context.strokeStyle=borderColor;context.stroke();}
}
}
;STXChart.prototype.drawShadowsHighPerformance=function(panel,style,condition){var chart=panel.chart,quotes=chart.dataSegment,context=this.chart.context;context.lineWidth=1;var t=panel.yAxis.top,b=panel.yAxis.bottom,top,bottom,left,leftTick=Q9U.U2c(chart.dataSet.length,chart.scroll),rightTick=leftTick+chart.maxTicks;context.beginPath();var yAxis=panel.yAxis,candleWidth=this.layout.candleWidth,xbase=Q9U.S2c(panel.left,0.5*candleWidth,this.micropixels,1);for(var x=0;Q9U.x2c(x,quotes.length);x++){xbase+=Q9U.K2c(candleWidth,2);candleWidth=this.layout.candleWidth;xbase+=Q9U.C2c(candleWidth,2);var quote=quotes[x];if(!quote)continue;if(quote.projection)continue;if(quote.candleWidth){xbase+=Q9U.W2c((quote.candleWidth-candleWidth),2);candleWidth=quote.candleWidth;}
if(condition){if(Q9U.v2c(condition,STXChart.CANDLEUP)&&Q9U.M2c(quote.Open,quote.Close))continue;else if(Q9U.u2c(condition,STXChart.CANDLEDOWN)&&Q9U.N2c(quote.Open,quote.Close))continue;else if(Q9U.b2c(condition,STXChart.CLOSEUP)&&Q9U.z2c(quote.Close,quote.iqPrevClose))continue;else if(Q9U.H2c(condition,STXChart.CLOSEDOWN)&&Q9U.q2c(quote.Close,quote.iqPrevClose))continue;else if(Q9U.m2c(condition,STXChart.CLOSEEVEN)&&Q9U.d2c(quote.Close,quote.iqPrevClose))continue;}
if(quote.transform)quote=quote.transform;var cache=quote.cache,tick=leftTick+x;if(Q9U.f2c(tick,panel.cacheLeft)||Q9U.j1c(tick,panel.cacheRight)||!cache.top){top=(yAxis.semiLog?this.pixelFromPrice(quote.High,panel):(Q9U.o1c((yAxis.high-quote.High),yAxis.multiplier))+yAxis.top);bottom=(yAxis.semiLog?this.pixelFromPrice(quote.Low,panel):(Q9U.t1c((yAxis.high-quote.Low),yAxis.multiplier))+yAxis.top);var length=Q9U.O1c(bottom,top);if(Q9U.L1c(top,t)){if(Q9U.k1c(top+length,t)){cache.top=top;cache.bottom=top;continue;}
length-=Q9U.w1c(t,top);top=t;}
if(Q9U.e1c(top+length,b)){length-=(top+length-b);}
cache.top=top;cache.bottom=cache.top+length;}
if(Q9U.E1c(cache.top,b))continue;if(Q9U.P1c(cache.bottom,t))continue;var xx=Math.floor(xbase)+0.5;context.moveTo(xx,cache.top);context.lineTo(xx,cache.bottom);if(Q9U.p1c(quote.Open,quote.Close)){var offset=this.offset;if(Q9U.Q1c(this.layout.chartType,"volume_candle")){offset=Q9U.F1c(candleWidth,2);}
var x0=Q9U.h1c(xx,offset),x1=xx+offset,o=Math.floor(yAxis.semiLog?this.pixelFromPrice(quote.Open,panel):(Q9U.X1c((yAxis.high-quote.Open),yAxis.multiplier))+yAxis.top)+0.5;if(Q9U.T1c(o,b)&&Q9U.J1c(o,t)){context.moveTo(x0,o);context.lineTo(x1,o);}
}
}
this.canvasColor(style);context.stroke();}
;STXChart.prototype.drawShadows=function(panel,colorFunction){var chart=panel.chart;if(!chart){chart=panel;panel=panel.chart;}
var quotes=chart.dataSegment,context=this.chart.context;context.lineWidth=1;var t=panel.yAxis.top,b=panel.yAxis.bottom,top,bottom,left,leftTick=Q9U.U5c(chart.dataSet.length,chart.scroll),rightTick=leftTick+chart.maxTicks,yAxis=panel.yAxis,candleWidth=this.layout.candleWidth,xbase=Q9U.S5c(panel.left,0.5*candleWidth,this.micropixels,1);for(var x=0;Q9U.x5c(x,quotes.length);x++){xbase+=Q9U.K5c(candleWidth,2);candleWidth=this.layout.candleWidth;xbase+=Q9U.C5c(candleWidth,2);var quote=quotes[x];if(!quote)continue;if(quote.projection)continue;if(quote.candleWidth){xbase+=Q9U.W5c((quote.candleWidth-candleWidth),2);candleWidth=quote.candleWidth;}
var color=colorFunction(this,quote,"shadow");if(!color)continue;if(quote.transform)quote=quote.transform;var cache=quote.cache,tick=leftTick+x;if(Q9U.v5c(tick,panel.cacheLeft)||Q9U.M5c(tick,panel.cacheRight)||!cache.top){top=(yAxis.semiLog?this.pixelFromPrice(quote.High,panel):(Q9U.u5c((yAxis.high-quote.High),yAxis.multiplier))+yAxis.top);bottom=(yAxis.semiLog?this.pixelFromPrice(quote.Low,panel):(Q9U.N5c((yAxis.high-quote.Low),yAxis.multiplier))+yAxis.top);var length=Q9U.b5c(bottom,top);if(Q9U.z5c(top,t)){if(Q9U.H5c(top+length,t)){cache.top=top;cache.bottom=top;continue;}
length-=Q9U.q5c(t,top);top=t;}
if(Q9U.m5c(top+length,b)){length-=(top+length-b);}
cache.top=top;cache.bottom=cache.top+length;}
if(Q9U.d5c(cache.top,b))continue;if(Q9U.f5c(cache.bottom,t))continue;var xx=Math.floor(xbase)+0.5;context.beginPath();context.moveTo(xx,cache.top);context.lineTo(xx,cache.bottom);if(Q9U.j7D(quote.Open,quote.Close)||(!quote.Open&&Q9U.o7D(quote.Open,0))){var offset=this.offset;if(Q9U.t7D(this.layout.chartType,"volume_candle")){offset=Q9U.O7D(candleWidth,2);}
var x0=Q9U.L7D(xx,offset),x1=xx+offset,o=Math.floor((yAxis.semiLog?this.pixelFromPrice(quote.Close,panel):(Q9U.k7D((yAxis.high-quote.Close),yAxis.multiplier))+yAxis.top))+0.5;if(Q9U.w7D(o,b)&&Q9U.e7D(o,t)){context.moveTo(x0,o);context.lineTo(x1,o);}
}
context.strokeStyle=color;context.stroke();}
}
;STXChart.prototype.scatter=function(panel){var chart=panel.chart,quotes=chart.dataSegment,context=this.chart.context;context.beginPath();context.lineWidth=4;var t=panel.yAxis.top,b=panel.yAxis.bottom,xbase=Q9U.E7D(panel.left,0.5*this.layout.candleWidth,this.micropixels,1);for(var x=0;Q9U.i7D(x,quotes.length);x++){xbase+=this.layout.candleWidth;var quote=quotes[x];if(!quote)continue;if(!quote.projection){if(quote.transform)quote=quote.transform;var scatter=[quote.Close];if(Q9U.a7D("Scatter",quote))scatter=quote.Scatter;for(var i=0;Q9U.I7D(i,scatter.length);i++){var top=this.pixelFromPrice(scatter[i],panel);if(Q9U.r7D(top,t))continue;if(Q9U.A7D(top,b))continue;context.moveTo(Q9U.y7D(xbase,2),top);context.lineTo(xbase+2,top);}
}
}
this.canvasColor("stx_scatter_chart");context.stroke();context.closePath();context.lineWidth=1;}
;STXChart.prototype.drawKagiSquareWave=function(panel,upStyleName,downStyleName){var chart=panel.chart;this.startClip(panel.name);var quotes=chart.dataSegment,context=chart.context,upStyle=this.canvasStyle(upStyleName),downStyle=this.canvasStyle(downStyleName);this.canvasColor(upStyleName);var upColor=context.strokeStyle;this.canvasColor(downStyleName);var downColor=context.strokeStyle,upWidth=1;if(upStyle.width&&Q9U.c7D(parseInt(upStyle.width,10),25)){upWidth=Math.max(1,STX.stripPX(upStyle.width));}
var downWidth=1;if(downStyle.width&&Q9U.B7D(parseInt(downStyle.width,10),25)){downWidth=Math.max(1,STX.stripPX(downStyle.width));}
context.beginPath();var leftTick=Q9U.l9D(chart.dataSet.length,chart.scroll),yAxis=panel.yAxis,first=true,previousOpen=null,lastClose=null,trend=null,xbase=Q9U.Y9D(panel.left,0.5*this.layout.candleWidth,this.micropixels,1);for(var x=0;Q9U.O9D(x,quotes.length);x++){xbase+=this.layout.candleWidth;var quote=quotes[x];if(!quote)continue;if(quote.projection)break;if(quote.transform)quote=quote.transform;var cache=quote.cache,tick=leftTick+x;if(Q9U.L9D(tick,panel.cacheLeft)||Q9U.k9D(tick,panel.cacheRight)||!cache.open){cache.open=(yAxis.semiLog?this.pixelFromPrice(quote.Open,panel):(Q9U.w9D((yAxis.high-quote.Open),yAxis.multiplier))+yAxis.top);cache.close=(yAxis.semiLog?this.pixelFromPrice(quote.Close,panel):(Q9U.e9D((yAxis.high-quote.Close),yAxis.multiplier))+yAxis.top);}
lastClose=cache.close;if(first){context.moveTo(Math.floor(xbase),cache.open);previousOpen=cache.open;if(Q9U.E9D(cache.close,cache.open))trend=1;else trend=-1;first=false;}
if(trend!=-1&&Q9U.P9D(cache.close,previousOpen)&&Q9U.p9D(previousOpen,cache.open)){context.lineTo(Math.floor(xbase),previousOpen);context.strokeStyle=downColor;context.lineWidth=downWidth;context.stroke();context.closePath();context.beginPath();trend=-1;context.moveTo(Math.floor(xbase),previousOpen);}
else if(Q9U.Q9D(trend,1)&&Q9U.F9D(cache.close,previousOpen)&&Q9U.h9D(previousOpen,cache.open)){context.lineTo(Math.floor(xbase),previousOpen);context.strokeStyle=upColor;context.lineWidth=upWidth;context.stroke();context.closePath();context.beginPath();trend=1;context.moveTo(Math.floor(xbase),previousOpen);}
context.lineTo(Math.floor(xbase),cache.close);if(Q9U.X9D(x+1,quotes.length)){context.lineTo(Math.floor(xbase+this.layout.candleWidth),cache.close);previousOpen=cache.open;}
}
if(trend==-1||(Q9U.T9D(trend,null)&&Q9U.J9D(lastClose,previousOpen))){context.strokeStyle=upColor;context.lineWidth=upWidth;}
else{context.strokeStyle=downColor;context.lineWidth=downWidth;}
context.stroke();context.closePath();this.endClip();context.lineWidth=1;}
;STXChart.prototype.drawPointFigureChart=function(panel,style,condition){var chart=panel.chart;this.startClip(panel.name);var quotes=chart.dataSegment,context=chart.context;this.canvasColor(style);var pfstyle=this.canvasStyle(style),paddingTop=parseInt(pfstyle.paddingTop,10),paddingBottom=parseInt(pfstyle.paddingBottom,10),paddingLeft=parseInt(pfstyle.paddingLeft,10),paddingRight=parseInt(pfstyle.paddingRight,10);if(pfstyle.width&&Q9U.U3D(parseInt(pfstyle.width,10),25)){context.lineWidth=Math.max(1,STX.stripPX(pfstyle.width));}
else{context.lineWidth=2;}
context.beginPath();if(!this.chart.pandf)this.chart.pandf={"box":1,"reversal":3}
;var box=this.chart.pandf.box,leftTick=Q9U.S3D(chart.dataSet.length,chart.scroll),yAxis=panel.yAxis,boxes,height,start,candleWidth=this.layout.candleWidth,xbase=Q9U.G3D(panel.left,candleWidth,this.micropixels,1);for(var x=0;Q9U.K3D(x,quotes.length);x++){xbase+=candleWidth;var quote=quotes[x];if(!quote)continue;if(quote.projection)break;if(quote.candleWidth)candleWidth=quote.candleWidth;if(quote.transform)quote=quote.transform;if(Q9U.C3D(condition,"X")&&Q9U.W3D(quote.Open,quote.Close))continue;else if(Q9U.v3D(condition,"O")&&Q9U.M3D(quote.Open,quote.Close))continue;var cache=quote.cache,tick=leftTick+x;if(Q9U.u3D(tick,panel.cacheLeft)||Q9U.N3D(tick,panel.cacheRight)||!cache.open){cache.open=(yAxis.semiLog?this.pixelFromPrice(quote.Open,panel):(Q9U.b3D((yAxis.high-quote.Open),yAxis.multiplier))+yAxis.top);cache.close=(yAxis.semiLog?this.pixelFromPrice(quote.Close,panel):(Q9U.z3D((yAxis.high-quote.Close),yAxis.multiplier))+yAxis.top);}
var xxl=Math.round(xbase),xxr=Math.round(xbase+candleWidth);boxes=Math.abs(Math.round(Q9U.H3D((quote.Close-quote.Open),box)));height=Math.abs(Q9U.q3D((cache.open-cache.close),boxes));var voffset=Q9U.m3D(height,2);start=cache.open;for(;Q9U.d3D(boxes,0);boxes--){if(Q9U.f3D(condition,"X")){context.moveTo(xxl+paddingLeft,Q9U.j4D(start,paddingBottom,voffset));context.lineTo(Q9U.Y4D(xxr,paddingRight),Q9U.x4D(start,height,paddingTop,voffset));context.moveTo(xxl+paddingLeft,Q9U.L4D(start,height,paddingTop,voffset));context.lineTo(Q9U.g4D(xxr,paddingRight),Q9U.n4D(start,paddingBottom,voffset));start-=height;}
else if(Q9U.E4D(condition,"O")){context.moveTo(Q9U.P4D((xxl+xxr),2),start+paddingTop-voffset);context.bezierCurveTo(xxr+paddingRight,start+paddingTop-voffset,xxr+paddingRight,start+height-paddingBottom-voffset,Q9U.p4D((xxl+xxr),2),start+height-paddingBottom-voffset);context.bezierCurveTo(Q9U.Q4D(xxl,paddingLeft),start+height-paddingBottom-voffset,Q9U.F4D(xxl,paddingLeft),start+paddingTop-voffset,Q9U.h4D((xxl+xxr),2),start+paddingTop-voffset);start+=height;}
}
}
context.stroke();this.endClip();context.lineWidth=1;}
;STXChart.prototype.drawBarChartHighPerformance=function(panel,style,condition){var chart=panel.chart,quotes=chart.dataSegment,context=chart.context,c=this.canvasStyle(style);if(c.width&&Q9U.X4D(parseInt(c.width,10),25)){context.lineWidth=Math.max(1,STX.stripPX(c.width));}
else{context.lineWidth=1;}
context.beginPath();var t=panel.yAxis.top,b=panel.yAxis.bottom,top,bottom,length,leftTick=Q9U.T4D(chart.dataSet.length,chart.scroll),rightTick=leftTick+chart.maxTicks,yAxis=panel.yAxis,xbase=Q9U.J4D(panel.left,0.5*this.layout.candleWidth,this.micropixels,1),hlen=Q9U.l0D(chart.tmpWidth,2),voffset=Q9U.Y0D(context.lineWidth,2);for(var x=0;Q9U.x0D(x,quotes.length);x++){xbase+=this.layout.candleWidth;var quote=quotes[x];if(!quote)continue;if(quote.projection)break;if(condition){if(Q9U.K0D(condition,STXChart.CLOSEUP)&&Q9U.C0D(quote.Close,quote.iqPrevClose))continue;else if(Q9U.W0D(condition,STXChart.CLOSEDOWN)&&Q9U.v0D(quote.Close,quote.iqPrevClose))continue;else if(Q9U.M0D(condition,STXChart.CLOSEEVEN)&&Q9U.u0D(quote.Close,quote.iqPrevClose))continue;}
if(quote.transform)quote=quote.transform;var cache=quote.cache,tick=leftTick+x;if(Q9U.N0D(tick,panel.cacheLeft)||Q9U.b0D(tick,panel.cacheRight)||!cache.top){top=(yAxis.semiLog?this.pixelFromPrice(quote.High,panel):(Q9U.z0D((yAxis.high-quote.High),yAxis.multiplier))+yAxis.top);bottom=(yAxis.semiLog?this.pixelFromPrice(quote.Low,panel):(Q9U.H0D((yAxis.high-quote.Low),yAxis.multiplier))+yAxis.top);length=Q9U.q0D(bottom,top);cache.open=(yAxis.semiLog?this.pixelFromPrice(quote.Open,panel):(Q9U.m0D((yAxis.high-quote.Open),yAxis.multiplier))+yAxis.top);cache.close=(yAxis.semiLog?this.pixelFromPrice(quote.Close,panel):(Q9U.d0D((yAxis.high-quote.Close),yAxis.multiplier))+yAxis.top);if(Q9U.f0D(top,t)){if(Q9U.j8D(top+length,t)){cache.top=top;cache.bottom=top;continue;}
length-=Q9U.o8D(t,top);top=t;}
if(Q9U.t8D(top+length,b)){length-=(top+length-b);}
cache.top=top;cache.bottom=top+length;}
var xx=Math.floor(xbase)+0.5;if(Q9U.O8D(cache.top,b)&&Q9U.L8D(cache.bottom,t)){context.moveTo(xx,Q9U.k8D(cache.top,voffset));context.lineTo(xx,cache.bottom+voffset);}
if(Q9U.w8D(cache.open,t)&&Q9U.e8D(cache.open,b)){context.moveTo(xx,cache.open);context.lineTo(Q9U.E8D(xx,hlen),cache.open);}
if(Q9U.P8D(cache.close,t)&&Q9U.p8D(cache.close,b)){context.moveTo(xx,cache.close);context.lineTo(xx+hlen,cache.close);}
}
this.canvasColor(style);context.stroke();context.closePath();context.lineWidth=1;}
;STXChart.prototype.drawBarChart=function(panel,style,colorFunction){var chart=panel.chart;if(!chart){chart=panel;panel=panel.chart;}
var quotes=chart.dataSegment,context=chart.context,c=this.canvasStyle(style);if(c.width&&Q9U.Q8D(parseInt(c.width,10),25)){context.lineWidth=Math.max(1,STX.stripPX(c.width));}
else{context.lineWidth=1;}
var t=panel.yAxis.top,b=panel.yAxis.bottom,top,bottom,length,leftTick=Q9U.F8D(chart.dataSet.length,chart.scroll),rightTick=leftTick+chart.maxTicks,yAxis=panel.yAxis,colors={}
,hlen=Q9U.h8D(chart.tmpWidth,2),voffset=Q9U.X8D(context.lineWidth,2),candleWidth=this.layout.candleWidth,xbase=Q9U.T8D(panel.left,0.5*candleWidth,this.micropixels,1);for(var x=0;Q9U.B8D(x,quotes.length);x++){xbase+=Q9U.l6D(candleWidth,2);candleWidth=this.layout.candleWidth;xbase+=Q9U.Y6D(candleWidth,2);var quote=quotes[x];if(!quote)continue;if(quote.projection)break;if(quote.candleWidth){xbase+=Q9U.x6D((quote.candleWidth-candleWidth),2);candleWidth=quote.candleWidth;}
var color=colorFunction(this,quote);if(!color)continue;colors[color]=1;context.strokeStyle=color;context.beginPath();if(quote.transform)quote=quote.transform;var cache=quote.cache,tick=leftTick+x;if(Q9U.K6D(tick,panel.cacheLeft)||Q9U.C6D(tick,panel.cacheRight)||!cache.top){top=this.pixelFromPrice(quote.High,panel);bottom=this.pixelFromPrice(quote.Low,panel);length=Q9U.W6D(bottom,top);cache.open=(yAxis.semiLog?this.pixelFromPrice(quote.Open,panel):(Q9U.v6D((yAxis.high-quote.Open),yAxis.multiplier))+yAxis.top);cache.close=(yAxis.semiLog?this.pixelFromPrice(quote.Close,panel):(Q9U.M6D((yAxis.high-quote.Close),yAxis.multiplier))+yAxis.top);if(Q9U.u6D(top,t)){if(Q9U.N6D(top+length,t)){cache.top=top;cache.bottom=top;continue;}
length-=Q9U.b6D(t,top);top=t;}
if(Q9U.z6D(top+length,b)){length-=(top+length-b);}
cache.top=top;cache.bottom=top+length;}
var xx=Math.floor(xbase)+0.5;if(Q9U.H6D(cache.top,b)&&Q9U.q6D(cache.bottom,t)){context.moveTo(xx,Q9U.m6D(cache.top,voffset));context.lineTo(xx,cache.bottom+voffset);}
if(Q9U.d6D(cache.open,t)&&Q9U.f6D(cache.open,b)){context.moveTo(xx,cache.open);context.lineTo(Q9U.j2D(xx,hlen),cache.open);}
if(Q9U.o2D(cache.close,t)&&Q9U.t2D(cache.close,b)){context.moveTo(xx,cache.close);context.lineTo(xx+hlen,cache.close);}
context.stroke();}
context.lineWidth=1;return colors;}
;STXChart.prototype.plotLineChart=function(panel,quotes,field,parameters,colorFunction){var skipProjections=false,skipTransform=false,noSlopes=false,tension=0,points=[];if(parameters){skipProjections=parameters.skipProjections;skipTransform=parameters.skipTransform;noSlopes=parameters.noSlopes;tension=parameters.tension;}
var chart=panel.chart,context=this.chart.context,first=true,yAxis=panel.yAxis,t=yAxis.top,b=yAxis.bottom,leftTick=Q9U.O2D(chart.dataSet.length,chart.scroll),lastQuote=null,colors={}
,lastXY=[0,0],candleWidth=this.layout.candleWidth,xbase=Q9U.L2D(panel.left,(parameters.noSlopes?1:0.5)*candleWidth,this.micropixels,1);this.startClip(panel.name);context.beginPath();for(var i=0;Q9U.g2D(i,quotes.length);i++){xbase+=Q9U.n2D(candleWidth,2);if(parameters.noSlopes)xbase+=Q9U.Z2D(candleWidth,2);candleWidth=this.layout.candleWidth;if(!parameters.noSlopes)xbase+=Q9U.s2D(candleWidth,2);var quote=quotes[i];if(!quote)continue;if(skipProjections&&quote.projection)break;if(quote.candleWidth){if(!parameters.noSlopes)xbase+=Q9U.i2D((quote.candleWidth-candleWidth),2);candleWidth=quote.candleWidth;}
if(!skipTransform&&quote.transform)quote=quote.transform;var x=xbase,cache=quote.cache,tick=leftTick+i;if(!quote[field]&&Q9U.a2D(quote[field],0))continue;if(Q9U.I2D(tick,panel.cacheLeft)||Q9U.r2D(tick,panel.cacheRight)||!cache[field]){cache[field]=(yAxis.semiLog?this.pixelFromPrice(quote[field],panel):(Q9U.A2D((yAxis.high-quote[field]),yAxis.multiplier))+yAxis.top);}
if(Q9U.y2D(x,panel.right))lastQuote=quote;if(Q9U.c2D(i,quotes.length-1)){if(this.extendLastTick)x+=Q9U.B2D(candleWidth,2);if(parameters.lastTickOffset)x+=parameters.lastTickOffset;}
var y=cache[field],pattern=null;if(colorFunction){var color=colorFunction(this,quote);if(!color)continue;if(typeof color=="object"){pattern=color.pattern;color=color.color;}
if(Q9U.l1D(context.strokeStyle,color)){if(!first){context.stroke();context.beginPath();context.moveTo(lastXY[0],lastXY[1]);}
context.strokeStyle=color;colors[color]=1;}
}
if(first){first=false;if(noSlopes||Q9U.Y1D(leftTick,0)){context.moveTo(i?x:0,y);if(tension){points.push(x,y);}
else{if(pattern){context.dashedLineTo(0,y,x,y,pattern);}
else{context.lineTo(x,y);}
}
}
else if(Q9U.x1D(leftTick,0)){var baseline=chart.dataSet[leftTick];if(!skipTransform&&baseline.transform)baseline=baseline.transform;var y0=baseline[field];if(!y0||isNaN(y0)){context.moveTo(i?x:0,y);if(tension){points.push(x,y);}
}
else{y0=(yAxis.semiLog?this.pixelFromPrice(y0,panel):(Q9U.K1D((yAxis.high-y0),yAxis.multiplier))+yAxis.top);var x0=Q9U.C1D(x,candleWidth);if(pattern){context.dashedLineTo(x0,y0,x,y,pattern);}
else{context.moveTo(x0,y0);if(tension){points.push(x0,y0,x,y);}
else{context.lineTo(x,y);}
}
}
}
}
else{if(noSlopes){var quote1=quotes[Q9U.W1D(i,1)];if(!quote1)continue;if(!skipTransform&&quote1.transform)quote1=quote1.transform;if(i){if(pattern){context.dashedLineTo(lastXY[0],lastXY[1],x,lastXY[1],pattern);}
else{context.lineTo(x,lastXY[1]);}
context.moveTo(x,y);}
if(Q9U.v1D(i,quotes.length-1)){if(pattern){context.dashedLineTo(x,y,x+candleWidth,y,pattern);}
else{context.lineTo(x+candleWidth,y);}
}
}
else{if(pattern){context.dashedLineTo(lastXY[0],lastXY[1],x,y,pattern);}
else{if(tension){points.push(x,y);}
else{context.lineTo(x,y);}
}
}
}
lastXY=[x,y];if(Q9U.M1D(i,(quotes.length-1))&&tension){points.push(x,y);plotSplinePrimitive(points,tension,context);}
}
context.stroke();this.endClip();if(parameters.label&&lastQuote){var txt;if(yAxis.priceFormatter){txt=yAxis.priceFormatter(this,panel,lastQuote[field],parameters.labelDecimalPlaces);}
else{txt=this.formatYAxisPrice(lastQuote[field],panel,parameters.labelDecimalPlaces);}
var yaxisLabelStyle=this.yaxisLabelStyle;if(panel.yAxis.yaxisLabelStyle)yaxisLabelStyle=panel.yAxis.yaxisLabelStyle;var labelcolor=Q9U.u1D(yaxisLabelStyle,"noop")?context.strokeStyle:null;this.yAxisLabels.push({src:"plot","args":[panel,txt,lastQuote.cache[field],Q9U.N1D(yaxisLabelStyle,"noop")?"#FFFFFF":context.strokeStyle,labelcolor]}
);}
return colors;}
;STXChart.prototype.plotMountainChart=function(panel,quotes,field,parameters){var skipProjections=false,skipTransform=false,reverse=false,tension=0,points=[];if(parameters){skipProjections=parameters.skipProjections;skipTransform=parameters.skipTransform;reverse=parameters.reverse;tension=parameters.tension;}
var chart=panel.chart,context=this.chart.context,first=true,t=panel.yAxis.top,b=panel.yAxis.bottom;this.startClip(panel.name);context.beginPath();var leftTick=Q9U.b1D(chart.dataSet.length,chart.scroll),firstX=null,firstY=null,yAxis=panel.yAxis,x=0;for(var i=0;Q9U.z1D(i,quotes.length);i++){var quote=quotes[i];if(!quote)continue;if(skipProjections&&quote.projection)break;if(!skipTransform&&quote.transform)quote=quote.transform;var cache=quote.cache,tick=leftTick+i;if(Q9U.H1D(tick,panel.cacheLeft)||Q9U.q1D(tick,panel.cacheRight)||!cache[field]){if(!quote[field]&&Q9U.m1D(quote[field],0))continue;cache[field]=(yAxis.semiLog?this.pixelFromPrice(quote[field],panel):(Q9U.d1D((yAxis.high-quote[field]),yAxis.multiplier))+yAxis.top);}
x=panel.left+Q9U.f1D((i+0.5),this.layout.candleWidth)+this.micropixels-1;if(Q9U.j5D(i,quotes.length-1)){if(this.extendLastTick)x+=Q9U.o5D(this.layout.candleWidth,2);if(parameters.lastTickOffset)x+=parameters.lastTickOffset;}
if(Q9U.t5D(firstX,null))firstX=x;var y=cache[field];if(Q9U.O5D(firstY,null))firstY=y;if(first){first=false;if(Q9U.L5D(leftTick,0)){context.moveTo(x,y);if(tension){points.push(x,y);}
}
else{var baseline=chart.dataSet[leftTick];if(baseline.transform)baseline=baseline.transform;var y0=baseline[field];y0=(yAxis.semiLog?this.pixelFromPrice(y0,panel):(Q9U.k5D((yAxis.high-y0),yAxis.multiplier))+yAxis.top);firstX=Q9U.w5D(x,this.layout.candleWidth);context.moveTo(firstX,y0);if(tension){points.push(firstX,y0,x,y);}
else{context.lineTo(x,y);}
}
}
else{if(tension){points.push(x,y);}
else{context.lineTo(x,y);}
}
if(Q9U.e5D(i,(quotes.length-1))&&tension){points.push(x,y);plotSplinePrimitive(points,tension,context);}
}
context.lineTo(x,reverse?t:b);context.lineTo(firstX,reverse?t:b);if(reverse){if(Q9U.E5D(firstY,t))firstY=t;}
else{if(Q9U.P5D(firstY,b))firstY=b;}
context.lineTo(firstX,firstY);context.fill();context.closePath();this.endClip();}
;STXChart.prototype.drawLineChart=function(panel,style,colorFunction){var context=this.chart.context,c=this.canvasStyle(style);if(c.width&&Q9U.p5D(parseInt(c.width,10),25)){context.lineWidth=Math.max(1,STX.stripPX(c.width));}
else{context.lineWidth=1;}
this.canvasColor(style);var params={skipProjections:true}
;if(panel.chart.tension)params.tension=panel.chart.tension;if(panel.chart.lastTickOffset)params.lastTickOffset=panel.chart.lastTickOffset;var rc=this.plotLineChart(panel,panel.chart.dataSegment,"Close",params,colorFunction);context.lineWidth=1;return rc;}
;STXChart.prototype.drawMountainChart=function(panel){var context=this.chart.context,c=this.canvasStyle("stx_mountain_chart");if(c.width&&Q9U.Q5D(parseInt(c.width,10),25)){context.lineWidth=Math.max(1,STX.stripPX(c.width));}
else{context.lineWidth=1;}
var top=this.pixelFromPrice(panel.chart.highValue,panel);if(isNaN(top))top=0;var backgroundColor=c.backgroundColor,color=c.color;if(color&&Q9U.F5D(color,"transparent")){var gradient=context.createLinearGradient(0,top,0,panel.yAxis.bottom);gradient.addColorStop(0,backgroundColor);gradient.addColorStop(1,color);context.fillStyle=gradient;}
else{context.fillStyle=backgroundColor;}
var params={skipProjections:true}
;if(panel.chart.tension)params.tension=panel.chart.tension;if(panel.chart.lastTickOffset)params.lastTickOffset=panel.chart.lastTickOffset;this.plotMountainChart(panel,panel.chart.dataSegment,"Close",params);var strokeStyle=c.borderTopColor;if(strokeStyle&&Q9U.h5D(strokeStyle,"transparent")){context.strokeStyle=strokeStyle;this.plotLineChart(panel,panel.chart.dataSegment,"Close",params);}
context.lineWidth=1;}
;STXChart.prototype.drawWaveChart=function(panel){var chart=panel.chart,quotes=chart.dataSegment,context=this.chart.context;this.startClip(panel.name);context.beginPath();var first=false,reset=false,t=panel.yAxis.top,b=panel.yAxis.bottom,xbase=panel.left+Math.floor(-0.5*this.layout.candleWidth+this.micropixels);for(var i=0;Q9U.X5D(i,quotes.length);i++){xbase+=this.layout.candleWidth;var quote=quotes[i];if(!quote)continue;if(quote.projection)break;if(quote.transform)quote=quote.transform;var x=Q9U.T5D(xbase,3*this.layout.candleWidth/8),y=this.pixelFromPrice(quote.Open,panel);if(Q9U.J5D(y,t)){y=t;if(reset){context.moveTo(x,y);continue;}
reset=true;}
else if(Q9U.U7C(y,b)){y=b;if(reset){context.moveTo(x,y);continue;}
reset=true;}
else{reset=false;}
if(!first){first=true;var leftTick=Q9U.S7C(chart.dataSet.length,chart.scroll);if(Q9U.G7C(leftTick,0)){context.moveTo(x,y);}
else if(Q9U.V7C(leftTick,0)){var baseline=chart.dataSet[Q9U.R7C(leftTick,1)];if(baseline.transform)baseline=baseline.transform;var y0=baseline.Close;y0=(panel.yAxis.semiLog?this.pixelFromPrice(y0,panel):(Q9U.D7C((panel.yAxis.high-y0),panel.yAxis.multiplier))+t);y0=Math.min(Math.max(y0,t),b);context.moveTo(panel.left+Q9U.g7C((i-1),this.layout.candleWidth)+this.micropixels,y0);context.lineTo(x,y);}
context.moveTo(x,y);}
else{context.lineTo(x,y);}
x+=Q9U.n7C(this.layout.candleWidth,4);if(Q9U.Z7C(quote.Open,quote.Close)){y=this.pixelFromPrice(quote.Low,panel);if(Q9U.s7C(y,t))y=t;if(Q9U.i7C(y,b))y=b;context.lineTo(x,y);x+=Q9U.a7C(this.layout.candleWidth,4);y=this.pixelFromPrice(quote.High,panel);if(Q9U.I7C(y,t))y=t;if(Q9U.r7C(y,b))y=b;context.lineTo(x,y);}
else{y=this.pixelFromPrice(quote.High,panel);if(Q9U.A7C(y,t))y=t;if(Q9U.y7C(y,b))y=b;context.lineTo(x,y);x+=Q9U.c7C(this.layout.candleWidth,4);y=this.pixelFromPrice(quote.Low,panel);if(Q9U.B7C(y,t))y=t;if(Q9U.l9C(y,b))y=b;context.lineTo(x,y);}
x+=Q9U.Y9C(this.layout.candleWidth,4);y=this.pixelFromPrice(quote.Close,panel);if(Q9U.x9C(y,t))y=t;if(Q9U.K9C(y,b))y=b;context.lineTo(x,y);}
var c=this.canvasStyle("stx_line_chart");if(c.width&&Q9U.C9C(parseInt(c.width,10),25)){context.lineWidth=Math.max(1,STX.stripPX(c.width));}
else{context.lineWidth=1;}
this.canvasColor("stx_line_chart");context.stroke();context.closePath();this.endClip();context.lineWidth=1;}
;STXChart.prototype.updateFloatHRLabel=function(panel){var V6n="row",arr=panel.yaxisLHS.concat(panel.yaxisRHS),cy=this.crossYActualPos?this.crossYActualPos:this.cy;if(this.floatCanvas.isDirty)STX.clearCanvas(this.floatCanvas,this);if(Q9U.W9C(this.controls.crossX.style.display,"none"))return ;if(this.controls.crossY){var crosshairWidth=panel.width;if(Q9U.v9C(this.yaxisLabelStyle,(o4p+L0p+P3p+O5p+u0n+r4p+K8n+o4p+V6n)))crosshairWidth-=7;this.controls.crossY.style.left=panel.left+"px";this.controls.crossY.style.width=crosshairWidth+"px";}
for(var i=0;Q9U.M9C(i,arr.length);i++){var yAxis=arr[i],price=this.valueFromPixel(cy,panel,yAxis);if(isNaN(price))continue;if((panel.min||Q9U.u9C(panel.min,0))&&Q9U.N9C(price,panel.min))continue;if((panel.max||Q9U.b9C(panel.max,0))&&Q9U.z9C(price,panel.max))continue;var labelDecimalPlaces=null;if(Q9U.H9C(yAxis,panel.chart.yAxis)){labelDecimalPlaces=0;if(Q9U.q9C(yAxis.shadow,1000))labelDecimalPlaces=2;if(Q9U.m9C(yAxis.shadow,5))labelDecimalPlaces=4;if(yAxis.decimalPlaces||Q9U.d9C(yAxis.decimalPlaces,0))labelDecimalPlaces=yAxis.decimalPlaces;}
if(yAxis.priceFormatter){price=yAxis.priceFormatter(this,panel,price,yAxis);}
else{price=this.formatYAxisPrice(price,panel,labelDecimalPlaces,yAxis);}
var style=this.canvasStyle("stx-float-price");this.createYAxisLabel(panel,price,cy,style.backgroundColor,style.color,this.floatCanvas.context,yAxis);this.floatCanvas.isDirty=true;}
}
;STXChart.prototype.headsUpHR=function(){var w1n="headsUpHR";if(this.runPrepend(w1n,arguments))return ;var panel=this.currentPanel;if(!panel)return ;var chart=panel.chart;this.updateFloatHRLabel(panel);if(this.controls.floatDate&&!STXChart.hideDates()){var bar=this.barFromPixel(this.cx),prices=chart.xaxis[bar];if(prices&&prices.DT){if(chart.xAxis.formatter){this.controls.floatDate.innerHTML=chart.xAxis.formatter(prices.DT);}
else if(this.internationalizer){var str=this.internationalizer.monthDay.format(prices.DT);if(!STXChart.isDailyInterval(this.layout.interval))str+=b5n+this.internationalizer.hourMinute.format(prices.DT);else{str=this.internationalizer.yearMonthDay.format(prices.DT);}
this.controls.floatDate.innerHTML=str;}
else{var m=prices.DT.getMonth()+Q9U.s0n;if(Q9U.f9C(m,q2p))m=d4p+m;var d=prices.DT.getDate();if(Q9U.j3C(d,q2p))d=d4p+d;var h=prices.DT.getHours();if(Q9U.o3C(h,q2p))h=d4p+h;var mn=prices.DT.getMinutes();if(Q9U.t3C(mn,q2p))mn=d4p+mn;if(STXChart.isDailyInterval(this.layout.interval))this.controls.floatDate.innerHTML=m+R4p+d+R4p+prices.DT.getFullYear();else{this.controls.floatDate.innerHTML=m+R4p+d+b5n+h+G7X+mn;var isSecond=(chart.xAxis.activeTimeUnit&&Q9U.O3C(chart.xAxis.activeTimeUnit,STX.SECOND))||Q9U.L3C(this.layout.timeUnit,Y2p),isMS=(chart.xAxis.activeTimeUnit&&Q9U.k3C(chart.xAxis.activeTimeUnit,STX.MILLISECOND))||Q9U.w3C(this.layout.timeUnit,S2p);if(isSecond||isMS){var sec=prices.DT.getSeconds();if(Q9U.e3C(sec,q2p))sec=d4p+sec;this.controls.floatDate.innerHTML+=(G7X+sec);if(isMS){var mil=prices.DT.getMilliseconds();if(Q9U.E3C(mil,q2p))mil=d4p+mil;if(Q9U.P3C(mil,a5p))mil=d4p+mil;this.controls.floatDate.innerHTML+=(G7X+mil);}
}
}
}
}
else if(prices&&prices.index){this.controls.floatDate.innerHTML=prices.index;}
else{this.controls.floatDate.innerHTML=w3p;}
}
this.runAppend(w1n,arguments);}
;STXChart.prototype.setCrosshairColors=function(){return ;}
;STXChart.prototype.magnetize=function(){var W8n="ose",L9p="Cl",f4p="e_ca",L1n="um",v0n="vol";this.magnetizedPrice=null;if(this.runPrepend("magnetize",arguments))return ;if((Q9U.p3C(this.currentVectorParameters.vectorType,"annotation")||Q9U.Q3C(this.currentVectorParameters.vectorType,"callout"))&&STXChart.drawingLine)return ;if(Q9U.F3C(this.currentVectorParameters.vectorType,"projection"))return ;if(Q9U.h3C(this.currentVectorParameters.vectorType,"freeform"))return ;var panel=this.currentPanel;if(Q9U.X3C(panel.name,panel.chart.name)){var chart=panel.chart,tick=this.tickFromPixel(Q9U.T3C(STXChart.crosshairX,this.left),chart);if(Q9U.J3C(tick,chart.dataSet.length))return ;var prices=chart.dataSet[tick];if(!prices)return ;var price=this.valueFromPixel(this.cy,panel);this.magnetizedPrice=prices.Close;if(Q9U.U4C(this.layout.chartType,(I1n+c1n+o4p))||Q9U.S4C(this.layout.chartType,(e5n+c1n+S0p+S5n+W0p+n5n))||Q9U.G4C(this.layout.chartType,"colored_bar")||Q9U.V4C(this.layout.chartType,"hollow_candle")||Q9U.R4C(this.layout.chartType,(v0n+L1n+f4p+S0p+x2p+n5n))){var fields=["Open","High","Low",(L9p+W8n)],closest=1000000000;for(var i=0;Q9U.D4C(i,fields.length);i++){var fp=prices[fields[i]];if(Q9U.g4C(Math.abs(price-fp),closest)){closest=Math.abs(Q9U.n4C(price,fp));this.magnetizedPrice=fp;}
}
}
var x=this.pixelFromTick(tick,chart),y=this.pixelFromPrice(this.magnetizedPrice,this.currentPanel),ctx=this.chart.tempCanvas.context;ctx.beginPath();ctx.lineWidth=1;var radius=Q9U.Z4C(Math.max(this.layout.candleWidth,8),2);ctx.arc(x,y,radius,0,Q9U.s4C(2,Math.PI),false);ctx.fillStyle="#FFFFFF";ctx.strokeStyle="#000000";ctx.fill();ctx.stroke();ctx.closePath();}
this.runAppend("magnetize",arguments);}
;STXChart.prototype.positionCrosshairsAtPointer=function(){if(!this.currentPanel)return ;var chart=this.currentPanel.chart,rect=this.container.getBoundingClientRect();this.top=rect.top;this.left=rect.left;this.right=this.left+this.width;this.bottom=this.top+this.height;var tick=this.tickFromPixel(this.backOutX(STXChart.crosshairX),chart);this.cy=this.backOutY(STXChart.crosshairY);this.cx=this.backOutX(STXChart.crosshairX);this.controls.crossX.style.left=(Q9U.i4C(this.pixelFromTick(tick,chart),0.5))+"px";this.controls.crossY.style.top=this.backOutY(STXChart.crosshairY)+"px";this.updateChartAccessories();}
;STXChart.prototype.doDisplayCrosshairs=function(){var H8n="doDisplayCrosshairs";if(this.runPrepend(H8n,arguments))return ;if(this.displayInitialized){if(!this.layout.crosshair&&(Q9U.a4C(this.currentVectorParameters.vectorType,w3p)||!this.currentVectorParameters.vectorType)){this.undisplayCrosshairs();}
else if(STX.Drawing[this.currentVectorParameters.vectorType]&&(new STX.Drawing[this.currentVectorParameters.vectorType]()).dragToDraw){this.undisplayCrosshairs();}
else{if(Q9U.I4C(this.controls.crossX.style.display,w3p)){this.controls.crossX.style.display=w3p;this.controls.crossY.style.display=w3p;if(this.preferences.magnet&&this.currentVectorParameters.vectorType){STX.unappendClassName(this.container,H7p);}
else{STX.appendClassName(this.container,H7p);}
}
if(this.controls.floatDate&&!STXChart.hideDates()){this.controls.floatDate.style.display=Z2n;}
}
}
this.runAppend(H8n,arguments);}
;STXChart.prototype.undisplayCrosshairs=function(){var B8n="undisplayCrosshairs";if(this.runPrepend(B8n,arguments))return ;if(this.controls.crossX){if(Q9U.r4C(this.controls.crossX.style.display,s5p)){this.controls.crossX.style.display=s5p;this.controls.crossY.style.display=s5p;}
}
if(this.displayInitialized&&this.controls.floatDate){this.controls.floatDate.style.display=s5p;}
STX.unappendClassName(this.container,H7p);if(this.floatCanvas&&this.floatCanvas.isDirty)STX.clearCanvas(this.floatCanvas,this);this.runAppend(B8n,arguments);}
;STXChart.prototype.modalBegin=function(){var i7p="modal";this.openDialog=i7p;this.undisplayCrosshairs();}
;STXChart.prototype.modalEnd=function(){this.cancelTouchSingleClick=L8p;this.openDialog=w3p;this.doDisplayCrosshairs();}
;STXChart.prototype.updateChartAccessories=function(){var x6n="updateChartAccessories";if(this.runPrepend(x6n,arguments))return ;this.accessoryTimer=G8p;this.lastAccessoryUpdate=new Date().getTime();var floatDate=this.controls.floatDate;if(floatDate){var panel=this.currentPanel;if(!panel)panel=this.chart.panel;if(panel){var chart=panel.chart,tick=this.tickFromPixel(this.backOutX(STXChart.crosshairX),chart);floatDate.style.left=(Q9U.A4C(this.pixelFromTick(tick,chart),(floatDate.offsetWidth/Q9U.M0n),w7p))+d2p;floatDate.style.bottom=(Q9U.T4C(this.chart.canvasHeight,chart.panel.bottom))+d2p;}
}
this.headsUpHR();this.runAppend(x6n,arguments);}
;STXChart.prototype.mousemove=function(e$){var e=e$?e$:event;STXChart.crosshairX=e.clientX;STXChart.crosshairY=e.clientY;if(this.runPrepend(t7p,arguments))return ;if(!this.displayInitialized)return ;if(Q9U.J4C(this.openDialog,w3p))return ;this.mousemoveinner(e.clientX,e.clientY);this.runAppend(t7p,arguments);}
;STXChart.prototype.setResizeTimer=function(ms){this.resizeDetectMS=ms;function closure(self){return function(){if(!self.chart.canvas)return ;if(!STX.isAndroid){if(Q9U.U0C(self.chart.canvas.height,Math.floor(self.devicePixelRatio*self.chart.container.clientHeight))||Q9U.S0C(self.chart.canvas.width,Math.floor(self.devicePixelRatio*self.chart.container.clientWidth))){self.resizeChart();return ;}
}
}
;}
if(ms){if(this.resizeTimeout)window.clearInterval(this.resizeTimeout);this.resizeTimeout=window.setInterval(closure(this),ms);}
else{if(this.resizeTimeout)window.clearInterval(this.resizeTimeout);this.resizeTimeout=null;}
}
;STXChart.prototype.whichYAxis=function(panel,x){var t9p="fi";if(typeof x===(P3p+O5p+n5n+t9p+A7p))x=this.cx;var arr=panel.yaxisLHS.concat(panel.yaxisRHS);for(var i=0;Q9U.G0C(i,arr.length);i++){var yAxis=arr[i];if(Q9U.V0C(yAxis.left,x)&&Q9U.R0C(yAxis.left+yAxis.width,x))return yAxis;}
return this.chart.panel.yAxis;}
;STXChart.prototype.mousemoveinner=function(epX,epY){if(!this.chart.canvas)return ;if(!STX.isAndroid&&!STX.isIOS7or8){if(Q9U.D0C(this.chart.canvas.height,Math.floor(this.devicePixelRatio*this.chart.container.clientHeight))||Q9U.g0C(this.chart.canvas.width,Math.floor(this.devicePixelRatio*this.chart.container.clientWidth))){this.resizeChart();return ;}
}
var value;if(this.runPrepend("mousemoveinner",arguments))return ;var rect=this.container.getBoundingClientRect();this.top=rect.top;this.left=rect.left;this.right=this.left+this.width;this.bottom=this.top+this.height;STXChart.crosshairX=epX;STXChart.crosshairY=epY;var cy=this.cy=this.crossYActualPos=this.backOutY(STXChart.crosshairY),cx=this.cx=this.backOutX(STXChart.crosshairX);this.currentPanel=this.whichPanel(cy);if(!this.currentPanel)this.currentPanel=this.chart.panel;if(!this.currentPanel)return ;var chart=this.currentPanel.chart;if(chart.dataSet){this.crosshairTick=this.tickFromPixel(cx,chart);value=this.valueFromPixel(cy,this.currentPanel);var chField=Q9U.n0C(this.currentPanel.name,"chart")?this.preferences.horizontalCrosshairField:this.currentPanel.horizontalCrosshairField;if(chField&&Q9U.Z0C(this.crosshairTick,chart.dataSet.length)&&this.crosshairTick>-1){value=chart.dataSet[this.crosshairTick][chField];this.crossYActualPos=this.pixelFromPriceTransform(value,this.currentPanel);}
this.crosshairValue=this.adjustIfNecessary(this.currentPanel,this.crosshairTick,value);}
if(Q9U.s0C(STXChart.crosshairX,this.left)&&Q9U.i0C(STXChart.crosshairX,this.right)&&Q9U.a0C(STXChart.crosshairY,this.top)&&Q9U.I0C(STXChart.crosshairY,this.bottom)){STXChart.insideChart=true;}
else{STXChart.insideChart=false;}
this.overXAxis=Q9U.r0C(STXChart.crosshairY,this.top+this.chart.panel.yAxis.bottom)&&Q9U.A0C(STXChart.crosshairY,this.top+this.chart.panel.bottom)&&STXChart.insideChart;this.overYAxis=(Q9U.y0C(this.cx,this.currentPanel.right)||Q9U.c0C(this.cx,this.currentPanel.left))&&STXChart.insideChart;if(this.overXAxis||this.overYAxis||(!STXChart.insideChart&&!this.grabbingScreen)){this.undisplayCrosshairs();if(!this.overXAxis&&!this.overYAxis)return ;}
if(!this.displayCrosshairs&&!STXChart.resizingPanel){this.undisplayCrosshairs();return ;}
var bHandle=this.controls.baselineHandle;if(this.repositioningBaseline){panel=this.panels[this.chart.panel.name];this.chart.baseline.userLevel=this.adjustIfNecessary(panel,this.crosshairTick,this.valueFromPixelUntransform(this.backOutY(STXChart.crosshairY),panel));if(Q9U.B0C(Date.now()-this.repositioningBaseline.lastDraw,100)){this.draw();this.repositioningBaseline.lastDraw=Date.now();}
return ;}
if(this.grabbingScreen&&!STXChart.resizingPanel){if(this.anyHighlighted){STX.clearCanvas(this.chart.tempCanvas,this);this.anyHighlighted=false;var n;for(n in this.overlays){this.overlays[n].highlight=false;}
for(n in chart.series){chart.series[n].highlight=false;}
this.displaySticky();}
if(this.preferences.magnet&&this.currentVectorParameters.vectorType){STX.clearCanvas(this.chart.tempCanvas,this);}
if(this.grabStartX==-1){this.grabStartX=STXChart.crosshairX;this.grabStartScrollX=chart.scroll;}
if(this.grabStartY==-1){this.grabStartY=STXChart.crosshairY;this.grabStartScrollY=chart.panel.yAxis.scroll;}
var dx=Q9U.l8C(STXChart.crosshairX,this.grabStartX),dy=Q9U.Y8C(STXChart.crosshairY,this.grabStartY);if(Q9U.x8C(dx,0)&&Q9U.K8C(dy,0))return ;if(Q9U.C8C(Math.abs(dx)+Math.abs(dy),5))this.grabOverrideClick=true;var push;if(this.allowZoom&&Q9U.W8C(this.grabMode,"pan")&&(Q9U.v8C(this.grabMode.indexOf("zoom"),0)||this.ctrl||this.overXAxis||this.overYAxis)){if(Q9U.M8C(this.grabMode,"")){if(this.overXAxis)this.grabMode="zoom-x";else if(this.overYAxis)this.grabMode="zoom-y";}
if(Q9U.u8C(this.grabMode,"zoom-x"))dy=0;else if(Q9U.N8C(this.grabMode,"zoom-y"))dx=0;push=Q9U.b8C(dx,25);var centerMe=true;if(Q9U.z8C(chart.scroll,chart.maxTicks))centerMe=false;var newCandleWidth=this.grabStartCandleWidth+push;if(Q9U.H8C(newCandleWidth,this.minimumCandleWidth))newCandleWidth=this.minimumCandleWidth;var pct=Q9U.q8C((this.layout.candleWidth-newCandleWidth),this.layout.candleWidth);if(Q9U.m8C(pct,0.1)){newCandleWidth=Q9U.d8C(this.layout.candleWidth,0.9);}
else if(pct<-0.1){newCandleWidth=Q9U.f8C(this.layout.candleWidth,1.1);}
if(STX.ipad){if(Q9U.j6C(Math.round((this.chart.width/this.layout.candleWidth)-0.499)-1,STXChart.ipadMaxTicks)&&Q9U.o6C(Math.round((this.chart.width/newCandleWidth)-0.499)-1,STXChart.ipadMaxTicks))return ;}
var newMaxTicks;if(this.pinchingCenter){var x=this.backOutX(this.pinchingCenter),tick1=this.tickFromPixel(x,chart);this.setCandleWidth(newCandleWidth,chart);var newTick=this.tickFromPixel(x,chart);chart.scroll+=Math.floor((Q9U.t6C(newTick,tick1)));}
else if(centerMe){newMaxTicks=Math.round(Q9U.O6C((this.chart.width/newCandleWidth),0.499));if(Q9U.L6C(newMaxTicks,chart.maxTicks)){this.setCandleWidth(newCandleWidth,chart);chart.scroll+=Math.round(Q9U.k6C((newMaxTicks-chart.maxTicks),2));}
}
else{newMaxTicks=Math.round(Q9U.w6C((this.chart.width/newCandleWidth),0.499));if(Q9U.e6C(newMaxTicks,Math.round((this.chart.width/this.layout.candleWidth)-0.499))){this.setCandleWidth(newCandleWidth,chart);var wsInTicks=Math.round(Q9U.E6C(this.preferences.whitespace,this.layout.candleWidth));chart.scroll=Q9U.P6C(chart.maxTicks,wsInTicks);}
}
this.layout.span=null;var yAxis=this.whichYAxis(this.grabbingPanel,this.cx);if(this.overYAxis){yAxis.zoom=Math.round(this.grabStartZoom+dy);if(Q9U.p6C(this.grabStartZoom,yAxis.height)){if(Q9U.Q6C(yAxis.zoom,yAxis.height))yAxis.zoom=Q9U.F6C(yAxis.height,1);}
else{if(Q9U.h6C(yAxis.zoom,yAxis.height))yAxis.zoom=yAxis.height+1;}
}
}
else{if(this.allowScroll){if(Q9U.X6C(Math.abs(dy),this.yTolerance)){if(!this.yToleranceBroken){dy=0;if(Q9U.T6C(dx,0))return ;}
}
else{this.yToleranceBroken=true;}
this.grabMode="pan";push=Math.round(Q9U.J6C(dx,this.layout.candleWidth));this.microscroll=Q9U.U2C(push,(dx/this.layout.candleWidth));this.micropixels=this.layout.candleWidth*this.microscroll*-1;if(this.shift)push*=5;chart.scroll=this.grabStartScrollX+push;if(Q9U.S2C(chart.scroll,1))chart.scroll=1;if(Q9U.G2C(chart.scroll,chart.maxTicks)){this.preferences.whitespace=this.initialWhitespace;}
else{this.preferences.whitespace=Q9U.V2C((chart.maxTicks-chart.scroll),this.layout.candleWidth);}
if(Q9U.R2C(this.currentPanel.name,chart.name)){this.chart.panel.yAxis.scroll=this.grabStartScrollY+dy;}
}
this.dispatch("move",{stx:this,panel:this.currentPanel,x:this.cx,y:this.cy,grab:this.grabbingScreen}
);}
var clsrFunc=function(stx){return function(){stx.draw();}
;}
;if(STXChart.useAnimation){window.requestAnimationFrame(clsrFunc(this));}
else{this.draw();}
if(this.activeDrawing){STX.clearCanvas(this.chart.tempCanvas,this);this.activeDrawing.render(this.chart.tempCanvas.context);this.activeDrawing.measure();}
this.undisplayCrosshairs();return ;}
else{this.grabMode="";}
this.grabbingPanel=this.currentPanel;if(this.overXAxis||this.overYAxis)return ;this.controls.crossX.style.left=(Q9U.D2C(this.pixelFromTick(this.crosshairTick,chart),0.5))+"px";this.controls.crossY.style.top=this.crossYActualPos+"px";this.setCrosshairColors();if(STXChart.insideChart&&!STXChart.resizingPanel){if(!STX.Drawing[this.currentVectorParameters.vectorType]||!(new STX.Drawing[this.currentVectorParameters.vectorType]()).dragToDraw){this.doDisplayCrosshairs();}
if(Q9U.g2C(this.accessoryTimer,null))clearTimeout(this.accessoryTimer);if(STXChart.drawingLine||!STX.touchDevice){this.updateChartAccessories();}
else{if(Q9U.n2C(new Date().getTime()-this.lastAccessoryUpdate,100))this.updateChartAccessories();this.accessoryTimer=setTimeout((function(stx){return function(){stx.updateChartAccessories();}
;}
)(this),10);}
}
else{this.undisplayCrosshairs();}
var panel;if(this.repositioningDrawing){panel=this.panels[this.repositioningDrawing.panelName];value=this.adjustIfNecessary(panel,this.crosshairTick,this.valueFromPixelUntransform(this.backOutY(STXChart.crosshairY),panel));if(this.preferences.magnet&&this.magnetizedPrice&&Q9U.Z2C(panel.name,panel.chart.name)){value=this.adjustIfNecessary(panel,this.crosshairTick,this.magnetizedPrice);}
STX.clearCanvas(this.chart.tempCanvas,this);this.repositioningDrawing.reposition(this.chart.tempCanvas.context,this.repositioningDrawing.repositioner,this.crosshairTick,value);if(this.repositioningDrawing.measure)this.repositioningDrawing.measure();}
else if(STXChart.drawingLine){if(this.activeDrawing){panel=this.panels[this.activeDrawing.panelName];value=this.adjustIfNecessary(panel,this.crosshairTick,this.valueFromPixelUntransform(this.backOutY(STXChart.crosshairY),panel));if(this.preferences.magnet&&this.magnetizedPrice&&Q9U.s2C(panel.name,panel.chart.name)){value=this.adjustIfNecessary(panel,this.crosshairTick,this.magnetizedPrice);}
STX.clearCanvas(this.chart.tempCanvas,this);this.activeDrawing.move(this.chart.tempCanvas.context,this.crosshairTick,value);if(this.activeDrawing.measure)this.activeDrawing.measure();}
}
else if(STXChart.resizingPanel){this.resizePanels();this.drawTemporaryPanel();}
else if(STXChart.insideChart){this.findHighlights();}
if(STXChart.insideChart){this.dispatch((a0p+L0p+T7X+n5n),{stx:this,panel:this.currentPanel,x:this.cx,y:this.cy,grab:this.grabbingScreen}
);this.findHighlights();}
if(this.preferences.magnet&&this.currentVectorParameters.vectorType){if(!STXChart.drawingLine&&!this.anyHighlighted)STX.clearCanvas(this.chart.tempCanvas);this.magnetize();}
this.runAppend("mousemoveinner",arguments);}
;STXChart.prototype.findHighlights=function(isTap,clearOnly){var U0p="tep",radius=10;if(isTap)radius=30;var cy=this.cy,cx=this.cx;if(!this.currentPanel)return ;var chart=this.currentPanel.chart;this.anyHighlighted=false;if(this.preferences.magnet&&!this.activeDrawing){STX.clearCanvas(this.chart.tempCanvas,this);}
var somethingChanged=false,drawingToMeasure=null,stickyArgs=["","",true,null,"drawing"],box={x0:this.tickFromPixel(Q9U.i2C(cx,radius),chart),x1:this.tickFromPixel(cx+radius,chart),y0:this.valueFromPixelUntransform(Q9U.a2C(cy,radius),this.currentPanel),y1:this.valueFromPixelUntransform(cy+radius,this.currentPanel)}
;for(var i=0;Q9U.I2C(i,this.drawingObjects.length);i++){var drawing=this.drawingObjects[i];if(drawing.permanent)continue;var prevHighlight=drawing.highlighted,highlightMe=(Q9U.r2C(drawing.panelName,this.currentPanel.name));drawing.repositioner=drawing.intersected(this.crosshairTick,this.crosshairValue,box);highlightMe=highlightMe&&drawing.repositioner;if(!clearOnly&&highlightMe){if(prevHighlight){drawingToMeasure=drawing;}
else if(Q9U.A2C(prevHighlight,drawing.highlight(true))){if(!drawingToMeasure)drawingToMeasure=drawing;somethingChanged=true;}
this.anyHighlighted=true;}
else{if(Q9U.y2C(prevHighlight,drawing.highlight(false))){somethingChanged=true;}
}
}
var first=false,n,o,series;for(n in this.overlays){o=this.overlays[n];o.prev=o.highlight;o.highlight=false;}
for(n in chart.seriesRenderers){var r=chart.seriesRenderers[n];for(var j=0;Q9U.c2C(j,r.seriesParams.length);j++){series=r.seriesParams[j];series.prev=series.highlight;series.highlight=false;}
}
if(!clearOnly){var bar=this.barFromPixel(cx);if(Q9U.B2C(bar,chart.dataSegment.length)){var y;for(n in this.overlays){o=this.overlays[n];if(Q9U.l1C(o.panel,this.currentPanel.name))continue;if(o.libraryEntry.isHighlighted&&o.libraryEntry.isHighlighted(this,cx,cy)){o.highlight=true;this.anyHighlighted=true;continue;}
var quote=chart.dataSegment[bar];if(!quote)continue;for(var out in this.overlays[n].outputMap){var val=quote[out];y=0;if(Q9U.Y1C(this.currentPanel.name,chart.name)){y=this.pixelFromPriceTransform(val,this.currentPanel);}
else{y=this.pixelFromPrice(val,this.currentPanel);}
if(Q9U.x1C(cy-radius,y)&&Q9U.K1C(cy+radius,y)){o.highlight=true;this.anyHighlighted=true;break;}
}
if(o.highlight)break;}
for(n in chart.seriesRenderers){var renderer=chart.seriesRenderers[n];if(!renderer.params.highlightable)continue;for(var m=0;Q9U.C1C(m,renderer.seriesParams.length);m++){series=renderer.seriesParams[m];y=renderer.caches[series.field][bar];if(!y&&Q9U.W1C(y,0))continue;if(Q9U.v1C(cy-radius,y)&&Q9U.M1C(cy+radius,y)){series.highlight=true;this.anyHighlighted=true;}
else if((Q9U.u1C(renderer.params.subtype,"step")||Q9U.N1C(series.type,(g4p+U0p)))&&Q9U.b1C(bar,0)){var py=renderer.caches[series.field][Q9U.z1C(bar,1)];if((Q9U.H1C(cy,y)&&Q9U.q1C(cy,py))||(Q9U.m1C(cy,y)&&Q9U.d1C(cy,py))){series.highlight=true;this.anyHighlighted=true;}
}
}
}
}
}
for(n in this.overlays){o=this.overlays[n];if(o.highlight){this.anyHighlighted=true;stickyArgs=[o.inputs.display?o.inputs.display:o.name,null,null,o.permanent,"study"];drawingToMeasure=null;}
if(Q9U.f1C(o.prev,o.highlight))somethingChanged=true;}
for(n in chart.seriesRenderers){var r2=chart.seriesRenderers[n];if(!r2.params.highlightable)continue;for(var m2=0;Q9U.j5C(m2,r2.seriesParams.length);m2++){series=r2.seriesParams[m2];if(series.highlight){this.anyHighlighted=true;stickyArgs=[series.display,series.color,false,series.permanent,"series"];drawingToMeasure=null;}
if(Q9U.o5C(series.prev,series.highlight))somethingChanged=true;}
}
if(somethingChanged){this.draw();this.displaySticky.apply(this,stickyArgs);this.clearMeasure();if(drawingToMeasure)drawingToMeasure.measure();}
if(!this.anyHighlighted){this.setMeasure();}
}
;STXChart.prototype.positionSticky=function(m){var top=Math.max(Q9U.t5C(this.cy,m.offsetHeight,p1p),Q9U.P0n),right=Math.min(Q9U.K5C(this.chart.canvasWidth,(this.cx-q1p)),Q9U.C5C(this.chart.canvasWidth,m.offsetWidth));m.style.top=top+d2p;m.style.right=right+d2p;}
;STXChart.prototype.displaySticky=function(message,backgroundColor,forceShow,noDelete,type){var U4p="lick",Z0n="ght",m=this.controls.mSticky;if(!m)return ;var mi=m.children[Q9U.P0n];if(!mi)return ;var overlayTrashCan=m.children[Q9U.s0n].children[Q9U.P0n],mouseDeleteInstructions=m.children[Q9U.s0n].children[Q9U.s0n];if(!forceShow&&!message){mi.innerHTML=w3p;m.style.display=s5p;if(STX.touchDevice&&overlayTrashCan){overlayTrashCan.style.display=s5p;}
else if(!STX.touchDevice&&mouseDeleteInstructions){mouseDeleteInstructions.style.display=s5p;}
}
else{if(!message)message=w3p;if(forceShow&&!message){mi.style.backgroundColor=w3p;mi.style.color=w3p;mi.style.display=s5p;}
else if(backgroundColor){mi.style.backgroundColor=backgroundColor;mi.style.color=STX.chooseForegroundColor(backgroundColor);mi.style.display=v5n;}
else{mi.style.backgroundColor=w3p;mi.style.color=w3p;mi.style.display=v5n;}
mi.innerHTML=message;if(type)m.children[Q9U.s0n].className=(o4p+r8p+Z0n+e5n+U4p+G7p)+type;m.style.display=v5n;this.positionSticky(m);if(noDelete){overlayTrashCan.style.display=s5p;mouseDeleteInstructions.style.display=s5p;}
else if(STX.touchDevice&&overlayTrashCan){overlayTrashCan.style.display=v5n;mouseDeleteInstructions.style.display=s5p;}
else if(!STX.touchDevice&&mouseDeleteInstructions){mouseDeleteInstructions.style.display=Z2n;}
}
}
;STXChart.prototype.setMeasure=function(price1,price2,tick1,tick2,hover){var a4p="measureLit",r2n="Bars",k8p="eU",L6n="as",q8n="me",b9p="setMeasure";if(this.runPrepend(b9p,arguments))return ;var m=$$(s1p),message=w3p;if(!price1){if(m&&Q9U.W5C(m.className,(q8n+L6n+P3p+o4p+k8p+S0p+p4p+E3p)))m.className=k7p;if(!this.anyHighlighted&&Q9U.v5C(this.currentVectorParameters.vectorType,w3p))this.clearMeasure();}
else{var distance=Q9U.M5C(Math.round(Math.abs(price1-price2)*this.chart.roundit),this.chart.roundit);if(this.internationalizer){message+=this.internationalizer.numbers.format(distance);}
else{message+=distance;}
var pct=Q9U.u5C((price2-price1),price1);if(Q9U.N5C(Math.abs(pct),u7p)){pct=Math.round(Q9U.b5C(pct,a5p));}
else if(Q9U.z5C(Math.abs(pct),T0n)){pct=Q9U.H5C(Math.round(pct*g5p),q2p);}
else{pct=Q9U.q5C(Math.round(pct*R5p),a5p);}
if(this.internationalizer){pct=this.internationalizer.percent.format(Q9U.m5C(pct,a5p));}
else{pct=pct+W8p;}
message+=Y1n+pct+L6p;var ticks=Math.abs(Q9U.d5C(tick2,tick1));ticks=Math.round(ticks)+Q9U.s0n;var barsStr=this.translateIf(r2n);message+=b5n+ticks+b5n+barsStr;if(m){if(Q9U.f5C(m.className,a4p))m.className=a4p;m.innerHTML=message;}
}
if(this.activeDrawing)return ;m=this.controls.mSticky;if(m){if(hover){m.style.display=(p7X+c5n+n5n+R4p+I1n+W0p+L0p+e5n+O8p);m.children[Q9U.P0n].style.display=v5n;if(price1){m.children[Q9U.P0n].innerHTML=message;}
this.positionSticky(m);}
else{m.style.display=s5p;m.children[Q9U.P0n].innerHTML=w3p;}
}
this.runAppend(b9p,arguments);}
;STXChart.prototype.clearMeasure=function(){var V3p=6544243,g8n="ie",m2n="so",o7p="es",r5p="eCh",d8n="at",j2n=((0x136,0x20E)>=(8.9E1,0x21A)?(0xDC,27.):5.270E2>(0x168,123.)?(42.5E1,5551924):(84,0xE6)),A0p=95751008,I3p=1059387259,m=$$(s1p);var z4n=-I3p,I4n=A0p,Q4n=Q9U.M0n;for(var a4n=Q9U.s0n;Q9U.f3n.B3n(a4n.toString(),a4n.toString().length,j2n)!==z4n;a4n++){this.deleteSeries(field,chart);this.runAppend((C0n+d8n+r5p+e8n+K8n+e5n+e5n+o7p+m2n+o4p+g8n+g4p),arguments);labelDate.setSeconds(Q9U.P0n);this.setMarkerTick(marker);Q4n+=Q9U.M0n;}
if(Q9U.f3n.B3n(Q4n.toString(),Q4n.toString().length,V3p)!==I4n){displayTheResults();this.getDefaultColor();return t0h==x0h;}
if(m){if(Q9U.j7h(m.className,k7p))m.className=k7p;m.innerHTML=w3p;}
}
;STXChart.prototype.drawTemporaryPanel=function(){var O1p="stx_panel_drag",borderEdge=Math.round(Q9U.o7h(STXChart.resizingPanel.right,Q9U.n0n))+w7p;STX.clearCanvas(this.chart.tempCanvas,this);var y=Q9U.t7h(STXChart.crosshairY,this.top);this.plotLine(STXChart.resizingPanel.left,borderEdge,y,y,this.canvasStyle(O1p),i8n,this.chart.tempCanvas.context,U5p,{}
);STXChart.resizingPanel.handle.style.top=(Q9U.O7h(y,STXChart.resizingPanel.handle.offsetHeight/Q9U.M0n))+d2p;}
;STXChart.prototype.setTrashCan=function(){if(STX.touchDevice){var m=this.controls.mSticky;if(m){m.style.display=(r8p+S0p+p4p+S0p+n5n+R4p+I1n+W0p+L0p+e5n+O8p);m.children[Q9U.P0n].style.display=s5p;m.children[Q9U.s0n].style.display=v5n;if(m.children[Q9U.M0n])m.children[Q9U.M0n].style.display=s5p;m.style.top=(Q9U.L7h(this.backOutY(STXChart.crosshairY),p1p))+d2p;m.style.right=Q9U.k7h(this.chart.canvasWidth,(this.backOutX(STXChart.crosshairX)-q1p),d2p);}
}
}
;STXChart.prototype.pixelFromBar=function(bar,chart){if(!chart)chart=this.chart;var x=Q9U.P0n;if(this.chart.dataSegment&&this.chart.dataSegment[bar]&&this.chart.dataSegment[bar].leftOffset){x=this.chart.dataSegment[bar].leftOffset;}
else{x=Q9U.v7h((bar+w7p),this.layout.candleWidth);}
x=chart.panel.left+Math.floor(x+this.micropixels)-Q9U.s0n;return x;}
;STXChart.prototype.barFromPixel=function(x,chart){if(!chart)chart=this.chart;if(Q9U.M7h(this.layout.chartType,"volume_candle")){var pixel=Q9U.u7h(x,chart.panel.left,this.micropixels),mult=2,bar=Math.round(Q9U.i7h(this.chart.dataSegment.length,mult)),rightofLastTick=this.chart.dataSegment[Q9U.a7h(this.chart.dataSegment.length,1)].leftOffset+Q9U.I7h(this.chart.dataSegment[this.chart.dataSegment.length-1].candleWidth,2);if(Q9U.r7h(pixel,rightofLastTick)){return this.chart.dataSegment.length+Math.floor(Q9U.A7h((x-rightofLastTick-chart.panel.left-this.micropixels),this.layout.candleWidth));}
else{for(var i=1;Q9U.y7h(i,this.chart.dataSegment.length);i++){mult*=2;if(!this.chart.dataSegment[bar])break;var left=Q9U.c7h(this.chart.dataSegment[bar].leftOffset,this.chart.dataSegment[bar].candleWidth/2),right=this.chart.dataSegment[bar].leftOffset+Q9U.B7h(this.chart.dataSegment[bar].candleWidth,2);if(Q9U.l9h(bar,0)||(Q9U.Y9h(pixel,left)&&Q9U.x9h(pixel,right)))break;else if(Q9U.K9h(pixel,left))bar-=Math.max(1,Math.round(Q9U.C9h(this.chart.dataSegment.length,mult)));else bar+=Math.max(1,Math.round(Q9U.W9h(this.chart.dataSegment.length,mult)));bar=Math.max(0,Math.min(Q9U.v9h(this.chart.dataSegment.length,1),bar));}
if(!this.chart.dataSegment[bar]){for(i=0;Q9U.M9h(i,this.chart.dataSegment.length);i++){if(!this.chart.dataSegment[i])continue;if(Q9U.u9h(pixel,this.chart.dataSegment[i].leftOffset-this.chart.dataSegment[i].candleWidth/2))return Math.max(0,Q9U.N9h(i,1));else if(Q9U.b9h(pixel,this.chart.dataSegment[i].leftOffset+this.chart.dataSegment[i].candleWidth/2))return i;else if(Q9U.z9h(pixel,this.chart.dataSegment[i].leftOffset+this.chart.dataSegment[i].candleWidth/2))return i+1;}
}
}
return bar;}
else{return Math.floor(Q9U.H9h((x-chart.panel.left-this.micropixels),this.layout.candleWidth));}
}
;STXChart.prototype.tickFromPixel=function(x,chart){if(!chart)chart=this.chart;var tick=Q9U.q9h(chart.dataSet.length,chart.scroll,1);if(Q9U.y9h(this.layout.chartType,"volume_candle")){tick+=this.barFromPixel(x,chart);}
else{tick+=Math.floor(Q9U.c9h((x-chart.panel.left-this.micropixels),this.layout.candleWidth));}
return tick;}
;STXChart.prototype.pixelFromTick=function(tick,chart){if(!chart)chart=this.chart;var bar=Q9U.B9h(tick,chart.dataSet.length,chart.scroll,1);if(this.chart.dataSegment&&this.chart.dataSegment[bar]&&this.chart.dataSegment[bar].leftOffset){return chart.panel.left+Math.floor(this.chart.dataSegment[bar].leftOffset+this.micropixels)-1;}
else{var rightOffset=0,dsTicks=0;if(this.chart.dataSegment&&this.chart.dataSegment[Q9U.o3h(this.chart.dataSegment.length,1)]&&this.chart.dataSegment[Q9U.t3h(this.chart.dataSegment.length,1)].leftOffset){if(Q9U.O3h(this.chart.dataSegment.length,tick-chart.dataSet.length+chart.scroll)){rightOffset=Q9U.L3h(this.chart.dataSegment[this.chart.dataSegment.length-1].leftOffset,this.chart.dataSegment[this.chart.dataSegment.length-1].candleWidth/2);dsTicks=this.chart.dataSegment.length;}
}
return rightOffset+chart.panel.left+Math.floor(Q9U.k3h((tick-dsTicks-chart.dataSet.length+chart.scroll-0.5),this.layout.candleWidth)+this.micropixels)-1;}
}
;STXChart.prototype.pixelFromDate=function(date,chart){return this.pixelFromTick(this.tickFromDate(date,chart),chart);}
;STXChart.prototype.priceFromPixel=function(y,panel,yAxis){if(!panel)panel=this.chart.panel;var chart=panel.chart,yax=yAxis?yAxis:panel.yAxis;y=Q9U.w3h(yax.bottom,y);var price=yax.low+(Q9U.e3h(y,yax.multiplier));if(yax.semiLog){var logPrice=yax.logLow+(Q9U.E3h(y,yax.logShadow,yax.height));price=Math.pow(10,logPrice);}
return price;}
;STXChart.prototype.valueFromPixel=function(y,panel,yAxis){if(!panel)panel=this.whichPanel(y);var p=this.priceFromPixel(y,panel,yAxis);return p;}
;STXChart.prototype.valueFromPixelUntransform=function(y,panel,yAxis){if(!panel)panel=this.whichPanel(y);if(!panel){if(Q9U.N3h(y,Q9U.P0n)){panel=this.panels[STX.first(this.panels)];}
else{panel=this.panels[STX.last(this.panels)];}
}
var p=this.priceFromPixel(y,panel,yAxis);if(panel.chart.untransformFunc&&Q9U.b3h(panel.name,panel.chart.name)){p=panel.chart.untransformFunc(this,panel.chart,p);}
return p;}
;STXChart.prototype.pixelFromPriceTransform=function(price,panel,yAxis){if(panel.chart.transformFunc)price=panel.chart.transformFunc(this,panel.chart,price,yAxis);return this.pixelFromPrice(price,panel,yAxis);}
;STXChart.prototype.pixelFromPrice=function(price,panel,yAxis){if(!panel)panel=this.chart.panel;var yax=yAxis?yAxis:panel.yAxis,y=Q9U.z3h((yax.high-price),yax.multiplier);if(yax.semiLog){var p=Math.max(price,0),logPrice=Q9U.H3h(Math.log(p),Math.LN10),height=yax.height;y=Q9U.q3h(height,height*(logPrice-yax.logLow)/yax.logShadow);}
y+=yax.top;return y;}
;STXChart.prototype.pixelFromValueAdjusted=function(panel,tick,value,yAxis){if(this.layout.adj||!this.charts[panel.name])return this.pixelFromPriceTransform(value,panel,yAxis);var a=Math.round(tick),ratio;if(Q9U.m3h(a,0)&&Q9U.d3h(a,panel.chart.dataSet.length)&&(ratio=panel.chart.dataSet[a].ratio)){return this.pixelFromPriceTransform(Q9U.f3h(value,ratio),panel,yAxis);}
return this.pixelFromPriceTransform(value,panel,yAxis);}
;STXChart.prototype.adjustIfNecessary=function(panel,tick,value){if(this.layout.adj)return value;if(!panel||!this.charts[panel.name])return value;var a=Math.round(tick),ratio;if(Q9U.j4h(a,0)&&Q9U.o4h(a,panel.chart.dataSet.length)&&(ratio=panel.chart.dataSet[a].ratio)){return Q9U.t4h(value,ratio);}
return value;}
;STXChart.prototype.setTransform=function(chart,transformFunction,untransformFunction){chart.transformFunc=transformFunction;chart.untransformFunc=untransformFunction;}
;STXChart.prototype.unsetTransform=function(chart){delete  chart.transformFunc;delete  chart.untransformFunc;for(var i=0;Q9U.O4h(i,chart.dataSet.length);i++){chart.dataSet[i].transform=null;}
}
;STXChart.prototype.undo=function(){var a3p="undo";if(this.runPrepend(a3p,arguments))return ;if(this.activeDrawing){this.activeDrawing.abort();this.activeDrawing=G8p;STX.clearCanvas(this.chart.tempCanvas,this);this.draw();STX.swapClassName(this.controls.crossX,S1n,b1n);STX.swapClassName(this.controls.crossY,S1n,b1n);STXChart.drawingLine=U5p;}
this.runAppend(a3p,arguments);}
;STXChart.prototype.undoStamp=function(before,after){var F4p="undoStamp";this.undoStamps.push(before);this.dispatch(F4p,{before:before,after:after}
);}
;STXChart.prototype.undoLast=function(){var D8n="tor";if(this.activeDrawing){this.undo();}
else{if(this.undoStamps.length){this.drawingObjects=this.undoStamps.pop();this.changeOccurred((T7X+r4p+D8n));this.draw();}
}
}
;STXChart.prototype.addDrawing=function(drawing){var drawings=STX.shallowClone(this.drawingObjects);this.drawingObjects.push(drawing);this.undoStamp(drawings,STX.shallowClone(this.drawingObjects));}
;STXChart.prototype.plotLine=function(x0,x1,y0,y1,color,type,context,confineToPanel,parameters){var O6p="ra";if(!parameters)parameters={}
;if(Q9U.L4h(parameters.pattern,(B8p+d1p)))return ;if(Q9U.k4h(confineToPanel,true))confineToPanel=this.chart.panel;if(Q9U.w4h(context,null)||typeof (context)=="undefined")context=this.chart.context;if(isNaN(x0)||isNaN(x1)||isNaN(y0)||isNaN(y1)){return ;}
var edgeTop=0,edgeBottom=this.chart.canvasHeight,edgeLeft=0,edgeRight=this.right;if(confineToPanel){edgeBottom=confineToPanel.yAxis.bottom;edgeTop=confineToPanel.yAxis.top;edgeLeft=confineToPanel.left;edgeRight=confineToPanel.right;}
var bigX,bigY,v;if(Q9U.e4h(type,(O6p+B5p))){bigX=10000000;if(Q9U.E4h(x1,x0))bigX=-10000000;v={"x0":x0,"x1":x1,"y0":y0,"y1":y1}
;bigY=STX.yIntersection(v,bigX);x1=bigX;y1=bigY;}
if(Q9U.P4h(type,"line")||Q9U.p4h(type,"horizontal")||Q9U.Q4h(type,"vertical")){bigX=10000000;var littleX=-10000000;v={"x0":x0,"x1":x1,"y0":y0,"y1":y1}
;bigY=STX.yIntersection(v,bigX);var littleY=STX.yIntersection(v,littleX);x0=littleX;x1=bigX;y0=littleY;y1=bigY;}
var t0=0.0,t1=1.0,xdelta=Q9U.F4h(x1,x0),ydelta=Q9U.h4h(y1,y0),p,q,r;for(var edge=0;Q9U.X4h(edge,4);edge++){if(Q9U.T4h(edge,0)){p=-xdelta;q=-(Q9U.J4h(edgeLeft,x0));}
if(Q9U.U0h(edge,1)){p=xdelta;q=(Q9U.S0h(edgeRight,x0));}
if(Q9U.G0h(edge,2)){p=-ydelta;q=-(Q9U.V0h(edgeTop,y0));}
if(Q9U.R0h(edge,3)){p=ydelta;q=(Q9U.D0h(edgeBottom,y0));}
r=Q9U.g0h(q,p);if((y1||Q9U.n0h(y1,0))&&Q9U.Z0h(p,0)&&Q9U.s0h(q,0)){return false;}
if(Q9U.i0h(p,0)){if(Q9U.a0h(r,t1))return false;else if(Q9U.I0h(r,t0))t0=r;}
else if(Q9U.r0h(p,0)){if(Q9U.A0h(r,t0))return false;else if(Q9U.y0h(r,t1))t1=r;}
}
var x0clip=x0+Q9U.c0h(t0,xdelta),y0clip=y0+Q9U.B0h(t0,ydelta),x1clip=x0+Q9U.l8h(t1,xdelta),y1clip=y0+Q9U.Y8h(t1,ydelta);if(!y1&&Q9U.x8h(y1,0)&&!y0&&Q9U.K8h(y0,0)){y0clip=edgeTop;y1clip=edgeBottom;x0clip=v.x0;x1clip=v.x0;if(Q9U.C8h(v.x0,edgeRight))return false;if(Q9U.W8h(v.x0,edgeLeft))return false;}
else if(!y1&&Q9U.v8h(y1,0)){if(Q9U.M8h(v.y0,v.y1))y1clip=edgeBottom;else y1clip=edgeTop;x0clip=v.x0;x1clip=v.x0;if(Q9U.u8h(v.x0,edgeRight))return false;if(Q9U.N8h(v.x0,edgeLeft))return false;}
context.lineWidth=1.1;if(typeof (color)=="object"){context.strokeStyle=color.color;if(color.opacity)context.globalAlpha=color.opacity;else context.globalAlpha=1;context.lineWidth=parseInt(STX.stripPX(color.width));}
else{if(!color||Q9U.b8h(color,"auto")||STX.isTransparent(color)){context.strokeStyle=this.defaultColor;}
else{context.strokeStyle=color;}
}
if(parameters.opacity)context.globalAlpha=parameters.opacity;if(parameters.lineWidth)context.lineWidth=parameters.lineWidth;if(Q9U.z8h(type,"zig zag"))context.lineWidth=5;var pattern=null;if(parameters.pattern){pattern=parameters.pattern;if(Q9U.H8h(pattern,"solid")){pattern=null;}
else if(Q9U.q8h(pattern,"dotted")){pattern=[context.lineWidth,context.lineWidth];}
else if(Q9U.m8h(pattern,(S5n+c1n+g4p+Z8p+F7p))){pattern=[Q9U.d8h(context.lineWidth,5),Q9U.f8h(context.lineWidth,5)];}
}
context.stxLine(x0clip,y0clip,x1clip,y1clip,context.strokeStyle,context.globalAlpha,context.lineWidth,pattern);context.globalAlpha=1;context.lineWidth=1;}
;STXChart.prototype.connectTheDots=function(points,color,type,context,confineToPanel,parameters){if(!parameters)parameters={}
;if(Q9U.j6h(parameters.pattern,(S0p+v9p)))return ;if(Q9U.o6h(confineToPanel,true))confineToPanel=this.chart.panel;if(Q9U.t6h(context,null)||typeof (context)=="undefined")context=this.chart.context;if(Q9U.O6h(points.length,4))return ;var edgeTop=0,edgeBottom=this.chart.canvasHeight,edgeLeft=0,edgeRight=this.chart.width;if(confineToPanel){edgeBottom=confineToPanel.yAxis.bottom;edgeTop=confineToPanel.yAxis.top;}
context.lineWidth=1.1;if(typeof (color)=="object"){context.strokeStyle=color.color;if(color.opacity)context.globalAlpha=color.opacity;else context.globalAlpha=1;context.lineWidth=parseInt(STX.stripPX(color.width));}
else{if(!color||Q9U.L6h(color,"auto")||STX.isTransparent(color)){context.strokeStyle=this.defaultColor;}
else{context.strokeStyle=color;}
}
if(parameters.opacity)context.globalAlpha=parameters.opacity;if(parameters.lineWidth)context.lineWidth=parameters.lineWidth;var pattern=null;if(parameters.pattern){pattern=parameters.pattern;if(Q9U.k6h(pattern,"solid")){pattern=null;}
else if(Q9U.w6h(pattern,"dotted")){pattern=[context.lineWidth,context.lineWidth];}
else if(Q9U.e6h(pattern,"dashed")){pattern=[Q9U.E6h(context.lineWidth,5),Q9U.P6h(context.lineWidth,5)];}
}
context.beginPath();for(var i=0;Q9U.p6h(i,points.length-2);i+=2){var x0=points[i],y0=points[i+1],x1=points[i+2],y1=points[i+3];if(isNaN(x0)||isNaN(x1)||isNaN(y0)||isNaN(y1))return ;var t0=0.0,t1=1.0,xdelta=Q9U.Q6h(x1,x0),ydelta=Q9U.F6h(y1,y0),p,q,r;for(var edge=0;Q9U.h6h(edge,4);edge++){if(Q9U.X6h(edge,0)){p=-xdelta;q=-(Q9U.T6h(edgeLeft,x0));}
if(Q9U.J6h(edge,1)){p=xdelta;q=(Q9U.U2h(edgeRight,x0));}
if(Q9U.S2h(edge,2)){p=-ydelta;q=-(Q9U.G2h(edgeTop,y0));}
if(Q9U.V2h(edge,3)){p=ydelta;q=(Q9U.R2h(edgeBottom,y0));}
r=Q9U.D2h(q,p);if((y1||Q9U.g2h(y1,0))&&Q9U.n2h(p,0)&&Q9U.Z2h(q,0)){return false;}
if(Q9U.s2h(p,0)){if(Q9U.i2h(r,t1))return false;else if(Q9U.a2h(r,t0))t0=r;}
else if(Q9U.I2h(p,0)){if(Q9U.r2h(r,t0))return false;else if(Q9U.A2h(r,t1))t1=r;}
}
var x0clip=x0+Q9U.y2h(t0,xdelta),y0clip=y0+Q9U.c2h(t0,ydelta),x1clip=x0+Q9U.B2h(t1,xdelta),y1clip=y0+Q9U.l1h(t1,ydelta);try{if(pattern){context.dashedLineTo(x0clip,y0clip,x1clip,y1clip,pattern);}
else{context.moveTo(x0clip,y0clip);context.lineTo(x1clip,y1clip);}
}
catch(e){}
}
context.stroke();context.closePath();context.globalAlpha=1;context.lineWidth=1;}
;STXChart.prototype.plotSpline=function(points,tension,color,type,context,confineToPanel,parameters){var x8n="da";if(!parameters)parameters={}
;if(Q9U.Y1h(parameters.pattern,"none"))return ;if(Q9U.x1h(confineToPanel,true))confineToPanel=this.chart.panel;if(Q9U.K1h(context,null)||typeof (context)==(P3p+S0p+S5n+N7p+r8p+A7p))context=this.chart.context;context.save();context.lineWidth=1.1;if(typeof (color)=="object"){context.strokeStyle=color.color;if(color.opacity)context.globalAlpha=color.opacity;else context.globalAlpha=1;context.lineWidth=parseInt(STX.stripPX(color.width));}
else{if(!color||Q9U.C1h(color,"auto")||STX.isTransparent(color)){context.strokeStyle=this.defaultColor;}
else{context.strokeStyle=color;}
}
if(parameters.opacity)context.globalAlpha=parameters.opacity;if(parameters.lineWidth)context.lineWidth=parameters.lineWidth;var pattern=null;if(parameters.pattern){pattern=parameters.pattern;if(Q9U.W1h(pattern,"solid")){pattern=null;}
else if(Q9U.v1h(pattern,"dotted")){pattern=[context.lineWidth,context.lineWidth];}
else if(Q9U.M1h(pattern,(x8n+g4p+Z8p+F7p))){pattern=[Q9U.u1h(context.lineWidth,5),Q9U.N1h(context.lineWidth,5)];}
}
if(pattern&&context.setLineDash){context.setLineDash(pattern);context.lineDashOffset=0;}
plotSpline(points,tension,context);context.restore();}
;STXChart.prototype.drawingClick=function(panel,x,y){var U8p="sha",C6p="cro";if(!this.activeDrawing){if(!panel)return ;var Factory=STXChart.drawingTools[this.currentVectorParameters.vectorType];if(!Factory){if(STX.Drawing[this.currentVectorParameters.vectorType]){Factory=STX.Drawing[this.currentVectorParameters.vectorType];STXChart.registerDrawingTool(this.currentVectorParameters.vectorType,Factory);}
}
if(Factory){this.activeDrawing=new Factory();this.activeDrawing.construct(this,panel);if(!this.charts[panel.name]){if(this.activeDrawing.chartsOnly){this.activeDrawing=G8p;return ;}
}
}
}
if(this.activeDrawing){if(this.userPointerDown&&!this.activeDrawing.dragToDraw){if(!STXChart.drawingLine)this.activeDrawing=G8p;return ;}
var tick=this.tickFromPixel(x,panel.chart),dpanel=this.panels[this.activeDrawing.panelName],value=this.adjustIfNecessary(dpanel,tick,this.valueFromPixelUntransform(y,dpanel));if(this.preferences.magnet&&this.magnetizedPrice){value=this.adjustIfNecessary(dpanel,tick,this.magnetizedPrice);}
if(this.activeDrawing.click(this.chart.tempCanvas.context,tick,value)){if(this.activeDrawing){STXChart.drawingLine=U5p;STX.clearCanvas(this.chart.tempCanvas,this);this.addDrawing(this.activeDrawing);this.activeDrawing=G8p;this.adjustDrawings();this.draw();this.changeOccurred(o2n);STX.swapClassName(this.controls.crossX,(k9p+C6p+g4p+U8p+r8p+o4p),b1n);STX.swapClassName(this.controls.crossY,S1n,b1n);}
}
else{this.changeOccurred(Z1n);STXChart.drawingLine=L8p;STX.swapClassName(this.controls.crossX,b1n,S1n);STX.swapClassName(this.controls.crossY,b1n,S1n);}
return L8p;}
return U5p;}
;STXChart.prototype.whichPanel=function(y){for(var p in this.panels){var panel=this.panels[p];if(panel.hidden)continue;if(Q9U.b1h(y,panel.top)&&Q9U.z1h(y,panel.bottom))return panel;}
return G8p;}
;STXChart.prototype.mouseup=function(e){if(this.runPrepend(I1p,arguments))return ;this.swipe.end=L8p;if(this.repositioningDrawing){if(!this.currentVectorParameters.vectorType||(Q9U.H1h(Date.now()-this.mouseTimer,P7X))){this.changeOccurred(o2n);STX.clearCanvas(this.chart.tempCanvas,this);this.repositioningDrawing=G8p;this.adjustDrawings();this.draw();return ;}
else{this.repositioningDrawing=U5p;}
}
if(this.repositioningBaseline){this.repositioningBaseline=G8p;this.chart.panel.yAxis.scroll=Q9U.q1h(this.pixelFromPriceTransform(this.chart.baseline.userLevel,this.chart.panel),(this.chart.panel.yAxis.top+this.chart.panel.yAxis.bottom)/Q9U.M0n);this.draw();return ;}
var wasMouseDown=this.userPointerDown;this.userPointerDown=U5p;if(!this.displayInitialized)return ;this.grabbingScreen=U5p;if(Q9U.m1h(this.openDialog,w3p)){if(STXChart.insideChart)STX.unappendClassName(this.container,d5n);return ;}
if(this.grabOverrideClick){this.swipeRelease();STX.unappendClassName(this.container,d5n);this.grabOverrideClick=U5p;return ;}
if(STXChart.insideChart)STX.unappendClassName(this.container,d5n);if(STXChart.resizingPanel){this.releaseHandle({}
);return ;}
if(!e)e=event;if((e.which&&Q9U.d1h(e.which,Q9U.M0n))||(e.button&&Q9U.f1h(e.button,Q9U.M0n))){if(this.anyHighlighted){this.rightClickHighlighted();if(e.preventDefault&&this.captureTouchEvents)e.preventDefault();e.stopPropagation();return U5p;}
else{return L8p;}
}
if(Q9U.j5h(e.clientX,this.left)||Q9U.o5h(e.clientX,this.right))return ;if(Q9U.t5h(e.clientY,this.top)||Q9U.O5h(e.clientY,this.bottom))return ;var cy=this.backOutY(e.clientY),cx=this.backOutX(e.clientX);if(wasMouseDown){this.drawingClick(this.currentPanel,cx,cy);}
if(!this.activeDrawing){this.dispatch(J8n,{stx:this,panel:this.currentPanel,x:cx,y:cy}
);}
this.runAppend(I1p,arguments);}
;STXChart.prototype.grabbingHand=function(){if(!this.allowScroll)return ;if(!this.grabbingScreen)return ;if(STX.touchDevice)return ;STX.appendClassName(this.container,d5n);}
;STXChart.prototype.mousedown=function(e){if(this.runPrepend("mousedown",arguments))return ;this.grabOverrideClick=false;if(Q9U.L5h(this.openDialog,""))return ;if(!this.displayInitialized)return ;if(!this.displayCrosshairs)return ;if(!STXChart.insideChart)return ;if(this.manageTouchAndMouse&&e&&e.preventDefault&&this.captureTouchEvents)e.preventDefault();this.mouseTimer=Date.now();this.userPointerDown=true;if(!e)e=event;if((e.which&&Q9U.k5h(e.which,2))||(e.button&&Q9U.w5h(e.button,2))){return ;}
var chart=this.currentPanel.chart;if(Q9U.e5h(e.clientX,this.left)&&Q9U.E5h(e.clientX,this.right)&&Q9U.P5h(e.clientY,this.top)&&Q9U.p5h(e.clientY,this.bottom)){if(this.repositioningDrawing)return ;for(var i=0;Q9U.Q5h(i,this.drawingObjects.length);i++){var drawing=this.drawingObjects[i];if(drawing.highlighted){if(this.ctrl){var Factory=STXChart.drawingTools[drawing.name],clonedDrawing=new Factory();clonedDrawing.reconstruct(this,drawing.serialize());this.drawingObjects.push(clonedDrawing);this.repositioningDrawing=clonedDrawing;clonedDrawing.repositioner=drawing.repositioner;return ;}
this.repositioningDrawing=drawing;return ;}
}
if(Q9U.F5h(this.layout.chartType,"baseline_delta")&&Q9U.h5h(chart.baseline.userLevel,false)){var y0=this.valueFromPixelUntransform(Q9U.X5h(this.cy,5),this.currentPanel),y1=this.valueFromPixelUntransform(this.cy+5,this.currentPanel),x0=Q9U.T5h(this.chart.right,parseInt(getComputedStyle(this.controls.baselineHandle).width,10));if(Q9U.J5h(chart.baseline.actualLevel,y0)&&Q9U.U7W(chart.baseline.actualLevel,y1)&&Q9U.S7W(this.cx,x0)){this.repositioningBaseline={lastDraw:Date.now()}
;return ;}
}
this.drawingClick(this.currentPanel,this.cx,this.cy);if(this.activeDrawing&&this.activeDrawing.dragToDraw)return ;}
this.grabbingScreen=true;this.yToleranceBroken=false;if(!e)e=event;this.grabStartX=e.clientX;this.grabStartY=e.clientY;this.grabStartScrollX=chart.scroll;this.grabStartScrollY=chart.panel.yAxis.scroll;this.grabStartCandleWidth=this.layout.candleWidth;this.grabStartZoom=this.whichYAxis(this.currentPanel).zoom;setTimeout((function(self){return function(){self.grabbingHand();}
;}
)(this),100);this.swipeStart(chart);this.runAppend("mousedown",arguments);}
;STXChart.prototype.changeVectorType=function(value){this.currentVectorParameters.vectorType=value;if(STXChart.drawingLine)this.undo();this.setCrosshairColors();if(STXChart.insideChart)this.doDisplayCrosshairs();}
;STXChart.prototype.rightClickOverlay=function(name){var F3p="rightClickOverlay";if(this.runPrepend(F3p,arguments))return ;var sd=this.overlays[name];if(sd.editFunction){sd.editFunction();}
else{this.removeOverlay(name);}
this.runAppend(F3p,arguments);}
;STXChart.prototype.removeOverlay=function(name){var a9p="removeOverlay";if(this.runPrepend(a9p,arguments))return ;var mySD;for(var o in this.overlays){var sd=this.overlays[o];if(sd.inputs.Field&&sd.inputs.Field.indexOf(name)!=-Q9U.s0n){this.removeOverlay(sd.name);}
else if(Q9U.G7W(sd.name,name)){mySD=sd;}
}
var study=this.layout.studies[name];STX.deleteRHS(STX.Studies.studyPanelMap,study);if(mySD)this.cleanupRemovedStudy(mySD);delete  this.overlays[name];this.displaySticky();this.createDataSet();this.changeOccurred(f0n);this.runAppend(a9p,arguments);}
;STXChart.prototype.addSeries=function(field,parameters,cb){if(this.runPrepend("addSeries",arguments))return ;if(!parameters)parameters={}
;if(!parameters.chartName)parameters.chartName=this.chart.name;var obj={parameters:STX.clone(parameters),yValueCache:[],display:field}
;if(Q9U.V7W("display",obj.parameters))obj.display=obj.parameters.display;if(obj.parameters.isComparison)obj.parameters.shareYAxis=true;if(!obj.parameters.chartType&&obj.parameters.color)obj.parameters.chartType="line";if(obj.parameters.chartType&&Q9U.R7W(obj.parameters.chartType,"mountain"))obj.parameters.chartType="line";if(!obj.parameters.panel)obj.parameters.panel=this.chart.panel.name;var chart=this.charts[parameters.chartName],self=this;function addSeriesData(stx){var f4n="und",mIterator=0,cIterator=0;while(parameters.data&&Q9U.D7W(mIterator,stx.masterData.length)&&Q9U.g7W(cIterator,parameters.data.length)){var c=parameters.data[cIterator],m=stx.masterData[mIterator];if(!c.DT||typeof c.DT=="undefined")c.DT=STX.strToDateTime(c.Date);if(Q9U.n7W(c.DT.getTime(),m.DT.getTime())){if(typeof c.Value!="undefined"){m[field]=c.Value;}
else if(stx.layout.adj&&typeof c.Adj_Close!=(f4n+N7p+r8p+d1p+S5n)){m[field]=c.Adj_Close;}
else{m[field]=c.Close;}
cIterator++;mIterator++;continue;}
if(Q9U.Z7W(c.DT,m.DT))cIterator++;else mIterator++;}
}
function setUpRenderer(stx,obj){if(obj.parameters.color){var r=stx.getSeriesRenderer("_generic_series");if(!r){r=stx.setSeriesRenderer(new STX.Renderer.Lines({params:{panel:obj.parameters.panel,type:"legacy",name:"_generic_series",overChart:true}
,}
));}
r.attachSeries(field,obj.parameters).ready();}
}
if(chart){chart.series[field]=obj;}
if(parameters.isComparison){self.setComparison(true,chart);}
var doneInCallback=false;if(parameters.data){if(parameters.data.useDefaultQuoteFeed){var driver=this.quoteDriver,fetchParams=driver.makeParams(field,parameters.symbolObject,this.chart);fetchParams.startDate=this.chart.masterData[0].DT;fetchParams.endDate=this.chart.masterData[Q9U.s7W(this.chart.masterData.length,1)].DT;if(parameters.symbolObject)fetchParams.symbolObject=parameters.symbolObject;doneInCallback=true;driver.quoteFeed.fetch(fetchParams,function(dataCallback){if(!dataCallback.error){parameters.data=dataCallback.quotes;addSeriesData(self);setUpRenderer(self,obj);}
if(cb)cb(dataCallback.error,obj);self.runAppend("addSeries",arguments);}
);}
else if(this.masterData){addSeriesData(this);}
}
else{obj.addSeriesData=addSeriesData;}
if(!doneInCallback){setUpRenderer(self,obj);if(cb)cb(null,obj);this.runAppend("addSeries",arguments);}
return obj;}
;STXChart.prototype.deleteSeries=function(field,chart){var q1n="deleteSeries";if(this.runPrepend(q1n,arguments))return ;if(!chart)chart=this.chart;delete  chart.series[field];if(this.quoteDriver)this.quoteDriver.updateSubscriptions();this.runAppend(q1n,arguments);}
;STXChart.prototype.removeSeries=function(field,chart){if(this.runPrepend("removeSeries",arguments))return ;if(!chart)chart=this.chart;for(var r in chart.seriesRenderers){var renderer=chart.seriesRenderers[r];for(var sp=Q9U.i7W(renderer.seriesParams.length,1);Q9U.a7W(sp,0);sp--){var series=renderer.seriesParams[sp];if(!series.permanent&&Q9U.I7W(series.field,field)){renderer.removeSeries(field);}
}
}
this.deleteSeries(field,chart);var comparing=false;for(var s in chart.series){if(chart.series[s].parameters.isComparison)comparing=true;}
if(!comparing)this.setComparison(false,chart);this.createDataSet();this.draw();this.runAppend("removeSeries",arguments);}
;STXChart.prototype.rendererAction=function(chart,phase){var u1n="ct",R2n="rA",c8p="rend",t1n="ay",d3p="rl",Z4p="rendererAction";if(this.runPrepend(Z4p,arguments))return ;for(var id in chart.seriesRenderers){var renderer=chart.seriesRenderers[id];if(renderer.params.overChart&&Q9U.r7W(phase,f2n))continue;if(!renderer.params.overChart&&Q9U.A7W(phase,(L0p+T7X+n5n+d3p+t1n)))continue;if(!this.panels[renderer.params.panel])continue;if(Q9U.y7W(this.panels[renderer.params.panel].chart,chart))continue;if(Q9U.c7W(phase,Q2n)){renderer.performCalculations();}
else{renderer.draw();if(renderer.cb)renderer.cb(renderer.colors);}
}
this.runAppend((c8p+n5n+o4p+n5n+R2n+u1n+r8p+p9p),arguments);}
;STXChart.prototype.drawSeries=function(chart,seriesArray,yAxis){if(this.runPrepend("drawSeries",arguments))return ;var quotes=chart.dataSegment,legendColorMap={}
,series=null;if(!seriesArray)seriesArray=chart.series;for(var field in seriesArray){series=seriesArray[field];var parameters=series.parameters;if(!parameters.chartType)continue;var panel=chart.panel;if(parameters.panel)panel=this.panels[parameters.panel];if(!panel)continue;var yax=yAxis?yAxis:panel.yAxis,minMax=[parameters.minimum,parameters.maximum];if((!parameters.minimum&&Q9U.B7W(parameters.minimum,0))||(!parameters.maximum&&Q9U.l9W(parameters.maximum,0))){var minMaxCalc=STX.minMax(quotes,field);if(!parameters.minimum&&Q9U.Y9W(parameters.minimum,0))minMax[0]=minMaxCalc[0];if(!parameters.maximum&&Q9U.x9W(parameters.maximum,0))minMax[1]=minMaxCalc[1];}
var min=minMax[0],top=yax.top,bottom=yax.bottom,height=Q9U.K9W(bottom,top),t=parameters.marginTop,b=parameters.marginBottom;if(t)top=Q9U.C9W(t,1)?(top+t):(top+(Q9U.W9W(height,t)));if(b)bottom=Q9U.v9W(b,1)?(Q9U.M9W(bottom,b)):(Q9U.u9W(bottom,(height*b)));var multiplier=Q9U.N9W((bottom-top),(minMax[1]-min)),started=false,lastPoint=null,val=null,x=null,y=null,px=null,py=null,cw=this.layout.candleWidth,context=this.chart.context,isStep=(Q9U.b9W(parameters.type,"step")||Q9U.z9W(parameters.subtype,"step")),color=parameters.color;if(!color)color=this.defaultColor;var width=parameters.width;if(!width||isNaN(width)||Q9U.H9W(width,1))width=1;if(series.highlight||series.parameters.highlight)width*=2;this.startClip(panel.name);seriesPlotter=new STX.Plotter();seriesPlotter.newSeries("line","stroke",color,1,width);if(parameters.gaps&&parameters.gaps.color)seriesPlotter.newSeries("gap","stroke",parameters.gaps.color,1,width);else seriesPlotter.newSeries((K6p+c1n+P4p),"stroke",color,1,width);series.yValueCache=new Array(quotes.length);var yValueCache=series.yValueCache,lastQuote=null,gap=null,points=[],doTransform=series.parameters.shareYAxis&&!yAxis,shareYAxis=series.parameters.shareYAxis||yAxis,xbase=Q9U.q9W(panel.left,(isStep?1:0.5)*cw,this.micropixels,1),x0=xbase;for(var i=0;Q9U.T9W(i,quotes.length);i++){xbase+=Q9U.J9W(cw,2);if(isStep)xbase+=Q9U.U3W(cw,2);cw=this.layout.candleWidth;if(!isStep)xbase+=Q9U.S3W(cw,2);if(Q9U.G3W(x,null)&&Q9U.V3W(y,null)){if(!gap||parameters.gaps)points.push([x,y]);}
var quote=quotes[i];if(!quote)continue;if(quote.candleWidth){if(!isStep)xbase+=Q9U.R3W((quote.candleWidth-cw),2);cw=quote.candleWidth;}
if(quote.transform&&doTransform)quote=quote.transform;val=quote[field];if(!val&&Q9U.D3W(val,0)){if(isStep||parameters.gaps){yValueCache[i]=y;}
if(Q9U.g3W(gap,false)){if(isStep){x+=cw;seriesPlotter.lineTo("line",x,y);}
seriesPlotter.moveTo("gap",x,y);}
gap=true;if(x&&!parameters.gaps)points.push([x,bottom]);continue;}
if(!isStep&&lastPoint&&Q9U.n3W(lastPoint,i-1)){px=x;py=y;}
else{px=null;}
x=xbase;if(Q9U.Z3W(x,panel.right))lastQuote=quote;if(this.extendLastTick&&Q9U.s3W(i,quotes.length-1))x+=Q9U.i3W(cw,2);if(isStep&&started){if(gap&&parameters.gaps&&parameters.gaps.pattern){seriesPlotter.dashedLineTo("gap",x,y,parameters.gaps.pattern);}
else if(gap&&!parameters.gaps){points.push([x,bottom]);seriesPlotter.moveTo("gap",x,y);}
else if(!gap&&parameters.pattern){seriesPlotter.dashedLineTo("line",x,y,parameters.pattern);}
else{seriesPlotter.lineTo((gap?"gap":"line"),x,y);}
points.push([x,y]);}
if(shareYAxis){y=this.pixelFromPrice(val,panel,yax);}
else{y=Q9U.a3W(bottom,((val-min)*multiplier));}
if(Q9U.I3W(px,null)){var vector={x0:px,x1:x,y0:py,y1:y}
;for(;Q9U.r3W(lastPoint,i);lastPoint++){var xInt=panel.left+Math.floor(xbase+Q9U.A3W(((lastPoint-i)+0.5),cw))+this.micropixels-1,yInt=STX.yIntersection(vector,xInt);yValueCache[lastPoint]=yInt;}
}
yValueCache[i]=y;if(i&&points.length&&started&&!yValueCache[Q9U.y3W(i,1)]&&Q9U.c3W(yValueCache[i-1],0)){for(var bf=Q9U.B3W(i,1);Q9U.l4W(bf,0);bf--){if(yValueCache[bf])break;yValueCache[bf]=points[Q9U.Y4W(points.length,1)][1];}
}
if(!started){started=true;var leftTick=Q9U.x4W(chart.dataSet.length,chart.scroll);if(Q9U.K4W(leftTick,0)){seriesPlotter.moveTo((gap?"gap":"line"),x,y);}
else{var baseline=chart.dataSet[leftTick];if(baseline.transform&&doTransform)baseline=baseline.transform;var y0=baseline[field];if(shareYAxis){y0=this.pixelFromPrice(y0,panel,yax);}
else{y0=Q9U.C4W(bottom,((y0-min)*multiplier));}
y0=Math.min(Math.max(y0,top),bottom);if(isNaN(y0)){seriesPlotter.moveTo((gap?"gap":(c5n+n5n)),x,y);}
else{seriesPlotter.moveTo((gap?"gap":"line"),x0,y0);if(isStep){if(gap){if(parameters.gaps)seriesPlotter.lineTo("gap",x,y0);else seriesPlotter.moveTo("gap",x,y0);}
else seriesPlotter.lineTo("line",x,y0);}
if(!gap||parameters.gaps){if(isStep)points.unshift([x,y0]);points.unshift([x0,y0]);}
if(gap&&parameters.gaps&&parameters.gaps.pattern){seriesPlotter.dashedLineTo("gap",x,y,parameters.gaps.pattern);}
else if(gap&&!parameters.gaps){points.unshift([x,bottom]);points.unshift([x0,bottom]);seriesPlotter.moveTo("gap",x,y);}
else if(!gap&&parameters.pattern){seriesPlotter.dashedLineTo((p4p+S0p+n5n),x,y,parameters.pattern);}
else{seriesPlotter.lineTo((gap?"gap":"line"),x,y);}
}
}
}
else{if(gap&&parameters.gaps&&parameters.gaps.pattern){seriesPlotter.dashedLineTo("gap",x,y,parameters.gaps.pattern);}
else if(gap&&!parameters.gaps){points.push([x,bottom]);seriesPlotter.moveTo("gap",x,y);}
else if(!gap&&parameters.pattern){seriesPlotter.dashedLineTo("line",x,y,parameters.pattern);if(isStep&&Q9U.W4W(i,quotes.length-1))seriesPlotter.dashedLineTo("line",x+cw,y,parameters.pattern);}
else{seriesPlotter.lineTo((gap?"gap":(W0p+c6n)),x,y);if(isStep&&Q9U.v4W(i,quotes.length-1)&&!gap)seriesPlotter.lineTo("line",x+cw,y);}
}
lastPoint=i;if(gap)seriesPlotter.moveTo("line",x,y);gap=false;}
if(gap){x=panel.left+Math.floor(xbase+cw+this.micropixels)-1;if(this.extendLastTick)x+=Q9U.M4W(cw,2);if(parameters.gaps&&parameters.gaps.pattern){if(started){seriesPlotter.dashedLineTo("gap",x,y,parameters.gaps.pattern);}
}
else if(parameters.gaps){seriesPlotter.lineTo("gap",x,y);}
}
if(Q9U.u4W(series.parameters.chartType,"mountain")&&points.length){points.push([x,(gap&&!parameters.gaps)?bottom:y]);if(!parameters.fillStyle){parameters.fillStyle=color;if(!parameters.fillOpacity)parameters.fillOpacity=0.3;}
seriesPlotter.newSeries("mountain","fill",parameters.fillStyle,parameters.fillOpacity);for(var pt=0;Q9U.N4W(pt,points.length);pt++){seriesPlotter[pt?"lineTo":"moveTo"]("mountain",points[pt][0],Math.min(bottom,points[pt][1]));}
seriesPlotter.lineTo("mountain",x,bottom);seriesPlotter.lineTo("mountain",points[0][0],bottom);seriesPlotter.draw(context,"mountain");}
seriesPlotter.draw(context,"gap");seriesPlotter.draw(context,"line");this.endClip();if(shareYAxis&&lastQuote){if(yax.priceFormatter){txt=yax.priceFormatter(this,panel,lastQuote[field],yax);}
else{txt=this.formatYAxisPrice(lastQuote[field],panel,null,yax);}
this.yAxisLabels.push({src:"series","args":[panel,txt,this.pixelFromPrice(lastQuote[field],panel,yax),color,null,null,yax]}
);}
var display=series.parameters.display;if(!display)display=series.display;legendColorMap[field]={color:color,display:display}
;}
if(chart.legend&&series&&series.useChartLegend){if(chart.legendRenderer)chart.legendRenderer(this,{"chart":chart,"legendColorMap":legendColorMap,"coordinates":{x:chart.legend.x,y:chart.legend.y+chart.panel.yAxis.top}
}
);}
this.runAppend("drawSeries",arguments);}
;STXChart.prototype.isDailyInterval=function(interval){if(Q9U.b4W(interval,L2n))return L8p;if(Q9U.z4W(interval,(u7X+L7p+O8p)))return L8p;if(Q9U.H4W(interval,d0n))return L8p;return U5p;}
;STXChart.prototype.setPeriodicityV2=function(period,interval,timeUnit,cb){var i7X="iver",I2n="uo",H4p="q",M6n="bac",k1p="taCa",G0p="th",M7X="erio",c5p="han";if(this.runPrepend("setPeriodicityV2",arguments))return ;if(typeof timeUnit==="function"){cb=timeUnit;timeUnit=null;}
var switchInterval=false;if(!interval)return ;if(!period)return ;if(Q9U.q4W(interval,"year")){interval="month";if(!period)period=1;period=Q9U.m4W(period,12);}
var isDaily=this.isDailyInterval(interval),wasDaily=this.isDailyInterval(this.layout.interval);if(isDaily)timeUnit=null;else if(Q9U.d4W(interval,"tick"))timeUnit=null;else if(!timeUnit)timeUnit="minute";var getDifferentData=false;if(this.chart.symbol){if(Q9U.f4W(isDaily,wasDaily)||this.dontRoll)getDifferentData=true;if(!wasDaily){if(Q9U.j0W(this.layout.interval,interval))getDifferentData=true;}
if(Q9U.o0W(timeUnit,this.layout.timeUnit))getDifferentData=true;}
this.layout.periodicity=period;this.layout.interval=interval;this.layout.timeUnit=timeUnit;if(getDifferentData){this.changeOccurred("layout");if(this.quoteDriver){for(var c in this.charts){if(this.charts[c].symbol){if(this.displayInitialized)this.quoteDriver.newChart({symbol:this.charts[c].symbol,symbolObject:this.charts[c].symbolObject,chart:this.charts[c]}
,cb);else this.newChart(this.charts[c].symbol,null,this.charts[c],cb);}
}
return ;}
else if(this.dataCallback){this.dataCallback();if(cb)cb(null);return ;}
else{console.log((M2n+B8p+E3p+b5n+e5n+c5p+N8n+b5n+P4p+M7X+S5n+w2n+r8p+E3p+B5p+b5n+I1n+n5n+e5n+G2n+g4p+n5n+b5n+S0p+n5n+r8p+G0p+p5n+b5n+S5n+c1n+k1p+W0p+W0p+M6n+O8p+b5n+L0p+o4p+b5n+H4p+I2n+E3p+n5n+y2n+o4p+i7X+b5n+c1n+o4p+n5n+b5n+g4p+T5n));return ;}
}
var chartName,chart;for(chartName in this.charts){chart=this.charts[chartName];var dt,pos=Math.round(Q9U.t0W(chart.maxTicks,2));this.setCandleWidth(this.layout.candleWidth,chart);var centerMe=true,rightAligned=false;if(Q9U.O0W(chart.scroll,chart.maxTicks))centerMe=false;else if(chart.dataSegment&&!chart.dataSegment[pos]){centerMe=false;rightAligned=Q9U.L0W(chart.scroll,chart.dataSet.length);}
if(centerMe&&chart.dataSegment&&Q9U.k0W(chart.dataSegment.length,0)){if(Q9U.w0W(chart.maxTicks,((Math.round((this.chart.width/this.layout.candleWidth)-0.499)-1)/2))){pos=Q9U.e0W(chart.dataSegment.length,1);}
if(Q9U.E0W(pos,chart.dataSegment.length)){dt=chart.dataSegment[Q9U.P0W(chart.dataSegment.length,1)].DT;pos=Q9U.p0W(chart.dataSegment.length,1);}
else{dt=chart.dataSegment[pos].DT;}
}
this.createDataSet();if(centerMe){if(chart.dataSegment&&Q9U.Q0W(chart.dataSegment.length,0)){for(var i=Q9U.F0W(chart.dataSet.length,1);Q9U.h0W(i,0);i--){var nd=chart.dataSet[i].DT;if(Q9U.X0W(nd.getTime(),dt.getTime())){chart.scroll=(Q9U.T0W(chart.dataSet.length,i))+pos;break;}
}
}
}
else if(!rightAligned){var wsInTicks=Math.round(Q9U.J0W(this.preferences.whitespace,this.layout.candleWidth));chart.scroll=Q9U.U8W(chart.maxTicks,wsInTicks);}
else{chart.scroll=chart.dataSet.length+rightAligned;}
}
if(this.displayInitialized)this.draw();this.changeOccurred("layout");if(this.quoteDriver){for(chartName in this.charts){chart=this.charts[chartName];if(chart.symbol&&chart.moreAvailable){this.quoteDriver.checkLoadMore(chart);}
}
}
if(cb)cb(null);this.runAppend("setPeriodicityV2",arguments);}
;STXChart.prototype.drawVectors=function(){if(this.vectorsShowing)return ;if(this.runPrepend("drawVectors",arguments))return ;this.vectorsShowing=true;if(!this.chart.hideDrawings){var tmpPanels={}
,panelName,i;for(i=0;Q9U.S8W(i,this.drawingObjects.length);i++){var drawing=this.drawingObjects[i];panelName=drawing.panelName;if(!this.panels[drawing.panelName])continue;if(!tmpPanels[panelName]){tmpPanels[panelName]=[];}
tmpPanels[panelName].push(drawing);}
for(panelName in tmpPanels){this.startClip(panelName);var arr=tmpPanels[panelName];for(i=0;Q9U.G8W(i,arr.length);i++){arr[i].render(this.chart.context);}
this.endClip();}
}
this.runAppend("drawVectors",arguments);}
;STXChart.prototype.consolidatedQuote=function(quotes,position,periodicity,interval,timeUnit,dontRoll,alignToHour){if(Q9U.V8W(position,0))return null;var arguments$=[quotes,position,periodicity,interval,dontRoll,alignToHour];if(this.runPrepend("consolidatedQuote",arguments$))return null;if(!dontRoll&&this.dontRoll)dontRoll=true;var quote=quotes[position];function consolidate(self,p){var ratio=1;if(self.layout.adj&&quotes[p].Adj_Close){ratio=Q9U.R8W(quotes[p].Adj_Close,quotes[p].Close);}
if(Q9U.D8W("High",quotes[p]))if(Q9U.g8W(quotes[p].High*ratio,quote.High))quote.High=Q9U.n8W(quotes[p].High,ratio);if(Q9U.Z8W("Low",quotes[p]))if(Q9U.s8W(quotes[p].Low*ratio,quote.Low))quote.Low=Q9U.i8W(quotes[p].Low,ratio);quote.Volume+=quotes[p].Volume;if(Q9U.a8W("Close",quotes[p])&&Q9U.I8W(quotes[p].Close,null))quote.Close=Q9U.r8W(quotes[p].Close,ratio);quote.ratio=ratio;for(var element in quotes[p]){if(!quote[element]){quote[element]=quotes[p][element];}
}
}
function newInterval(p,interval){var d1=quotes[Q9U.A8W(p,1)].DT,d2=quotes[p].DT;if(Q9U.y8W(interval,(T7p))){if(Q9U.c8W(d2.getDay(),d1.getDay()))return true;}
else if(Q9U.B8W(interval,"month")){if(Q9U.l6W(d2.getMonth(),d1.getMonth()))return true;}
else{if(Q9U.Y6W(d2.getDay(),d1.getDay()))return true;}
return false;}
function newIntradayInterval(position,p,periodicity,interval,timeUnit){var nextBar=Q9U.x6W(interval,periodicity),d1=new Date(quotes[position].DT);if(Q9U.K6W(timeUnit,"millisecond"))d1.setMilliseconds(d1.getMilliseconds()+nextBar);else if(Q9U.C6W(timeUnit,"second"))d1.setSeconds(d1.getSeconds()+nextBar);else d1.setMinutes(d1.getMinutes()+nextBar);var d2=quotes[p].DT;if(alignToHour){if(Q9U.W6W(quotes[position].DT.getMinutes(),nextBar)){if(Q9U.v6W(d2.getMinutes()%nextBar,0)){return true;}
}
}
if(Q9U.M6W(d2.getTime(),d1.getTime()))return true;return false;}
var p=position,i;if((Q9U.u6W(interval,"week")||Q9U.N6W(interval,"month"))&&!dontRoll){for(i=1;Q9U.b6W(i,periodicity);i++){while(Q9U.z6W(p+1,quotes.length)&&!newInterval(p+1,interval)){p++;consolidate(this,p);}
if(Q9U.H6W(i,periodicity)){p++;if(Q9U.q6W(p,quotes.length))consolidate(this,p);}
}
}
else if(!this.isDailyInterval(interval)&&Q9U.m6W(interval,"tick")&&Q9U.d6W(periodicity,1)){for(i=1;Q9U.f6W(i,periodicity);i++){p=position+i;if(Q9U.j2W(p,quotes.length)&&newIntradayInterval(position,p,periodicity,interval,timeUnit)){p--;break;}
if(Q9U.o2W(p,0)&&Q9U.t2W(p,quotes.length)){consolidate(this,p);}
}
}
else{for(i=1;Q9U.O2W(i,periodicity);i++){p=position+i;if(Q9U.L2W(p,0)&&Q9U.k2W(p,quotes.length)){consolidate(this,p);}
}
}
for(i in this.plugins){var plugin=this.plugins[i];if(plugin.consolidate)plugin.consolidate(quotes,position,p,quote);}
this.runAppend("consolidatedQuote",arguments$);return {"quote":quote,"position":p+1}
;}
;R(Q9U.P0n);C(Q9U.s0n);k(Q9U.M0n);M(Q9U.b0n);E(Q9U.F0n);P(Q9U.C2p);Q(U2p);STXChart.prototype.displayChart=function(chart){var a1n="_trace",y5p="_base",E8n="e_d",z1p="do",S6n="ndl",C1p="tx",U3p="down",x2n="dow",r8n="ven",q3p="e_",W4p="_ca",H5n="ow",M1n="hol",t6n="cha",G5n="line_",Y4p="f_d",e5p="wn",k1n="i_",Y2n="kag",N5p="gi",noBorders=(Q9U.w2W(this.layout.candleWidth-chart.tmpWidth,2)&&Q9U.e2W(chart.tmpWidth,3));if(this.runPrepend("displayChart",arguments))return ;this.chart.baseLegendColors=[];var chartType=this.layout.chartType,colorFunction=null;if(chart.customChart){if(chart.customChart.chartType)chartType=chart.customChart.chartType;if(chart.customChart.colorFunction)colorFunction=chart.customChart.colorFunction;}
this.controls.baselineHandle.style.display="none";var panel=chart.panel;if(Q9U.E2W(this.layout.aggregationType,"kagi")){this.drawKagiSquareWave(panel,(j5n+v0p+O8p+c1n+N5p+G7p+P3p+P4p),"stx_kagi_down");this.chart.baseLegendColors.push(this.getCanvasColor("stx_kagi_up"));this.chart.baseLegendColors.push(this.getCanvasColor((k9p+Y2n+k1n+S5n+L0p+e5p)));}
else if(Q9U.P2W(this.layout.aggregationType,"pandf")){this.drawPointFigureChart(panel,"stx_pandf_up","X");this.chart.baseLegendColors.push(this.getCanvasColor("stx_pandf_up"));this.drawPointFigureChart(panel,"stx_pandf_down","O");this.chart.baseLegendColors.push(this.getCanvasColor((j5n+k7X+G7p+P4p+c1n+O5p+Y4p+L0p+u7X+S0p)));}
else if(Q9U.p2W(chartType,"line")){this.drawLineChart(panel,"stx_line_chart");}
else if(Q9U.Q2W(chartType,"mountain")){this.chart.baseLegendColors=null;this.drawMountainChart(panel);}
else if(Q9U.F2W(chartType,"wave")){this.drawWaveChart(panel);}
else if(Q9U.h2W(chartType,"bar")){this.startClip(panel.name);this.drawBarChartHighPerformance(panel,"stx_bar_chart");this.endClip();}
else if(Q9U.X2W(chartType,"colored_line")){this.startClip(panel.name);var stxLineUpColor=this.getCanvasColor("stx_line_up"),stxLineDownColor=this.getCanvasColor("stx_line_down"),stxLineColor=this.getCanvasColor("stx_line_chart");if(!colorFunction)colorFunction=function(stx,quote,mode){if(Q9U.T2W(quote.Close,quote.iqPrevClose))return stxLineUpColor;else if(Q9U.J2W(quote.Close,quote.iqPrevClose))return stxLineDownColor;else return stxLineColor;return null;}
;var colors1=this.drawLineChart(panel,(k9p+G5n+t6n+o4p+E3p),colorFunction);for(var c1 in colors1)this.chart.baseLegendColors.push(c1);this.endClip();}
else if(Q9U.U1W(chartType,"colored_bar")){this.startClip(panel.name);if(colorFunction){var colors2=this.drawBarChart(panel,"stx_bar_chart",colorFunction);for(var c2 in colors2)this.chart.baseLegendColors.push(c2);}
else{this.drawBarChartHighPerformance(panel,"stx_bar_up",STXChart.CLOSEUP);this.drawBarChartHighPerformance(panel,"stx_bar_down",STXChart.CLOSEDOWN);this.drawBarChartHighPerformance(panel,"stx_bar_even",STXChart.CLOSEEVEN);this.chart.baseLegendColors.push(this.getCanvasColor("stx_bar_up"));this.chart.baseLegendColors.push(this.getCanvasColor("stx_bar_down"));}
this.endClip();}
else if(Q9U.S1W(chartType,"hollow_candle")||Q9U.G1W(chartType,"volume_candle")){this.startClip(panel.name);if(colorFunction){if(!this.noWicksOnCandles[this.layout.aggregationType])this.drawShadows(panel,colorFunction);this.drawCandles(panel,colorFunction,false);this.drawCandles(panel,colorFunction,true);}
else{if(!this.noWicksOnCandles[this.layout.aggregationType]){this.drawShadowsHighPerformance(panel,"stx_hollow_candle_up",STXChart.CLOSEUP);this.drawShadowsHighPerformance(panel,"stx_hollow_candle_down",STXChart.CLOSEDOWN);this.drawShadowsHighPerformance(panel,(g4p+E3p+k7X+G7p+M1n+W0p+H5n+W4p+S0p+x2p+q3p+n5n+r8n),STXChart.CLOSEEVEN);}
var colorUp=this.getCanvasColor("stx_hollow_candle_up"),colorDown=this.getCanvasColor("stx_hollow_candle_down"),colorEven=this.getCanvasColor("stx_hollow_candle_even");this.drawCandlesHighPerformance(panel,colorUp,"transparent",Q9U.V1W(STXChart.CLOSEUP,STXChart.CANDLEDOWN));this.drawCandlesHighPerformance(panel,colorDown,"transparent",Q9U.R1W(STXChart.CLOSEDOWN,STXChart.CANDLEDOWN));this.drawCandlesHighPerformance(panel,colorEven,"transparent",Q9U.D1W(STXChart.CLOSEEVEN,STXChart.CANDLEDOWN));this.drawCandlesHighPerformance(panel,this.containerColor,colorUp,Q9U.g1W(STXChart.CLOSEUP,STXChart.CANDLEUP));this.drawCandlesHighPerformance(panel,this.containerColor,colorDown,Q9U.n1W(STXChart.CLOSEDOWN,STXChart.CANDLEUP));this.drawCandlesHighPerformance(panel,this.containerColor,colorEven,Q9U.Z1W(STXChart.CLOSEEVEN,STXChart.CANDLEUP));this.chart.baseLegendColors.push(colorUp);this.chart.baseLegendColors.push(colorDown);}
this.endClip();}
else if(Q9U.s1W(chartType,"candle")){this.startClip(panel.name);var coloredShadowUp=this.getCanvasColor("stx_candle_shadow_up"),coloredShadowDown=this.getCanvasColor((j5n+v0p+M2n+S5n+W0p+n5n+G7p+g4p+Z8p+c1n+x2n+G7p+U3p)),coloredShadow=(Q9U.i1W(coloredShadowUp,coloredShadowDown));if(!colorFunction&&coloredShadow){var stxCandleShadow=this.getCanvasColor("stx_candle_shadow"),stxCandleUpColor=this.getCanvasColor("stx_candle_up"),stxCandleDownColor=this.getCanvasColor((g4p+C1p+G7p+e5n+c1n+S6n+q3p+z1p+e5p)),stxCandleUp=this.canvasStyle("stx_candle_up"),stxCandleDown=this.canvasStyle((k9p+e5n+c1n+O5p+W0p+E8n+L0p+e5p));colorFunction=function(stx,quote,mode){if(Q9U.a1W(mode,"shadow")){if(coloredShadow){if(Q9U.I1W(quote.Close,quote.Open))return coloredShadowUp;else if(Q9U.r1W(quote.Close,quote.Open))return coloredShadowDown;}
return stxCandleShadow;}
else if(Q9U.A1W(mode,"solid")){if(Q9U.y1W(quote.Close,quote.Open))return stxCandleUpColor;else if(Q9U.c1W(quote.Close,quote.Open))return stxCandleDownColor;else if(Q9U.B1W(quote.Close,quote.Open))return stxCandleShadow;}
else if(Q9U.l5W(mode,"outline")){var styleArray1;if(Q9U.Y5W(quote.Close,quote.Open))styleArray1=stxCandleUp;else if(Q9U.x5W(quote.Close,quote.Open))styleArray1=stxCandleDown;else return null;var borderColor=styleArray1["border-left-color"];if(!borderColor)borderColor=styleArray1.borderLeftColor;return borderColor;}
return null;}
;}
if(colorFunction){if(!this.noWicksOnCandles[this.layout.aggregationType])this.drawShadows(panel,colorFunction);this.drawCandles(panel,colorFunction,false);if(!noBorders)this.drawCandles(panel,colorFunction,true);}
else{if(!this.noWicksOnCandles[this.layout.aggregationType])this.drawShadowsHighPerformance(panel,"stx_candle_shadow");var styleArray=this.canvasStyle("stx_candle_up"),borderColor=styleArray["border-left-color"];if(!borderColor)borderColor=styleArray.borderLeftColor;if(noBorders)borderColor=null;this.drawCandlesHighPerformance(panel,this.getCanvasColor("stx_candle_up"),borderColor,STXChart.CANDLEUP);this.chart.baseLegendColors.push(styleArray.color);styleArray=this.canvasStyle("stx_candle_down");borderColor=styleArray["border-left-color"];if(!borderColor)borderColor=styleArray.borderLeftColor;if(noBorders)borderColor=null;this.drawCandlesHighPerformance(panel,this.getCanvasColor("stx_candle_down"),borderColor,STXChart.CANDLEDOWN);this.chart.baseLegendColors.push(styleArray.color);}
this.endClip();}
else if(Q9U.K5W(chartType,"baseline_delta")){this.startClip(panel.name);this.setStyle("stx_baseline_trace","opacity",0);this.drawLineChart(panel,(j5n+k7X+y5p+W0p+c6n+a1n));var baseline=chart.baseline.actualLevel;if(Q9U.C5W(baseline,null)){baseline=this.pixelFromPriceTransform(baseline,chart.panel);var styles={"over":"stx_baseline_up","under":"stx_baseline_down"}
;for(var s in styles){var parameters={panelName:"chart",band:"Close",threshold:chart.baseline.actualLevel,color:this.getCanvasColor(styles[s]),direction:(Q9U.W5W(s,"over")?1:-1),edgeHighlight:this.getCanvasColor(styles[s]),edgeParameters:{pattern:"solid",lineWidth:parseInt(this.canvasStyle(styles[s]).width,10)+0.1,opacity:1}
}
,color=parameters.color;if(color&&Q9U.v5W(color,"transparent")){var gradient=chart.context.createLinearGradient(0,(Q9U.M5W(s,"over")?0:Q9U.u5W(2,baseline)),0,baseline);gradient.addColorStop(0,STX.hexToRgba(color,60));gradient.addColorStop(1,STX.hexToRgba(color,10));parameters.color=gradient;parameters.opacity=1;}
STX.Studies.preparePeakValleyFill(this,chart.dataSegment,parameters);this.chart.baseLegendColors.push(color);}
this.plotLine(0,1,baseline,baseline,this.containerColor,"line",chart.context,true,{pattern:"solid",lineWidth:(V0p+k3p+V0p),opacity:1}
);this.plotLine(0,1,baseline,baseline,this.getCanvasColor("stx_baseline"),"line",chart.context,true,{pattern:"dotted",lineWidth:"2.1",opacity:0.5}
);if(Q9U.N5W(this.chart.baseline.userLevel,false)){this.controls.baselineHandle.style.top=Q9U.b5W(baseline,parseInt(getComputedStyle(this.controls.baselineHandle).height,10)/2,(d2p));this.controls.baselineHandle.style.left=Q9U.I5W(this.chart.right,parseInt(getComputedStyle(this.controls.baselineHandle).width,10),"px");this.controls.baselineHandle.style.display="block";}
}
this.endClip();}
else if(Q9U.h5W(chartType,"scatterplot")){this.startClip(panel.name);this.scatter(panel);this.endClip();}
else{this.chart.baseLegendColors=null;}
this.runAppend("displayChart",arguments);}
;STXChart.prototype.calculateATR=function(chart,period){if(!period)period=20;var total=0;for(var i=1;Q9U.X5W(i,chart.dataSet.length);i++){var q=chart.dataSet[i],previousClose=chart.dataSet[Q9U.T5W(i,1)].Close,trueRange=Math.max(Q9U.J5W(q.High,q.Low),Math.abs(Q9U.U7A(q.High,previousClose)),Math.abs(Q9U.S7A(q.Low,previousClose)));total+=trueRange;if(Q9U.G7A(i,period))total-=chart.dataSet[Q9U.V7A(i,period)].trueRange;q.trueRange=trueRange;q.atr=Q9U.R7A(total,period);}
}
;STXChart.prototype.currentQuote=function(){var quote=null;if(!this.chart.dataSet)return null;for(var i=Q9U.D7A(this.chart.dataSet.length,1);Q9U.g7A(i,0);i--)if(this.chart.dataSet[i])return this.chart.dataSet[i];return null;}
;STXChart.prototype.correctIfOffEdge=function(theChart){var J5n="Edg",y8n="ectIf",t5n="or";if(this.runPrepend((e5n+t5n+o4p+y8n+Y6n+J8p+J8p+J5n+n5n),arguments))return ;for(var chartName in this.charts){var chart=this.charts[chartName],leftPad=Math.round(Q9U.n7A(chart.maxTicks,3));if(Q9U.Z7A(leftPad,chart.dataSet.length))leftPad=chart.dataSet.length;if(chart.allowScrollPast){var rightPad=Q9U.s7A(chart.maxTicks,leftPad);if(Q9U.i7A(chart.maxTicks-rightPad,chart.dataSet.length)){rightPad=Q9U.a7A(chart.maxTicks,chart.dataSet.length);}
if(Q9U.I7A(chart.scroll-rightPad,chart.dataSet.length)){chart.scroll=chart.dataSet.length+rightPad;}
if(Q9U.r7A(chart.scroll,leftPad)){chart.scroll=leftPad;this.micropixels=-this.layout.candleWidth/2;}
}
else{if(Q9U.A7A(chart.scroll,leftPad)){chart.scroll=leftPad;}
if(Q9U.y7A(chart.scroll,chart.dataSet.length)){chart.scroll=chart.dataSet.length;}
}
}
this.runAppend("correctIfOffEdge",arguments);}
;STXChart.prototype.createDataSegment=function(theChart){var Q5p="ent",A1n="taSegm",e1n="teD",i0p="crea";if(this.runPrepend((i0p+e1n+c1n+A1n+Q5p),arguments))return ;for(var chartName in this.charts){var chart=this.charts[chartName];if(theChart)chart=theChart;chart.baseline.actualLevel=chart.baseline.userLevel?chart.baseline.userLevel:chart.baseline.defaultLevel;chart.dataSegment=[];var position=Q9U.c7A(chart.dataSet.length,chart.scroll,1);for(var i=-1;Q9U.U9A(i,chart.scroll)&&Q9U.S9A(i,chart.maxTicks);i++){position++;if(i==-1&&!chart.baseline.includeInDataSegment)continue;if(Q9U.G9A(position,chart.dataSet.length)&&Q9U.V9A(position,0)){if(chart.dataSet[position].candleWidth){chart.dataSet[position].candleWidth=null;chart.dataSet[position].leftOffset=null;}
chart.dataSegment.push(chart.dataSet[position]);if(Q9U.R9A(chart.baseline.actualLevel,null)&&Q9U.D9A(i,0))chart.baseline.actualLevel=chart.dataSet[position].iqPrevClose;}
else if(Q9U.g9A(position,0)){chart.dataSegment.push(null);}
}
if(Q9U.n9A(this.layout.chartType,"volume_candle")){var totalVolume=0;for(var v=0;Q9U.Z9A(v,chart.dataSegment.length);v++){if(chart.dataSegment[v])totalVolume+=chart.dataSegment[v].Volume;}
var accumOffset=0;for(var w=0;Q9U.s9A(w,chart.dataSegment.length);w++){if(chart.dataSegment[w]){if(chart.dataSegment[w].Volume){var workingWidth=chart.width;if(Q9U.i9A(chart.scroll,chart.maxTicks))workingWidth-=this.preferences.whitespace;chart.dataSegment[w].candleWidth=Q9U.a9A(workingWidth,chart.dataSegment[w].Volume,totalVolume);chart.dataSegment[w].leftOffset=accumOffset+Q9U.F9A(chart.dataSegment[w].candleWidth,2);accumOffset+=chart.dataSegment[w].candleWidth;}
else{chart.dataSegment[w].candleWidth=this.layout.candleWidth;chart.dataSegment[w].leftOffset=accumOffset+Q9U.h9A(this.layout.candleWidth,2);accumOffset+=this.layout.candleWidth;}
}
else{accumOffset+=this.layout.candleWidth;}
}
}
if(theChart)break;}
this.runAppend("createDataSegment",arguments);}
;STXChart.prototype.leftTick=function(){return Q9U.X9A(this.chart.dataSet.length,this.chart.scroll);}
;STXChart.prototype.getStartDateOffset=function(){for(var ds=0;Q9U.T9A(ds,this.chart.dataSegment.length);ds++){if(this.chart.dataSegment[ds]){return ds;}
}
return 0;}
;STXChart.prototype.setStartDate=function(dt){for(var i=0;Q9U.J9A(i,this.chart.dataSet.length);i++){var bar=this.chart.dataSet[i];if(Q9U.U3A(bar.DT.getTime(),dt.getTime())){this.chart.scroll=Q9U.S3A(this.chart.dataSet.length,i);this.draw();return ;}
}
}
;STXChart.prototype.updateListeners=function(event){for(var i in this.plugins){var plugin=this.plugins[i];if(plugin.display&&plugin.listener)plugin.listener(this,event);}
}
;STXChart.prototype.clearPixelCache=function(){for(var x in this.panels){var panel=this.panels[x];panel.cacheHigh=null;panel.cacheLow=null;panel.cacheLeft=1000000;panel.cacheRight=-1;}
for(var chartName in this.charts){var chart=this.charts[chartName];if(!chart.dataSet)continue;for(var i=0;Q9U.G3A(i,chart.dataSet.length);i++){chart.dataSet[i].cache={}
;}
}
}
;STXChart.prototype.createYAxisLabel=function(panel,txt,y,backgroundColor,color,ctx,yAxis){var r5n="ft";if(Q9U.V3A(panel.yAxis.drawPriceLabels,false))return ;var yax=yAxis?yAxis:panel.yAxis,context=ctx?ctx:this.chart.context,margin=3,height=this.getCanvasFontSize("stx_yaxis")+Q9U.R3A(margin,2);this.canvasFont("stx_yaxis",context);var drawBorders=yax.displayBorder;if(Q9U.D3A(this.axisBorders,false))drawBorders=false;if(Q9U.g3A(this.axisBorders,true))drawBorders=true;var tickWidth=drawBorders?3:0,width;try{width=context.measureText(txt).width+tickWidth+Q9U.n3A(margin,2);}
catch(e){width=yax.width;}
var x=Q9U.Z3A(yax.left,margin,3),textx=x+margin+tickWidth,radius=3,position=(Q9U.P3A(yax.position,null)?panel.chart.yAxis.position:yax.position);if(Q9U.p3A(position,(Q3p+r5n))){x=yax.left+yax.width+margin-3;width=width*-1;textx=x;radius=-3;context.textAlign="right";}
if(Q9U.Q3A(y+(height/2),yax.bottom))y=Q9U.F3A(yax.bottom,(height/2));if(Q9U.h3A(y-(height/2),yax.top))y=yax.top+(Q9U.X3A(height,2));context.fillStyle=backgroundColor;if(typeof (STX[this.yaxisLabelStyle])=='undefined'){this.yaxisLabelStyle="roundRectArrow";}
var yaxisLabelStyle=this.yaxisLabelStyle;if(yax.yaxisLabelStyle)yaxisLabelStyle=yax.yaxisLabelStyle;STX[yaxisLabelStyle](context,x,Q9U.T3A(y,(height/2)),width,height,radius,true,false);context.textBaseline="middle";context.fillStyle=color?color:STX.chooseForegroundColor(backgroundColor);if(Q9U.J3A(context.fillStyle,backgroundColor)){if(Q9U.U4A(backgroundColor.toUpperCase(),"#FFFFFF"))context.fillStyle="#000000";else context.fillStyle="#FFFFFF";}
context.fillText(txt,textx,y+1);context.textAlign="left";}
;STXChart.prototype.createXAxisLabel=function(panel,txt,x,backgroundColor,color,pointed){var context=this.chart.context,margin=2,fontstyle="stx-float-date",height=this.getCanvasFontSize(fontstyle)+Q9U.S4A(margin,2);this.canvasFont(fontstyle,context);var width;try{width=context.measureText(txt).width+Q9U.G4A(margin,2);}
catch(e){width=0;}
var y=panel.top+panel.height-height;if(Q9U.V4A(x+(width/2),panel.left)||Q9U.R4A(x-(width/2),panel.right))return ;if(!pointed){if(Q9U.D4A(x+(width/2),panel.right))x=Q9U.g4A(panel.right,(width/2));if(Q9U.n4A(x-(width/2),panel.left))x=panel.left+(Q9U.Z4A(width,2));}
context.fillStyle=backgroundColor;STX.roundRect(context,Q9U.s4A(x,(width/2)),y,width,height,3,true,false);if(pointed){var arrowHeight=Q9U.i4A(panel.bottom,panel.yAxis.bottom,height);context.beginPath();context.moveTo(Q9U.Q4A(x,arrowHeight),y);context.lineTo(x,Q9U.F4A(y,arrowHeight));context.lineTo(x+arrowHeight,y);context.closePath();context.fill();}
context.textBaseline=(I0n);context.fillStyle=color?color:STX.chooseForegroundColor(backgroundColor);if(Q9U.h4A(context.fillStyle,backgroundColor)){if(Q9U.X4A(backgroundColor.toUpperCase(),"#FFFFFF"))context.fillStyle="#000000";else context.fillStyle="#FFFFFF";}
context.fillText(txt,Q9U.T4A(x,width/2,margin),y+margin);}
;STXChart.prototype.drawCurrentHR=function(){var m6n="_u",Z3p="nt_",Z8n="x_c";if(this.runPrepend("drawCurrentHR",arguments))return ;var backgroundColor,color;for(var chartName in this.charts){var chart=this.charts[chartName],panel=chart.panel,yAxis=panel.yAxis;if(Q9U.f4A(yAxis.drawCurrentPriceLabel,false))continue;if(chart.customChart&&Q9U.j0A(chart.customChart.chartType,"none"))continue;var whichSet=yAxis.whichSet;if(!whichSet)whichSet="dataSet";var l=chart[whichSet].length;if(Q9U.o0A(whichSet,"dataSegment")){while(Q9U.t0A(l,(chart.width-this.micropixels+(this.layout.candleWidth)/2+1)/this.layout.candleWidth))l--;}
if(l){var quote=chart[whichSet][Q9U.O0A(l,1)],prevClose=quote.Close,currentClose=quote.Close;if(Q9U.L0A(chart.dataSet.length,2)){var quote2=chart[whichSet][Q9U.k0A(l,2)];prevClose=quote2.Close;}
if(Q9U.w0A(currentClose,prevClose)){backgroundColor=this.canvasStyle("stx_current_hr_down").backgroundColor;color=this.canvasStyle("stx_current_hr_down").color;}
else{backgroundColor=this.canvasStyle((g4p+E3p+Z8n+J6n+D8p+Z3p+Z8p+o4p+m6n+P4p)).backgroundColor;color=this.canvasStyle("stx_current_hr_up").color;}
if(quote.transform)quote=quote.transform;var txt,labelDecimalPlaces=Math.max(panel.yAxis.printDecimalPlaces,panel.chart.decimalPlaces);if(yAxis.maxDecimalPlaces||Q9U.e0A(yAxis.maxDecimalPlaces,0))labelDecimalPlaces=Math.min(labelDecimalPlaces,yAxis.maxDecimalPlaces);if(yAxis.priceFormatter){txt=yAxis.priceFormatter(this,panel,quote.Close,labelDecimalPlaces);}
else{txt=this.formatYAxisPrice(quote.Close,panel,labelDecimalPlaces);}
var y=this.pixelFromPrice(quote.Close,panel);this.createYAxisLabel(panel,txt,y,backgroundColor,color);}
}
this.runAppend("drawCurrentHR",arguments);}
;STXChart.prototype.getDefaultColor=function(){var T1n="FFF",l4p="FF",x8p="00",n4p="000",I6n=((0x246,0x10C)<=39.30E1?(0x141,0.65):93.2E1<=(68,47.40E1)?20000:(0xFF,0x1A4)),p5p="ans",E6p="tr";this.defaultColor=u9p;var bgColor=G8p,div=this.chart.container;while(!bgColor||STX.isTransparent(bgColor)){var cStyle=getComputedStyle(div);if(!cStyle)return ;bgColor=cStyle.backgroundColor;if(STX.isTransparent(bgColor))bgColor=y9p;div=div.parentNode;if(!div||!div.tagName)break;}
if(bgColor){if(Q9U.E0A(bgColor,(E6p+p5p+P4p+c1n+D8p+S0p+E3p)))bgColor=H2p;this.containerColor=bgColor;if(!STX.isTransparent(bgColor)){var hsv=STX.hsv(bgColor),v=hsv[Q9U.M0n];if(Q9U.P0A(v,I6n))this.defaultColor=u9p;else this.defaultColor=H2p;}
else{this.defaultColor=(c0p+d4p+n4p+x8p);}
}
else{this.containerColor=(c0p+j1n+l4p+T1n);}
}
;STXChart.prototype.startAsyncAction=function(){if(!this.pendingAsyncs)this.pendingAsyncs=[];this.pendingAsyncs.push(L8p);}
;STXChart.prototype.registerChartDrawnCallback=function(fc){if(!this.asyncCallbacks)this.asyncCallbacks=[];this.asyncCallbacks.push(fc);return {fc:fc}
;}
;STXChart.prototype.unregisterChartDrawnCallback=function(obj){for(var i=0;Q9U.p0A(i,this.asyncCallbacks.length);i++){if(Q9U.Q0A(this.asyncCallbacks[i],obj.fc)){this.asyncCallbacks.splice(i,1);return ;}
}
}
;STXChart.prototype.makeAsyncCallbacks=function(){if(!this.asyncCallbacks)return ;if(!this.pendingAsyncs||!this.pendingAsyncs.length){for(var i=0;Q9U.F0A(i,this.asyncCallbacks.length);i++){(this.asyncCallbacks[i])();}
}
}
;STXChart.prototype.completeAsyncAction=function(){this.pendingAsyncs.pop();this.makeAsyncCallbacks();}
;STXChart.prototype.draw=function(){this.debug();if(!this.chart.canvas)return ;if(!this.chart.dataSet)return ;if(!this.chart.canvasHeight)return ;this.offset=Q9U.h0A(this.layout.candleWidth,this.candleWidthPercent,2);STX.clearCanvas(this.chart.canvas,this);if(this.runPrepend("draw",arguments))return ;if(!this.xaxisHeight){this.xaxisHeight=this.getCanvasFontSize("stx_xaxis")+4;if(this.chart.xAxis.displayBorder||this.axisBorders)this.xaxisHeight+=3;}
this.getDefaultColor();this.vectorsShowing=false;this.drawPanels();this.yAxisLabels=[];var i,chart,chartName,plugin;for(chartName in this.charts){chart=this.charts[chartName];if(Q9U.m0A(chart.scroll,chart.lockScroll))chart.lockScroll=false;this.correctIfOffEdge();this.createDataSegment();var axisRepresentation=this.createXAxis(chart);this.initializeDisplay(chart);this.rendererAction(chart,"calculate");this.renderYAxis(chart);this.drawXAxis(chart,axisRepresentation);chart.tmpWidth=Math.floor(Q9U.d0A(this.layout.candleWidth,this.candleWidthPercent));if(Q9U.f0A(chart.tmpWidth%2,0)){chart.tmpWidth+=1;if(Q9U.j8A(chart.tmpWidth,this.layout.candleWidth))chart.tmpWidth-=2;}
if(Q9U.o8A(chart.tmpWidth,0.5))chart.tmpWidth=0.5;for(i in this.plugins){plugin=this.plugins[i];if(plugin.display){if(plugin.drawUnder)plugin.drawUnder(this,chart);}
}
this.rendererAction(chart,"underlay");STX.Studies.displayStudies(this,chart,true);this.displayChart(chart);STX.Studies.displayStudies(this,chart,false);this.rendererAction(chart,"overlay");}
for(chartName in this.charts){chart=this.charts[chartName];for(i in this.plugins){plugin=this.plugins[i];if(plugin.display){if(plugin.drawOver)plugin.drawOver(this,chart);}
}
}
for(var panel in this.panels){if(!this.panels[panel].hidden)this.plotYAxisText(this.panels[panel]);}
for(var yLbl=0;Q9U.t8A(yLbl,this.yAxisLabels.length);yLbl++){this.createYAxisLabel.apply(this,this.yAxisLabels[yLbl].args);}
this.createCrosshairs();this.drawVectors();this.drawCurrentHR();this.displayInitialized=true;if(this.controls.home){if(Q9U.O8A(this.chart.scroll-1,Math.ceil(this.chart.width/this.layout.candleWidth))){this.controls.home.style.display="block";}
else{this.controls.home.style.display="none";}
}
this.positionMarkers();for(chartName in this.charts){chart=this.charts[chartName];if(this.quoteDriver)this.quoteDriver.checkLoadMore(chart);}
this.runAppend("draw",arguments);this.makeAsyncCallbacks();}
;STXChart.prototype.adjustBackingStore=function(canvas,context){this.devicePixelRatio=window.devicePixelRatio||1;if(Q9U.L8A(this.devicePixelRatio,1.0))this.devicePixelRatio=1.0;backingStoreRatio=context.webkitBackingStorePixelRatio||context.mozBackingStorePixelRatio||context.msBackingStorePixelRatio||context.oBackingStorePixelRatio||context.backingStorePixelRatio||1;var ratio=Q9U.k8A(this.devicePixelRatio,backingStoreRatio);if(!STX.isAndroid||STX.is_chrome){var oldWidth=canvas.width,oldHeight=canvas.height;canvas.width=Q9U.w8A(oldWidth,ratio);canvas.height=Q9U.e8A(oldHeight,ratio);canvas.style.width=oldWidth+'px';canvas.style.height=oldHeight+'px';context.scale(ratio,ratio);}
}
;STXChart.prototype.resizeCanvas=function(){if(!this.chart.panel)this.chart.panel=this.panels.chart;var canvas=this.chart.canvas,context=this.chart.context;if(canvas&&context){this.chart.tempCanvas.height=canvas.height=this.chart.container.clientHeight;this.chart.tempCanvas.width=canvas.width=this.chart.container.clientWidth;this.adjustBackingStore(canvas,context);this.adjustBackingStore(this.chart.tempCanvas,this.chart.tempCanvas.context);this.floatCanvas.height=this.chart.container.clientHeight;this.floatCanvas.width=this.chart.container.clientWidth;this.adjustBackingStore(this.floatCanvas,this.floatCanvas.context);}
var rect=this.container.getBoundingClientRect();this.top=rect.top;this.left=rect.left;this.canvasWidth=this.chart.canvasWidth=this.chart.container.clientWidth;this.right=this.left+this.canvasWidth;this.height=this.chart.container.clientHeight;this.width=Q9U.E8A(this.right,this.left);this.bottom=this.top+this.height;this.calculateYAxisPositions();this.chart.canvasRight=this.right;this.chart.canvasHeight=this.height;var candleWidth=this.layout.candleWidth;if(typeof (candleWidth)=="undefined")candleWidth=8;for(var chartName in this.charts){var chart=this.charts[chartName];if(this.layout.span){this.setCandleWidth(this.getSpanCandleWidth(this.layout.span),chart);}
else{this.setCandleWidth(candleWidth,chart);if(Q9U.P8A(chart.scroll,chart.width/candleWidth)){chart.scroll=Math.floor(Q9U.p8A(chart.width,candleWidth));var wsInTicks=Math.round(Q9U.Q8A(this.preferences.whitespace,this.layout.candleWidth));chart.scroll-=wsInTicks;}
}
var idealNumberOfTicks=10,appxLabelWidth;try{appxLabelWidth=Q9U.F8A(context.measureText((V0p+d4p+G7X+d4p+d4p)).width,2);}
catch(e){appxLabelWidth=100;}
while(Q9U.h8A(idealNumberOfTicks,1)){if(Q9U.X8A(this.chart.width/appxLabelWidth,idealNumberOfTicks))break;idealNumberOfTicks/=1.5;}
chart.xAxis.autoComputedTickSizePixels=Math.round(Q9U.T8A(this.chart.width,idealNumberOfTicks));if(Q9U.J8A(chart.xAxis.autoComputedTickSizePixels,1))chart.xAxis.autoComputedTickSizePixels=1;}
}
;STXChart.prototype.setCandleWidth=function(newCandleWidth,chart){if(!chart)chart=this.chart;if(Q9U.U6A(newCandleWidth,this.minimumCandleWidth))newCandleWidth=this.minimumCandleWidth;this.layout.candleWidth=newCandleWidth;chart.maxTicks=Math.ceil(Q9U.S6A(this.chart.width,newCandleWidth)+0.5);}
;STXChart.prototype.resizeChart=function(maintainScroll){var S9p="resizeChart";if(this.runPrepend(S9p,arguments))return ;if(Q9U.G6A(maintainScroll,U5p))maintainScroll=L8p;if(maintainScroll)this.preAdjustScroll();var previousHeight=this.chart.canvasHeight;this.resizeCanvas();if(maintainScroll)this.postAdjustScroll();this.adjustPanelPositions();if(this.displayInitialized){this.draw();}
else if(Q9U.V6A(this.chart.canvasHeight,Q9U.P0n)&&Q9U.R6A(previousHeight,Q9U.P0n)){this.draw();}
this.runAppend(S9p,arguments);}
;STXChart.prototype.newChart=function(symbol,masterData,chart,cb,params){var n1p="Feed",C7X="pecified",w5n="ata",f6n="rD",X2n="aste",A8n=((92,47.40E1)<=9.200E2?(79.2E1,"N"):(118,53)),K9p="arni",O3p="W",P5p='object';if(!chart)chart=this.chart;if(!params)params={}
;if(params.periodicity){if(params.periodicity.interval)this.layout.interval=params.periodicity.interval;if(params.periodicity.period)this.layout.periodicity=params.periodicity.period;this.layout.timeUnit=params.periodicity.timeUnit;}
var prevSymbol=chart.symbol,prevSymbolObject=STX.clone(chart.symbolObject),prevMarket=chart.market;if(!symbol){chart.symbol=G8p;chart.symbolObject={symbol:G8p}
;}
else if(typeof symbol==P5p){chart.symbol=symbol.symbol;chart.symbolObject=symbol;}
else{chart.symbol=symbol;chart.symbolObject.symbol=symbol;}
if(!masterData&&this.quoteDriver){var callback=function(err){if(err){chart.symbol=prevSymbol;chart.symbolObject=prevSymbolObject;chart.market=prevMarket;}
if(cb)cb(err);}
;if(params.span&&params.span.multiplier&&params.span.base){this.chart.masterData=G8p;this.displayInitialized=U5p;this.setSpan({maintainPeriodicity:L8p,multiplier:params.span.multiplier,span:params.span.base,symbol:chart.symbol}
,callback);}
else{var self=this;this.quoteDriver.newChart({symbol:chart.symbol,symbolObject:chart.symbolObject,chart:chart,initializeChart:L8p}
,function(){self.adjustPanelPositions();self.quoteDriver.updateSubscriptions();if(params.stretchToFillScreen){self.fillScreen();}
callback.apply(self,arguments);}
);}
}
else{if(!masterData){console.log((O3p+K9p+S0p+K6p+e1p+A8n+L0p+b5n+a0p+X2n+f6n+w5n+b5n+g4p+C7X+b5n+c1n+O5p+b5n+S0p+L0p+b5n+Y0n+P3p+L0p+y3p+n1p+b5n+e5n+p9p+J8p+r8p+K6p+P3p+o4p+F7p));}
if(!chart.symbol)chart.symbol=w3p;this.setMasterData(masterData,chart);this.createDataSet();this.initializeChart();if(params.span&&params.span.multiplier&&params.span.base){this.setSpan({maintainPeriodicity:L8p,multiplier:params.span.multiplier,span:params.span.base}
);}
else if(params.stretchToFillScreen){this.fillScreen();}
else{this.draw();}
this.adjustPanelPositions();if(cb)cb();}
}
;STXChart.prototype.fillScreen=function(){var candleWidth=this.layout.candleWidth,chartWidth=Q9U.D6A(this.chart.width,this.preferences.whitespace),count=this.chart.dataSet.length;if(Q9U.g6A(count*candleWidth,chartWidth)){this.draw();return ;}
var newCandleWidth=Q9U.n6A(chartWidth,count);this.setCandleWidth(newCandleWidth,this.chart);this.home({maintainWhitespace:true}
);}
;STXChart.prototype.setMasterData=function(masterData,chart){var X0p='= ',x7X='ex',u5n='nd',h9p='ri',f3p='vi',e3p='erver',v7p='ata',A5p='ur',Q2p='() ',m9p='loa',E9p=((0x1F3,99.)>(5.78E2,12.84E2)?(144,"l"):(1.408E3,0x1ED)<=(48.,101.60E1)?(0x4C,'F'):(2.,93.)),D7X='arse',N3p='U',k8n='. ',S3p='umber',F8p='ng',l5n='C',m8p='terDa',E7X='tM',r6p='jec',d2n='ta',h7X='aste',R7X='si',V9p='M',C2n=' : ',D2p='rDa',V6p='Ma';if(!chart)chart=this.chart;if(this.marketFactory){var marketDef=(this.marketFactory)(chart.symbolObject,this);this.setMarket(marketDef,chart);}
chart.masterData=masterData;if(Q9U.Z6A(chart.name,"chart"))this.masterData=masterData;var i;for(i=0;masterData&&Q9U.s6A(i,masterData.length);i++){if(this.transformMasterDataQuote)masterData[i]=this.transformMasterDataQuote(masterData[i]);var quotes=masterData[i];if(quotes.DT){quotes.DT=new Date(quotes.DT);quotes.Date=STX.yyyymmddhhmmssmmm(quotes.DT);}
else if(quotes.Date)quotes.DT=STX.strToDateTime(quotes.Date);else console.log((X6p+l3p+V6p+X7p+l3p+s6p+D2p+l3p+S1p+C2n+V9p+L0n+R7X+t5p+w7X+m6p+k5n+T3p+m6p+S1p+t5p+A2p+m6p+k5n+R9p+m6p+D5p+t5p+m6p+y1p+h7X+D2p+d2n+m6p+D5p+D1p+r6p+l3p));if(quotes.Volume&&typeof quotes.Volume!=="number")quotes.Volume=parseInt(quotes.Volume,10);if(typeof quotes.Close=='number'){}
else{console.log((X7p+s6p+E7X+z8n+m8p+l3p+S1p+C2n+l5n+C5p+X7p+s6p+m6p+m5p+X7p+m6p+y1p+m5p+t0n+m5p+F8p+m6p+D5p+Z7p+m6p+t5p+D5p+l3p+m6p+S1p+m6p+t5p+S3p+k8n+N3p+X6p+m6p+o9p+D7X+E9p+m9p+l3p+Q2p+m5p+c6p+m6p+Z5n+D5p+A5p+m6p+A2p+v7p+m6p+X7p+e3p+m6p+o9p+Z7p+D5p+f3p+A2p+s6p+X7p+m6p+X7p+l3p+h9p+F8p+X7p+k8n+V9p+S1p+X7p+m8p+l3p+S1p+m6p+G3p+u5n+x7X+X0p)+i+' Value = '+quotes.Close);}
if(Q9U.i6A(quotes.High,null))delete  quotes.High;if(Q9U.a6A(quotes.Low,null))delete  quotes.Low;if(Q9U.I6A(quotes.Open,null))delete  quotes.Open;}
chart.decimalPlaces=this.callbacks.calculateTradingDecimalPlaces({stx:this,chart:chart,symbol:chart.symbolObject.symbol,symbolObject:chart.symbolObject}
);if(!STXChart.isDailyInterval(this.layout.interval))this.setDisplayDates(masterData);this.chart.roundit=Math.pow(10,chart.decimalPlaces);for(i in this.plugins){var plugin=this.plugins[i];if(plugin.display){if(plugin.setMasterData)plugin.setMasterData(this,chart);}
}
for(var s in this.chart.series){var series=this.chart.series[s];if(series.addSeriesData){series.addSeriesData(this);}
}
}
;STXChart.prototype.getSymbols=function(){var a=[],obj;for(var chartName in this.charts){var chart=this.charts[chartName];a.push({symbol:chart.symbol,symbolObject:chart.symbolObject,periodicity:this.layout.periodicity,interval:this.layout.interval,timeUnit:this.layout.timeUnit}
);for(var field in chart.series){var series=chart.series[field];if(!series.parameters.data||!series.parameters.data.useDefaultQuoteFeed)continue;obj={symbol:field,symbolObject:series.symbolObject,periodicity:this.layout.periodicity,interval:this.layout.interval,timeUnit:this.layout.timeUnit}
;if(!obj.symbolObject)obj.symbolObject={symbol:field}
;a.push(obj);}
}
for(var p in this.panels){if(this.panels[p].studyQuotes){for(var sq in stx.panels[p].studyQuotes){obj={symbol:sq,symbolObject:{symbol:sq}
,periodicity:this.layout.periodicity,interval:this.layout.interval,timeUnit:this.layout.timeUnit}
;a.push(obj);}
}
}
return a;}
;STXChart.prototype.setDisplayDate=function(quote){var dt=quote.DT,milli=Q9U.r6A(dt.getSeconds(),g5p)+dt.getMilliseconds(),newDT;if(this.dataZone){newDT=new timezoneJS.Date(dt.getFullYear(),dt.getMonth(),dt.getDate(),dt.getHours(),dt.getMinutes(),this.dataZone);dt=new Date(newDT.getTime()+milli);}
if(this.displayZone){newDT=new timezoneJS.Date(dt.getTime(),this.displayZone);dt=new Date(newDT.getFullYear(),newDT.getMonth(),newDT.getDate(),newDT.getHours(),newDT.getMinutes());dt=new Date(dt.getTime()+milli);}
quote.displayDate=dt;}
;STXChart.prototype.setDisplayDates=function(masterData){if(!masterData)return ;for(var i=0;Q9U.A6A(i,masterData.length);i++){var quote=masterData[i];if(quote.DT)this.setDisplayDate(quote);}
}
;STXChart.prototype.streamTrade=function(priceData,now,symbol,params){var chart=this.chart;if(!params)params={}
;if(params.chart)chart=params.chart;var price=null,bid=null,ask=null,volume=0;if(typeof priceData=="object"){price=priceData.last;bid=priceData.bid;ask=priceData.ask;volume=priceData.volume;now=new Date(now);}
else{price=arguments[0];volume=arguments[1];now=new Date(arguments[2]);symbol=arguments[3];}
var md=chart.masterData;if(!now){now=new Date();}
var quote;if(!md||!md.length||Q9U.y6A(this.layout.interval,"tick")){quote={Date:STX.yyyymmddhhmmssmmm(now),DT:now,Open:price,Close:price,High:price,Low:price,Volume:volume,Bid:bid,Ask:ask}
;this.appendMasterData([quote],chart,params);}
else{quote=STX.clone(md[Q9U.c6A(md.length,1)]);var market24=new STX.Market({}
),iter_parms={'begin':quote.DT,'interval':this.layout.interval,'periodicity':this.layout.periodicity,'timeUnit':this.layout.timeUnit,'inZone':this.dataZone,'outZone':this.dataZone}
,iter=market24.newIterator(iter_parms),next=iter.next();if(Q9U.B6A(now,next)){if(symbol){if(price||Q9U.l2A(price,0)){quote[symbol]=price;}
}
else{if(price||Q9U.Y2A(price,0)){quote.Close=price;if(Q9U.x2A(price,quote.High)||Q9U.K2A(quote.High,null))quote.High=price;if(Q9U.C2A(price,quote.Low)||Q9U.W2A(quote.Low,null))quote.Low=price;if(Q9U.v2A(quote.Open,null))quote.Open=price;}
if(volume)quote.Volume+=volume;if(bid||Q9U.M2A(bid,0))quote.Bid=bid;if(ask||Q9U.u2A(ask,0))quote.Ask=ask;}
var newParams=STX.clone(params);if(typeof quote.Adj_Close!="undefined"){quote.Adj_Close=quote.Close;}
this.appendMasterData([quote],chart,newParams);}
else{var gaps=[],iter2_parms={'begin':now,'interval':this.layout.interval,'periodicity':this.layout.periodicity,'timeUnit':this.layout.timeUnit,'inZone':this.dataZone,'outZone':this.dataZone}
,iter2=market24.newIterator(iter2_parms);iter2.next();now=iter2.previous();while(Q9U.N2A(next,now)&&this.streamParameters.fillGaps){var gap={Date:STX.yyyymmddhhmmssmmm(next),DT:next,Close:quote.Close,Open:quote.Close,High:quote.Close,Low:quote.Close,Volume:0,Bid:quote.Bid,Ask:quote.Ask}
;gaps.push(gap);next=iter.next();}
if(symbol){var c=this.currentQuote();quote={Date:STX.yyyymmddhhmmssmmm(next),DT:next,Open:null,Close:c.Close,High:null,Low:null,Volume:volume,Bid:c.Bid,Ask:c.Ask}
;quote[symbol]=price;}
else{quote={Date:STX.yyyymmddhhmmssmmm(next),DT:next,Open:price,Close:price,High:price,Low:price,Volume:volume,Bid:bid,Ask:ask}
;}
gaps.push(quote);this.appendMasterData(gaps,chart,params);}
}
}
;STXChart.prototype.appendMasterData=function(appendQuotes,chart,params){if(!params)params={}
;if(!chart)chart=this.chart;if(Q9U.b2A(appendQuotes.constructor,Object))appendQuotes=[appendQuotes];if(this.runPrepend("appendMasterData",[appendQuotes,chart,params]))return ;if(!appendQuotes||!appendQuotes.length)return ;var dt=appendQuotes[0].DT;if(!dt)dt=STX.strToDateTime(appendQuotes[0].Date);var masterData=chart.masterData,i;if(!masterData||!masterData.length){masterData=chart.masterData=STX.clone(appendQuotes);for(i=0;Q9U.z2A(i,masterData.length);i++){if(masterData[i].DT)masterData[i].Date=STX.yyyymmddhhmmssmmm(masterData[i].DT);else masterData[i].DT=STX.strToDateTime(masterData[i].Date);if(masterData[i].Volume&&typeof masterData[i].Volume!=="number")masterData[i].Volume=parseInt(masterData[i].Volume,10);if(!STXChart.isDailyInterval(this.layout.interval))this.setDisplayDate(masterData[i]);}
}
else{i=Q9U.H2A(masterData.length,1);while(Q9U.q2A(i,0)){var dt2=masterData[i].DT;if(!dt2)dt2=STX.strToDateTime(masterData[i].Date);if(Q9U.m2A(dt2.getTime(),dt.getTime())){var plusOne=0;if(Q9U.d2A(dt2.getTime(),dt.getTime()))plusOne=1;for(var j=0;Q9U.f2A(j,appendQuotes.length);j++){if(!plusOne){if(typeof masterData[i+j]!="undefined"){if(!appendQuotes[j].Volume&&masterData[i+j].Volume){appendQuotes[j].Volume=masterData[i+j].Volume;}
if(!params.allowReplaceOHL){if(masterData[i+j].Open){appendQuotes[j].Open=masterData[i+j].Open;}
if(Q9U.j1A(masterData[i+j].High,appendQuotes[j].High)){appendQuotes[j].High=masterData[i+j].High;}
if(masterData[i+j].Low&&Q9U.o1A(masterData[i+j].Low,appendQuotes[j].Low)){appendQuotes[j].Low=masterData[i+j].Low;}
}
}
for(var field in this.chart.series){if(typeof appendQuotes[j][field]=="undefined"&&typeof masterData[i+j]!="undefined")appendQuotes[j][field]=masterData[i+j][field];}
for(var p in this.panels){if(this.panels[p].studyQuotes){for(var sq in this.panels[p].studyQuotes){if(!this.panels[p].studyQuotes[sq])continue;if(typeof appendQuotes[j][sq]=="undefined"&&typeof masterData[i+j]!="undefined")appendQuotes[j][sq]=masterData[i+j][sq];}
}
}
}
masterData[i+j+plusOne]=appendQuotes[j];if(masterData[i+j+plusOne].DT)masterData[i+j+plusOne].Date=STX.yyyymmddhhmmssmmm(masterData[i+j+plusOne].DT);else masterData[i+j+plusOne].DT=STX.strToDateTime(masterData[i+j+plusOne].Date);if(masterData[i+j+plusOne].Volume&&typeof masterData[i+j+plusOne].Volume!=="number")masterData[i+j+plusOne].Volume=parseInt(masterData[i+j+plusOne].Volume,10);if(!STXChart.isDailyInterval(this.layout.interval))this.setDisplayDate(this.masterData[i+j+plusOne]);var dontAdvanceScroll=Q9U.t1A(chart.scroll,chart.maxTicks+1)||chart.lockScroll;if(dontAdvanceScroll&&plusOne){chart.lockScroll++;chart.scroll++;this.grabStartScrollX++;}
}
break;}
i--;}
for(i in this.plugins){var plugin=this.plugins[i];if(plugin.display){if(plugin.appendMasterData)plugin.appendMasterData(this,appendQuotes,chart);}
}
}
if(!this.masterData||!this.masterData.length)this.masterData=masterData;if(!params.noCreateDataSet){var sp=this.streamParameters;if(++sp.count>sp.maxTicks||params.bypassGovernor){clearTimeout(sp.timeout);this.createDataSet();this.draw();this.updateChartAccessories();sp.count=0;sp.timeout=-1;}
else{var self=this;if(sp.timeout==-1){sp.timeout=setTimeout(function(){self.createDataSet();self.draw();self.updateChartAccessories();self.streamParameters.count=0;self.streamParameters.timeout=-1;}
,sp.maxWait);}
}
}
this.runAppend("appendMasterData",arguments);}
;STXChart.prototype.displayAll=function(params,cb){var chart=this.chart;if(params&&params.chart)chart=params.chart;var self=this;function displayTheResults(){if(!chart.masterData.length)return ;var p=STX.clone(params);p.dtLeft=chart.masterData[0].DT;p.dtRight=chart.masterData[Q9U.O1A(chart.masterData.length,1)].DT;self.setRange(p);if(cb)cb();}
function loadAllTheData(){self.quoteDriver.loadAll(chart,displayTheResults);}
if(!this.quoteDriver){displayTheResults();return ;}
if(this.dontRoll&&Q9U.L1A(this.layout.interval,"month")){this.setPeriodicityV2(1,"month",loadAllTheData);}
else if(!STXChart.isDailyInterval(this.layout.interval)){this.setPeriodicityV2(1,"day",loadAllTheData);}
else{if(chart.moreAvailable){loadAllTheData();}
else{displayTheResults();}
}
}
;STXChart.prototype.setRange=function(params,cb){var N5n="co",s0p="ise",v6n="ill";if(STX.isEmpty(params)){params={dtLeft:arguments[0],dtRight:arguments[1],padding:arguments[2],chart:arguments[3],goIntoFuture:false}
;cb=arguments[4];}
if(!params.chart)params.chart=this.chart;if(typeof params.padding=="undefined"){params.padding=this.preferences.whitespace;}
var dontChangePeriodicity=false,chart=params.chart,lt=params.dtLeft,rt=new Date();if(params.dtRight)rt=params.dtRight;if(!lt){var iter=this.standardMarketIterator(rt,null,chart);lt=iter.previous(chart.maxTicks);if(!params.periodicity)dontChangePeriodicity=true;}
var self=this;function showTheRange(){if(!chart.dataSet||Q9U.k1A(chart.dataSet.length,0)){if(cb)cb();return ;}
var l=0,r=0;if(Q9U.w1A(lt.getTime(),chart.dataSet[0].DT.getTime())||params.goIntoPast){l=self.tickFromDate(lt,chart,null,true);}
else{l=0;}
if(Q9U.e1A(rt.getTime(),chart.dataSet[chart.dataSet.length-1].DT.getTime())||params.goIntoFuture){r=self.tickFromDate(rt,chart);}
else{r=Q9U.E1A(chart.dataSet.length,1);}
var ticks=Q9U.P1A(r,l,1);if(Q9U.b1A(ticks,1)){if(cb)cb();return ;}
self.setCandleWidth(Q9U.z1A((self.chart.width-params.padding),ticks),chart);chart.scroll=(Q9U.H1A(chart.dataSet.length,l,1));self.draw();self.changeOccurred("layout");if(cb)cb();}
var loadMoreCount=0;function loadTheRange(err){var X5p="io",t2p="pin",I5n=") ",M4p="ads",m2p="(): ",s2n="tRa",e6n="TXCh",B0n="S";if(err){if(cb)cb(err);return ;}
loadMoreCount++;if(Q9U.A1A(loadMoreCount,10)){console.log((B0n+e6n+e8n+E3p+k3p+g4p+n5n+s2n+S0p+N8n+m2p+R8n+L0p+L0p+b5n+a0p+G0n+B5p+b5n+W0p+L0p+M4p+Y1n+V0p+d4p+I5n+J8p+o4p+T9p+b5n+g4p+n5n+o4p+T7X+n5n+o4p+G2p+B0n+i8p+P4p+t2p+K6p+G2p+j1p+Z8p+r4p+O8p+b5n+P4p+n5n+o4p+X5p+S5n+r8p+e5n+r8p+E3p+B5p+b5n+W0p+L0p+K6p+w2n+k3p));showTheRange();return ;}
if(chart.moreAvailable&&Q9U.y1A(chart.masterData[0].DT,lt)){self.quoteDriver.checkLoadMore(chart,true,false,function(err){if(!err)loadTheRange();}
);}
else{showTheRange();}
}
function estimateMaxTicks(rtMS,ltMS,interval,period,dontRoll){var r6n="our",p6n="secon",U8n="il",ticks=0,ms=Q9U.c1A(rtMS,ltMS);if(STXChart.isDailyInterval(interval)){if((Q9U.B1A(interval,"month")||Q9U.l5A(interval,"week"))&&dontRoll){var days=(Q9U.Y5A(interval,"week"))?7:30;ticks=Q9U.x5A((ms/(STX.DAY*days)),period);}
else{ticks=Q9U.K5A((ms/STX.DAY),period);}
}
else{if(!isNaN(interval))ticks=Q9U.C5A((ms/(STX.MINUTE*interval)),period);else{if(Q9U.W5A(interval,(a0p+U8n+p4p+p6n+S5n)))ticks=Q9U.v5A(ms,period);else if(Q9U.M5A(interval,"second"))ticks=Q9U.u5A((ms/STX.SECOND),period);else if(Q9U.N5A(interval,(Z8p+r6n)))ticks=Q9U.b5A((ms/STX.HOUR),period);else ticks=Q9U.z5A((ms/STX.MINUTE),period);}
}
return Math.round(ticks);}
if(this.quoteDriver){var intervalToUse,periodToUse,timeUnitToUse;if(dontChangePeriodicity){intervalToUse=this.layout.interval;timeUnitToUse=this.layout.timeUnit;periodToUse=this.layout.period;}
else if(params.periodicity){intervalToUse=params.periodicity.interval;timeUnitToUse=params.periodicity.timeUnit;periodToUse=params.periodicity.period;}
else{if(!this.rangePeriodicityMap){this.rangePeriodicityMap=[];this.rangePeriodicityMap.push({range:STX.WEEK,periodicity:1,interval:5}
);this.rangePeriodicityMap.push({range:STX.MONTH,periodicity:1,interval:30}
);this.rangePeriodicityMap.push({range:Q9U.H5A(STX.MONTH,7),periodicity:1,interval:"day"}
);this.rangePeriodicityMap.push({range:STX.DECADE,periodicity:1,interval:(S5n+c1n+B5p)}
);this.rangePeriodicityMap.push({range:Q9U.q5A(STX.DECADE,10),periodicity:1,interval:"month"}
);this.rangePeriodicityMap.push({range:Number.MAX_VALUE,periodicity:12,interval:"month"}
);}
var periodicityMap=params.rangePeriodicityMap?params.rangePeriodicityMap:this.rangePeriodicityMap,rangeInMS=Q9U.m5A(rt.getTime(),lt.getTime()),entryToUse=null;for(var i=0;Q9U.d5A(i,periodicityMap.length);i++){var mapEntry=periodicityMap[i];if(Q9U.f5A(rangeInMS,mapEntry.range)){entryToUse=mapEntry;break;}
}
intervalToUse=entryToUse.interval;periodToUse=entryToUse.periodicity;timeUnitToUse=entryToUse.timeUnit;}
this.chart.scroll=this.chart.maxTicks=estimateMaxTicks(rt.getTime(),lt.getTime(),intervalToUse,periodToUse,this.dontRoll);this.layout.candleWidth=Q9U.j7m(this.chart.width,this.chart.maxTicks);var needDifferentData=Q9U.o7m(this.layout.timeUnit,timeUnitToUse)&&(Q9U.t7m(timeUnitToUse,"seconds")||Q9U.O7m(timeUnitToUse,(a0p+v6n+s0p+N5n+S0p+S5n+g4p)));if(!needDifferentData&&(Q9U.L7m(STXChart.isDailyInterval(this.layout.interval),STXChart.isDailyInterval(intervalToUse))))needDifferentData=true;else if(!STXChart.isDailyInterval(this.layout.interval)&&Q9U.k7m(this.layout.interval,intervalToUse))needDifferentData=true;if(!this.chart.masterData||needDifferentData){this.layout.interval=intervalToUse;this.layout.periodicity=periodToUse;this.layout.timeUnit=timeUnitToUse;if(!this.layout.timeUnit){if(STXChart.isDailyInterval(this.layout.interval))this.layout.timeUnit=null;else if(Q9U.w7m(this.layout.interval,"second"))this.layout.timeUnit="second";else this.layout.timeUnit="minute";}
var qparams={symbol:chart.symbol,symbolObject:chart.symbolObject,chart:chart}
;if(!this.displayInitialized)qparams.initializeChart=true;this.quoteDriver.newChart(qparams,loadTheRange);}
else{if(Q9U.e7m(this.layout.interval,intervalToUse)||Q9U.E7m(this.layout.periodicity,periodToUse)){this.layout.interval=intervalToUse;this.layout.periodicity=periodToUse;this.createDataSet();}
loadTheRange();}
}
else{showTheRange();}
}
;STXChart.prototype.setSpan=function(params,cb){var W1p=59,F6p=23,C9p='ytd',F7X="today",e4p="td",period=arguments[Q9U.P0n],interval=arguments[Q9U.s0n],padding=arguments[Q9U.M0n],chart=arguments[Q9U.n0n],useMarketTZ=arguments[Q9U.b0n];if(typeof params==z1n){period=params.period?params.period:(params.multiplier?params.multiplier:Q9U.s0n);interval=params.interval?params.interval:(params.span?params.span:params.period);padding=params.padding;chart=params.chart;useMarketTZ=params.useMarketTZ;}
else{params={period:period,interval:interval,padding:padding,chart:chart,useMarketTZ:useMarketTZ}
;cb=arguments[Q9U.p0n];}
if(!params.padding)params.padding=Q9U.P0n;if(!chart)chart=this.chart;interval=interval.toLowerCase();if(Q9U.P7m(interval,u5p)){this.displayAll(params,cb);return ;}
var iterInterval=interval;if(Q9U.p7m(interval,m7p)){iterInterval=d0n;period*=w2p;}
else if(Q9U.Q7m(interval,(B5p+e4p))){iterInterval=L2n;}
else if(Q9U.F7m(interval,F7X)){iterInterval=L2n;}
var parms_copy=STX.shallowClone(params);parms_copy.goIntoFuture=U5p;var iter_parms={'begin':new Date(),'interval':iterInterval,'periodicity':period,'inZone':this.dataZone,'outZone':this.dataZone}
,iter=chart.market.newIterator(iter_parms),leftDT=new Date();if(Q9U.h7m(interval,C9p)){leftDT.setMonth(Q9U.P0n);leftDT.setDate(Q9U.s0n);leftDT.setHours(Q9U.P0n);leftDT.setMinutes(Q9U.P0n);leftDT.setSeconds(Q9U.P0n);leftDT.setMilliseconds(Q9U.P0n);chart.lockScroll=chart.scroll;}
else if(Q9U.X7m(interval,F7X)){iter.next();leftDT=iter.previous();}
else{leftDT=iter.previous();}
parms_copy.dtLeft=leftDT;if(Q9U.T7m(interval,(l3p+D5p+A2p+S1p+Z5n))){parms_copy.goIntoFuture=L8p;parms_copy.dtRight=new Date(leftDT);var closeHour=iter.market.zclose_hour,closeMinute=iter.market.zclose_minute;parms_copy.dtRight.setHours(closeHour?closeHour:F6p);parms_copy.dtRight.setMinutes(closeHour?closeMinute:W1p);parms_copy.dtRight.setSeconds(Q9U.P0n);parms_copy.dtLeft.setHours(iter.market.zopen_hour);parms_copy.dtLeft.setMinutes(iter.market.zopen_minute);parms_copy.dtLeft.setSeconds(Q9U.P0n);}
if(parms_copy.maintainPeriodicity){parms_copy.periodicity={}
;parms_copy.periodicity.interval=this.layout.interval;parms_copy.periodicity.period=this.layout.periodicity;}
chart.lockScroll=U5p;this.setRange(parms_copy,function(err){var H1p="ytd";if(Q9U.J7m(interval,H1p)||Q9U.U9m(interval,F7X)){chart.lockScroll=chart.scroll;}
if(cb)cb(err);}
);}
;STXChart.prototype.getSpanCandleWidth=function(span){var arr=span.split(",");if(Q9U.S9m(arr.length,2))return ;var num=parseFloat(arr[0]),now=new Date(),prev=new Date();if(Q9U.G9m(arr[1],"year")){prev.setFullYear(Q9U.V9m(prev.getFullYear(),num));}
else if(Q9U.R9m(arr[1],"month")){prev.setMonth(Q9U.D9m(prev.getMonth(),num));}
else if(Q9U.g9m(arr[1],"day")){prev.setDate(Q9U.n9m(prev.getDate(),num));}
else if(Q9U.Z9m(arr[1],"week")){prev.setDate(Q9U.s9m(prev.getDate(),(7*num)));}
var diff=Q9U.i9m((now.getTime()-prev.getTime()),1000,60,60,24);diff=Q9U.I9m(diff,5,7);var candleWidth=Q9U.h9m(this.chart.width,diff);return candleWidth;}
;STXChart.prototype.setMaxTicks=function(ticks,params){if(!params)params={}
;ticks=Math.round(ticks);if(Q9U.X9m(ticks,Q9U.M0n))ticks=Q9U.M0n;var padding=params.padding;if(!padding)padding=Q9U.P0n;this.layout.candleWidth=Q9U.T9m((this.chart.width-padding),ticks);if(!this.layout.candleWidth)this.layout.candleWidth=Q9U.F0n;this.chart.maxTicks=Math.round(Q9U.J9m((this.chart.width/this.layout.candleWidth),0.499));if(params.padding||Q9U.U3m(params.padding,Q9U.P0n))this.chart.scroll=ticks+Q9U.s0n;}
;STXChart.prototype.construct=function(){this.stackPanel(r1n,r1n,Q9U.s0n);this.adjustPanelPositions();this.chart.panel=this.panels[this.chart.name];this.cx=Q9U.P0n;this.cy=Q9U.P0n;this.micropixels=Q9U.P0n;this.chart.panel.subholder.appendChild(this.controls.home);this.callbackListeners={}
;}
;STXChart.prototype.addEventListener=function(type,cb){if(!type)type=p8p;var arr=this.callbackListeners[type];if(!arr)this.callbackListeners[type]=arr=[];arr.push(cb);return {type:type,cb:cb}
;}
;STXChart.prototype.removeEventListener=function(obj,cb){if(typeof obj!="object"){obj={type:type,cb:cb}
;}
if(!obj.type)obj.type="*";var arr=this.callbackListeners[obj.type];if(!arr)return ;for(var i=0;Q9U.S3m(i,arr.length);i++){if(Q9U.G3m(arr[i],obj.cb)){arr.splice(i);if(!arr.length)obj[obj.type]=null;return ;}
}
}
;STXChart.prototype.dispatch=function(type,data){if(this.callbacks[type])(this.callbacks[type])(data);var arr=this.callbackListeners[type];if(arr){for(var i=0;Q9U.V3m(i,arr.length);i++)(arr[i])(data);}
arr=this.callbackListeners["*"];if(arr){for(var j=0;Q9U.R3m(j,arr.length);j++)(arr[j])(data);}
}
;STXChart.prototype.deleteYAxisIfUnused=function(panel,yAxis){if(!yAxis)return ;if(Q9U.D3m(yAxis,panel.yAxis))return ;for(var r in this.chart.seriesRenderers){var renderer=this.chart.seriesRenderers[r];if(Q9U.g3m(renderer.params.yAxis,yAxis)){if(Q9U.n3m(renderer.seriesParams.length,0))return ;}
}
var i;for(i=0;Q9U.Z3m(i,panel.yaxisLHS.length);i++){if(Q9U.s3m(panel.yaxisLHS[i],yAxis))panel.yaxisLHS.splice(i,1);}
for(i=1;Q9U.i3m(i,panel.yaxisRHS.length);i++){if(Q9U.a3m(panel.yaxisRHS[i],yAxis))panel.yaxisRHS.splice(i,1);}
this.resizeCanvas();this.adjustPanelPositions();}
;STXChart.prototype.addYAxis=function(panel,yAxis){var I0p="lef";if(!yAxis)return ;if(!panel.yaxisLHS){panel.yaxisLHS=[];panel.yaxisRHS=[];if(Q9U.I3m(panel.yAxis.position,"right"))panel.yaxisRHS.push(panel.yAxis);else panel.yaxisLHS.push(panel.yAxis);}
var arr=panel.yaxisLHS.concat(panel.yaxisRHS);for(var i=0;Q9U.r3m(i,arr.length);i++){if(Q9U.A3m(arr[i],yAxis))return ;}
if(Q9U.y3m(yAxis.position,(I0p+E3p))){panel.yaxisLHS.unshift(yAxis);}
else{yAxis.position="right";panel.yaxisRHS.push(yAxis);}
this.preAdjustScroll();this.resizeCanvas();this.adjustPanelPositions();this.postAdjustScroll();}
;STXChart.prototype.calculateYAxisPositions=function(){var panelsInOrder=[];for(var chartName in this.charts){panelsInOrder.push(chartName);}
for(var panelName in this.panels){var p=this.panels[panelName];if(Q9U.c3m(p.name,p.chart.name))continue;panelsInOrder.push(panelName);}
for(var j=0;Q9U.B3m(j,panelsInOrder.length);j++){var panel=this.panels[panelsInOrder[j]];if(!panel)continue;var isAChart=Q9U.l4m(panel.name,panel.chart.name);if(!panel.yaxisLHS){panel.yaxisLHS=[];panel.yaxisRHS=[];if(Q9U.Y4m(panel.name,panel.chart.name)||panel.yAxis.position){if(Q9U.x4m(panel.yAxis.position,"left"))panel.yaxisLHS.push(panel.yAxis);else panel.yaxisRHS.push(panel.yAxis);}
else{var position=panel.chart.panel.yAxis.position;if(!position||Q9U.K4m(position,"right"))panel.yaxisRHS.push(panel.yAxis);else panel.yaxisLHS.push(panel.yAxis);}
}
if(!panel.yAxis.width)panel.yAxis.width=this.yaxisWidth;panel.yaxisTotalWidthRight=0;var i,yaxis;panel.yaxisTotalWidthLeft=0;for(i=0;Q9U.C4m(i,panel.yaxisLHS.length);i++){yaxis=panel.yaxisLHS[i];panel.yaxisTotalWidthLeft+=yaxis.width;yaxis.justifyRight=(Q9U.W4m(yaxis.justifyRight,null)?panel.chart.yAxis.justifyRight:yaxis.justifyRight);if(Q9U.v4m(yaxis.justifyRight,null))yaxis.justifyRight=true;}
for(i=0;Q9U.M4m(i,panel.yaxisRHS.length);i++){yaxis=panel.yaxisRHS[i];panel.yaxisTotalWidthRight+=yaxis.width;}
var x=0;for(i=0;Q9U.u4m(i,panel.yaxisLHS.length);i++){yaxis=panel.yaxisLHS[i];yaxis.left=x;x+=yaxis.width;}
x=Q9U.N4m(this.width,panel.yaxisTotalWidthRight);for(i=0;Q9U.b4m(i,panel.yaxisRHS.length);i++){yaxis=panel.yaxisRHS[i];yaxis.left=x;x+=yaxis.width;}
if(typeof this.yaxisLeft!="undefined")panel.chart.yaxisPaddingRight=this.yaxisLeft;panel.yaxisCalculatedPaddingRight=panel.yaxisTotalWidthRight;if(panel.chart.yaxisPaddingRight||Q9U.z4m(panel.chart.yaxisPaddingRight,0))panel.yaxisCalculatedPaddingRight=panel.chart.yaxisPaddingRight;panel.yaxisCalculatedPaddingLeft=panel.yaxisTotalWidthLeft;if(panel.chart.yaxisPaddingLeft||Q9U.H4m(panel.chart.yaxisPaddingLeft,0))panel.yaxisCalculatedPaddingLeft=panel.chart.yaxisPaddingLeft;if(isAChart){panel.left=panel.yaxisCalculatedPaddingLeft;panel.right=Q9U.q4m(this.width,panel.yaxisCalculatedPaddingRight);}
else{panel.left=panel.chart.panel.left;panel.right=panel.chart.panel.right;}
panel.width=Q9U.m4m(panel.right,panel.left);panel.handle.style.left=panel.left+"px";panel.handle.style.width=panel.width+(d2p);if(isAChart){panel.chart.left=panel.left;panel.chart.right=panel.right;panel.chart.width=Q9U.d4m(panel.right,panel.left);}
}
}
;STXChart.prototype.initializeChart=function(container){var D5n="lizeCh",b2p="init",P7p="oat",F5p="asFl",T0p="nv",r3p="e8ca",E2p="bl",l7p="lu",a6p="bso";if(this.runPrepend("initializeChart",arguments))return ;if(!this.chart.symbolObject.symbol)this.chart.symbolObject.symbol=this.chart.symbol;if(this.locale)this.setLocale(this.locale);if(!this.displayZone&&STXChart.defaultDisplayTimeZone){this.setTimeZone(null,STXChart.defaultDisplayTimeZone);}
this.calculateYAxisPositions();this.micropixels=0;if(container)this.chart.container=container;this.chart.container.stx=this;if(!this.chart.container.STXRegistered){this.chart.container.STXRegistered=true;STXChart.registeredContainers.push(this.chart.container);}
if(STX.isSurface){if(!this.gesture){this.gesture=new MSGesture();if(this.manageTouchAndMouse){this.gesture.target=this.chart.container;}
else{this.gesture.target=document.body;}
this.gesturePointerId=null;}
}
this.registerHTMLElements();if(this.chart.canvas&&document.createElement("canvas").getContext){if(!this.chart.canvas.id){this.chart.container.removeChild(this.chart.canvas);this.chart.canvas=null;}
if(this.chart.tempCanvas&&!this.chart.tempCanvas.id){this.chart.container.removeChild(this.chart.tempCanvas);this.chart.tempCanvas=null;}
if(this.floatCanvas&&!this.floatCanvas.id){this.chart.container.removeChild(this.floatCanvas);this.floatCanvas=null;}
}
else{if(Q9U.f4m(this.layout.candleWidth,this.minimumCandleWidth))this.layout.candleWidth=this.minimumCandleWidth;if(Q9U.j0m(this.layout.candleWidth,50))this.layout.candleWidth=8;}
if(!this.chart.canvas)this.chart.canvas=document.createElement("canvas");if(!this.chart.canvas.getContext){this.chart.canvas=this.chart.container.querySelectorAll("#ie8canvas")[0];if(!this.chart.canvas.getContext){if(window.G_vmlCanvasManager)G_vmlCanvasManager.initElement(this.chart.canvas);}
this.chart.canvas.style.display="block";}
else{this.chart.container.appendChild(this.chart.canvas);}
this.chart.canvas.style.position=(c1n+a6p+l7p+E3p+n5n);this.chart.canvas.style.left="0px";this.chart.context=this.chart.canvas.getContext("2d");this.chart.canvas.context=this.chart.context;this.chart.context.lineWidth=1;if(!this.chart.tempCanvas)this.chart.tempCanvas=document.createElement("canvas");if(!this.chart.tempCanvas.getContext){this.chart.tempCanvas=this.chart.container.querySelectorAll("#ie8canvasTemp")[0];if(!this.chart.tempCanvas.getContext){if(window.G_vmlCanvasManager)G_vmlCanvasManager.initElement(this.chart.tempCanvas);}
this.chart.tempCanvas.style.display=(E2p+L0p+e5n+O8p);}
else{this.chart.container.appendChild(this.chart.tempCanvas);}
this.chart.tempCanvas.style.position="absolute";this.chart.tempCanvas.style.left="0px";this.chart.tempCanvas.context=this.chart.tempCanvas.getContext("2d");this.chart.tempCanvas.context.lineWidth=1;if(!this.floatCanvas)this.floatCanvas=document.createElement("canvas");if(!this.floatCanvas.getContext){this.floatCanvas=this.chart.container.querySelectorAll((c0p+r8p+r3p+T0p+F5p+P7p))[0];if(!this.floatCanvas.getContext){if(window.G_vmlCanvasManager)G_vmlCanvasManager.initElement(this.chart.tempCanvas);}
this.floatCanvas.style.display="block";}
else{this.chart.container.appendChild(this.floatCanvas);}
this.floatCanvas.style.position="absolute";this.floatCanvas.style.left="0px";this.floatCanvas.context=this.floatCanvas.getContext("2d");this.floatCanvas.context.lineWidth=1;this.resizeCanvas();if(STX.isAndroid){this.chart.tempCanvas.ontouchstart=function(e){if(e.preventDefault)e.preventDefault();}
;this.floatCanvas.ontouchstart=function(e){if(e.preventDefault)e.preventDefault();}
;}
this.panels.chart.display=this.chart.symbol;if(this.chart.symbolDisplay)this.panels.chart.display=this.chart.symbolDisplay;this.adjustPanelPositions();this.chart.panel=this.panels[this.chart.name];this.calculateYAxisMargins(this.chart.panel.yAxis);this.initialWhitespace=this.preferences.whitespace;if(this.chart.dataSet&&Q9U.o0m(this.chart.dataSet.length,0)){this.chart.scroll=Math.floor(Q9U.t0m(this.chart.width,this.layout.candleWidth));var wsInTicks=Math.round(Q9U.O0m(this.preferences.whitespace,this.layout.candleWidth));this.chart.scroll-=wsInTicks;}
this.chart.lockScroll=false;if(STX.touchDevice){var overlayTrashCan=this.chart.container.querySelectorAll("#overlayTrashCan")[0],vectorTrashCan=this.chart.container.querySelectorAll("#vectorTrashCan")[0];if(overlayTrashCan)overlayTrashCan.onmspointerup=overlayTrashCan.ontouchend=(function(self){return function(e){self.deleteHighlighted(true);}
;}
)(this);if(vectorTrashCan)vectorTrashCan.onmspointerup=vectorTrashCan.ontouchend=(function(self){return function(e){self.deleteHighlighted(true);}
;}
)(this);}
if(this.manageTouchAndMouse){this.registerTouchAndMouseEvents();}
this.chart.container.onmouseout=(function(self){return function(e){self.handleMouseOut(e);}
;}
)(this);if(this.controls.chartControls){this.controls.chartControls.style.display="block";}
this.abortDrawings();this.undoStamps=[];for(var panelName in this.panels){var panel=this.panels[panelName];if(panel.markerHolder){this.chart.container.removeChild(panel.markerHolder);panel.markerHolder=null;}
}
for(var i in this.plugins){var plugin=this.plugins[i];if(plugin.display){if(plugin.initializeChart)plugin.initializeChart(this);}
}
if(!this.resizeListenerInitialized){this.resizeListenerInitialized=true;var closure=function(self){return function(e){self.resizeChart();}
;}
;if(window.attachEvent){window.attachEvent("onresize",closure(this));}
else{var c=closure(this);window.addEventListener("resize",c,true);this.eventListeners.push({"element":window,"event":"resize","function":c}
);}
}
if(this.chart.baseline.userLevel)this.chart.baseline.userLevel=null;this.setResizeTimer(this.resizeDetectMS);this.runAppend((b2p+r8p+c1n+D5n+M0p),arguments);}
;STXChart.prototype.destroy=function(){this.setResizeTimer(0);if(this.quoteDriver)this.quoteDriver.die();this.styles={}
;for(var i=0;Q9U.L0m(i,this.eventListeners.length);i++){var listener=this.eventListeners[i];listener.element.removeEventListener(listener.event,listener["function"]);}
}
;STXChart.prototype.handleMouseOut=function(e){var R6p="handleMouseOut";e=e||window.event;if(!STX.withinElement(this.chart.container,e.pageX,e.pageY)){if(this.runPrepend(R6p,arguments))return ;this.undisplayCrosshairs();this.grabbingScreen=U5p;this.touches=[];this.touching=U5p;if(this.activeDrawing&&this.userPointerDown){this.userPointerDown=U5p;this.drawingLine=U5p;var cy=this.backOutY(e.pageY),cx=this.backOutX(e.pageX);this.drawingClick(this.currentPanel,cx,cy);}
STXChart.insideChart=U5p;this.displaySticky();this.runAppend(R6p,arguments);}
}
;STXChart.prototype.registerTouchAndMouseEvents=function(){var c0n="DOMMouseScroll",f8p="mousewheel",I4p="onwheel",r1p="iv",z0p="wheel",W3p="onMouseOver",P8p="onMouseOut",Z5p="ver",u6p="eO",S7p="ou",Q0p="pointerup",a8p="pointermove",c3p="pointerdown",s8p="erUp",T4p="SPo",P8n="M",o8p="MSPointerMove",O1n="MSGestureEnd",D6p="MSGestureChange",O7X="MSGestureStart",k6p="MSPointerDown",s5n="emo",s1n="ous",G1n="#home";if(this.touchAndMouseEventsRegistered)return ;this.touchAndMouseEventsRegistered=L8p;var el=this.chart.container,homeEl=$$$(G1n,this.controls.chartControls),zoomInEl=$$$(K8p,this.controls.chartControls),zoomOutEl=$$$(B9p,this.controls.chartControls);if(!STX.touchDevice){el.addEventListener((a0p+s1n+s5n+T7X+n5n),(function(self){return function(e){self.mousemove(e);}
;}
)(this),U5p);el.addEventListener(z5n,(function(self){return function(e){self.mousedown(e);}
;}
)(this),U5p);el.addEventListener(I1p,(function(self){return function(e){self.mouseup(e);}
;}
)(this),U5p);}
else{if(STX.isSurface){el.addEventListener(t7p,(function(self){return function(e){self.msMouseMoveProxy(e);}
;}
)(this),U5p);el.addEventListener(z5n,(function(self){return function(e){self.msMouseDownProxy(e);}
;}
)(this),U5p);el.addEventListener(I1p,(function(self){return function(e){self.msMouseUpProxy(e);}
;}
)(this),U5p);if(window.navigator.msPointerEnabled){el.addEventListener(k6p,(function(self){return function(e){return self.startProxy(e);}
;}
)(this),U5p);el.addEventListener(O7X,(function(self){return function(e){self.gestureInEffect=L8p;}
;}
)(this),U5p);el.addEventListener(D6p,(function(self){return function(e){return self.touchmove(e);}
;}
)(this),U5p);el.addEventListener(O1n,(function(self){return function(e){self.gestureInEffect=U5p;return self.touchend(e);}
;}
)(this),U5p);el.addEventListener(o8p,(function(self){return function(e){self.moveProxy(e);}
;}
)(this),U5p);el.addEventListener((P8n+T4p+p7X+E3p+s8p),(function(self){return function(e){return self.endProxy(e);}
;}
)(this),U5p);}
else{el.addEventListener(c3p,(function(self){return function(e){return self.startProxy(e);}
;}
)(this),U5p);el.addEventListener(O7X,(function(self){return function(e){self.gestureInEffect=L8p;}
;}
)(this),U5p);el.addEventListener(D6p,(function(self){return function(e){return self.touchmove(e);}
;}
)(this),U5p);el.addEventListener(O1n,(function(self){return function(e){self.gestureInEffect=U5p;return self.touchend(e);}
;}
)(this),U5p);el.addEventListener(a8p,(function(self){return function(e){self.moveProxy(e);}
;}
)(this),U5p);el.addEventListener(Q0p,(function(self){return function(e){return self.endProxy(e);}
;}
)(this),U5p);}
}
else{if(!STX.isAndroid&&!STX.ipad&&!STX.iphone){el.addEventListener(t7p,(function(self){return function(e){self.iosMouseMoveProxy(e);}
;}
)(this),U5p);el.addEventListener(z5n,(function(self){return function(e){self.iosMouseDownProxy(e);}
;}
)(this),U5p);el.addEventListener(I1p,(function(self){return function(e){self.iosMouseUpProxy(e);}
;}
)(this),U5p);}
el.addEventListener((E3p+S7p+e5n+Z8p+j5n+M0p),(function(self){return function(e){self.touchstart(e);}
;}
)(this),U5p);el.addEventListener(E2n,(function(self){return function(e){self.touchmove(e);}
;}
)(this),U5p);el.addEventListener(D7p,(function(self){return function(e){self.touchend(e);}
;}
)(this),U5p);if(zoomInEl){zoomInEl.removeAttribute((p9p+P8n+L0p+P6n+u6p+Z5p));zoomInEl.removeAttribute(P8p);}
if(zoomOutEl){zoomOutEl.removeAttribute(W3p);zoomOutEl.removeAttribute(P8p);}
}
}
var wheelEvent=(Q9U.k0m(z0p,document.createElement((S5n+r1p)))||Q9U.w0m(I4p,document))?z0p:Q9U.e0m(document.onmousewheel,undefined)?f8p:c0n;el.addEventListener(wheelEvent,(function(self,wheelEvent){return function(e){self.mouseWheel(e,wheelEvent);}
;}
)(this,wheelEvent),U5p);}
;STXChart.prototype.rightClickHighlighted=function(){var q0p="rightClickHighlighted";if(this.runPrepend(q0p,arguments))return ;this.deleteHighlighted(L8p);this.runAppend(q0p,arguments);}
;STXChart.prototype.deleteHighlighted=function(callRightClick){if(this.runPrepend("deleteHighlighted",arguments))return ;this.cancelTouchSingleClick=true;STX.clearCanvas(this.chart.tempCanvas,this);for(var i=Q9U.E0m(this.drawingObjects.length,1);Q9U.P0m(i,0);i--){var drawing=this.drawingObjects[i];if(drawing.highlighted&&!drawing.permanent){var dontDeleteMe=drawing.abort();if(!dontDeleteMe){var before=STX.shallowClone(this.drawingObjects);this.drawingObjects.splice(i,1);this.undoStamp(before,STX.shallowClone(this.drawingObjects));}
this.changeOccurred("vector");}
}
for(var name in this.overlays){var o=this.overlays[name];if(o.highlight&&!o.permanent){if(callRightClick)this.rightClickOverlay(name);else this.removeOverlay(name);}
}
var chart=this.currentPanel.chart;for(var r in chart.seriesRenderers){var renderer=chart.seriesRenderers[r];for(var sp=Q9U.p0m(renderer.seriesParams.length,1);Q9U.Q0m(sp,0);sp--){var series=renderer.seriesParams[sp];if(series.highlight&&!series.permanent){renderer.removeSeries(series.field);}
}
}
var comparing=false;for(var s in chart.series){if(chart.series[s].parameters.isComparison)comparing=true;}
if(!comparing)this.setComparison(false,chart);this.draw();if(this.controls.mSticky){this.controls.mSticky.style.display="none";this.controls.mSticky.children[0].innerHTML="";}
this.runAppend("deleteHighlighted",arguments);}
;STXChart.prototype.panelExists=function(name){for(var p in this.panels){var panel=this.panels[p];if(Q9U.F0m(panel.name,name))return L8p;}
return U5p;}
;STXChart.prototype.hideCrosshairs=function(){this.displayCrosshairs=U5p;}
;STXChart.prototype.showCrosshairs=function(){this.displayCrosshairs=L8p;}
;STXChart.prototype.grabHandle=function(panel){var q7X="grabHandle";if(this.runPrepend(q7X,arguments))return ;if(!panel)return ;STXChart.crosshairY=panel.top+this.top;STXChart.resizingPanel=panel;this.drawTemporaryPanel();STX.appendClassName(panel.handle,S4p);this.runAppend(q7X,arguments);}
;STXChart.prototype.releaseHandle=function(){var d9p="releaseHandle";if(this.runPrepend(d9p,arguments))return ;STX.clearCanvas(this.chart.tempCanvas,this);this.resizePanels();if(STXChart.resizingPanel)STX.unappendClassName(STXChart.resizingPanel.handle,S4p);STXChart.resizingPanel=G8p;this.runAppend(d9p,arguments);}
;STXChart.prototype.storePanels=function(){if(!this.layout)this.layout={}
;var view=this.layout;view.panels={}
;for(var p in this.panels){var panel=this.panels[p];view.panels[panel.name]={"percent":panel.percent,"display":panel.display}
;}
}
;STXChart.prototype.savePanels=function(saveLayout){this.storePanels();if(Q9U.h0m(saveLayout,U5p))this.changeOccurred(f0n);}
;STXChart.prototype.resolveY=function(y){return this.top+y;}
;STXChart.prototype.resolveX=function(x){return this.left+x;}
;STXChart.prototype.backOutY=function(y){return Q9U.X0m(y,this.top);}
;STXChart.prototype.backOutX=function(x){return Q9U.T0m(x,this.left);}
;STXChart.prototype.cleanupRemovedStudy=function(sd){var l5p="}",i5p="{";if(sd.libraryEntry){if(sd.libraryEntry.removeFN)sd.libraryEntry.removeFN(this,sd);if(sd.libraryEntry.feed&&sd.libraryEntry.quoteFeed){this.detachTagAlongQuoteFeed(sd.libraryEntry.feed);}
}
for(var p in this.plugins){if(p.indexOf(i5p+sd.id+l5p)>-Q9U.s0n)delete  this.plugins[p];}
if(this.layout.studies)delete  this.layout.studies[sd.name];}
;STXChart.prototype.privateDeletePanel=function(panel){var b0p=4973664,g0p=7733279,x0n=1848816381,J0p=538920144;if(this.layout.studies){var mySD=this.layout.studies[panel.name];if(mySD)this.cleanupRemovedStudy(mySD);}
delete  this.panels[panel.name];for(var spm in STX.Studies.studyPanelMap){if(Q9U.J0m(STX.Studies.studyPanelMap[spm].panel,panel.name))delete  STX.Studies.studyPanelMap[spm];}
var r4n=-J0p,h4n=x0n,H4n=Q9U.M0n;for(var F4n=Q9U.s0n;Q9U.f3n.B3n(F4n.toString(),F4n.toString().length,g0p)!==r4n;F4n++){stx.initializeChart();context.fill();H4n+=Q9U.M0n;}
if(Q9U.f3n.B3n(H4n.toString(),H4n.toString().length,b0p)!==h4n){STX.swapClassName(this.controls.crossX,b1n,S1n);drawCells(param.field,param.border_color,L8p,params.widthFactor,offset);l--;return f9K==B9K;}
for(var series in this.overlays){if(Q9U.U8m(this.overlays[series].panel,panel.name)){delete  this.layout.studies[series];delete  this.overlays[series];}
}
if(panel.holder){this.chart.container.removeChild(panel.holder);var arr=this.getMarkerArray("panelName",panel.name);for(var i=0;Q9U.S8m(i,arr.length);i++){this.removeFromHolder(arr[i]);}
}
panel.handle.parentNode.removeChild(panel.handle);}
;STXChart.prototype.panelClose=function(panel){var S6p="panelClose";if(!panel)return ;if(this.runPrepend(S6p,arguments))return ;this.cancelTouchSingleClick=L8p;STXChart.drawingLine=U5p;if(panel.soloing)this.panelSolo(panel);if(this.charts[panel.name]){for(var panelName in this.panels){var subPanel=this.panels[panelName];if(Q9U.G8m(subPanel.chart.name,panel.name)){this.privateDeletePanel(subPanel);}
}
delete  this.charts[panel.name];}
else{this.privateDeletePanel(panel);}
this.showCrosshairs();this.createDataSet();this.adjustPanelPositions();this.draw();this.savePanels();this.runAppend(S6p,arguments);}
;STXChart.prototype.deleteAllPanels=function(){for(var p in this.panels){var panel=this.panels[p];this.privateDeletePanel(panel);}
this.layout.panels={}
;this.panels={}
;}
;STXChart.prototype.panelUp=function(panel){this.cancelTouchSingleClick=L8p;STXChart.drawingLine=U5p;this.showCrosshairs();var newPanels={}
,pos=Q9U.P0n,p;for(p in this.panels){if(Q9U.V8m(p,panel.name))break;pos++;}
if(!pos)return ;var i=Q9U.P0n;for(p in this.panels){if(Q9U.R8m(i,pos-Q9U.s0n))newPanels[panel.name]=panel;if(Q9U.D8m(p,panel.name))continue;newPanels[p]=this.panels[p];i++;}
this.panels=newPanels;this.adjustPanelPositions();this.draw();this.savePanels();}
;STXChart.prototype.panelDown=function(panel){this.cancelTouchSingleClick=true;STXChart.drawingLine=false;this.showCrosshairs();var newPanels={}
,pos=0,p;for(p in this.panels){if(Q9U.g8m(p,panel.name))break;pos++;}
var length=0;for(p in this.panels)length++;if(Q9U.n8m(pos,length-1))return ;var i=0;for(p in this.panels){if(Q9U.Z8m(p,panel.name)){i++;continue;}
newPanels[p]=this.panels[p];if(Q9U.s8m(i,pos+1))newPanels[panel.name]=panel;i++;}
this.panels=newPanels;this.adjustPanelPositions();this.draw();this.savePanels();}
;STXChart.prototype.panelSolo=function(panel){var Z6n="olo";this.cancelTouchSingleClick=L8p;STXChart.drawingLine=U5p;this.showCrosshairs();var hideOrNot=L8p;if(panel.soloing){hideOrNot=U5p;panel.soloing=U5p;STX.unappendClassName(panel.solo,(g4p+E3p+v0p+g4p+Z6n+G7p+W0p+r8p+E3p));panel.percent=panel.oldPercent;this.panels.chart.percent=this.panels.chart.oldPercent;}
else{panel.soloing=L8p;STX.appendClassName(panel.solo,B4p);if(Q9U.i8m(panel.name,r1n)){panel.oldPercent=panel.percent;}
else{panel.oldPercent=panel.percent;this.panels.chart.oldPercent=this.panels.chart.percent;panel.percent=Q9U.a8m(Q9U.s0n,this.panels.chart.percent);}
}
for(var p in this.panels){this.panels[p].hidden=hideOrNot;}
this.panels.chart.hidden=U5p;panel.hidden=U5p;this.adjustPanelPositions();this.draw();this.savePanels();}
;STXChart.prototype.calculatePanelPercent=function(panel){var h=Q9U.I8m(panel.bottom,panel.top);panel.percent=Q9U.r8m(h,this.chart.canvasHeight);}
;STXChart.prototype.resizePanels=function(){if(!STXChart.resizingPanel)return ;var up=L8p,p,newY,priorPanel;if(Q9U.A8m(STXChart.crosshairY,this.resolveY(STXChart.resizingPanel.top)))up=U5p;if(up){priorPanel=G8p;for(p in this.panels){if(Q9U.y8m(this.panels[p],STXChart.resizingPanel))break;if(this.panels[p].hidden)continue;priorPanel=this.panels[p];}
newY=this.backOutY(STXChart.crosshairY);if(Q9U.c8m(newY,priorPanel.top+f6p)){newY=priorPanel.top+f6p;STXChart.crosshairY=this.resolveY(newY);}
priorPanel.bottom=newY;STXChart.resizingPanel.top=newY;this.calculatePanelPercent(priorPanel);this.calculatePanelPercent(STXChart.resizingPanel);}
else{priorPanel=G8p;for(p in this.panels){if(Q9U.B8m(this.panels[p],STXChart.resizingPanel))break;if(this.panels[p].hidden)continue;priorPanel=this.panels[p];}
newY=this.backOutY(STXChart.crosshairY);if(Q9U.l6m(newY,STXChart.resizingPanel.bottom-f6p)){newY=Q9U.Y6m(STXChart.resizingPanel.bottom,f6p);STXChart.crosshairY=this.resolveY(newY);}
priorPanel.bottom=newY;STXChart.resizingPanel.top=newY;this.calculatePanelPercent(priorPanel);this.calculatePanelPercent(STXChart.resizingPanel);}
this.adjustPanelPositions();this.draw();this.savePanels();}
;STXChart.prototype.adjustPanelPositions=function(){if(!this.chart.symbol)return ;if(this.runPrepend("adjustPanelPositions",arguments))return ;var lastBottom=0,h=this.chart.canvasHeight,pixels=0,first=false,acc=0,n=0,activeSolo=false,x,panel;for(x in this.panels){panel=this.panels[x];if(isNaN(panel.percent)||Q9U.x6m(panel.percent,0))panel.percent=0.05;if(panel.hidden)continue;acc+=panel.percent;n++;if(panel.soloing)activeSolo=true;}
for(x in this.panels){var zoomRatio=0;panel=this.panels[x];if(panel.hidden){if(panel.markerHolder){panel.markerHolder.style.display="none";}
continue;}
if(!first){first=true;panel.up.style.display="none";}
else{if(this.displayIconsUpDown)panel.up.style.display="";}
if(activeSolo){if(panel.soloing){if(this.displayIconsSolo)panel.solo.style.display="";}
else{panel.solo.style.display="none";}
}
else if(Q9U.K6m(n,1)||Q9U.C6m(n,2)){panel.solo.style.display=(B8p+S0p+n5n);}
else{if(this.displayIconsSolo)panel.solo.style.display="";}
if(Q9U.W6m(n,1)){panel.down.style.display=(S0p+p9p+n5n);}
else{if(this.displayIconsUpDown)panel.down.style.display="";}
if(panel.editFunction)panel.edit.style.display="";else panel.edit.style.display="none";panel.percent=Q9U.v6m(panel.percent,acc);panel.top=lastBottom;panel.bottom=panel.top+(Q9U.M6m(h,panel.percent));panel.height=Q9U.u6m(panel.bottom,panel.top);if(Q9U.N6m(panel.chart.name,panel.name)){panel.chart.top=panel.top;panel.chart.bottom=panel.bottom;panel.chart.height=panel.height;}
var yAxis=panel.yAxis;if(yAxis.zoom&&Q9U.b6m(yAxis.height,0)){zoomRatio=Q9U.z6m(yAxis.zoom,yAxis.height);}
yAxis.top=panel.top+yAxis.topOffset;yAxis.bottom=Q9U.H6m(panel.bottom,yAxis.bottomOffset);yAxis.height=Q9U.q6m(yAxis.bottom,yAxis.top);if(zoomRatio){yAxis.zoom=Q9U.m6m(zoomRatio,yAxis.height);if(Q9U.d6m(yAxis.zoom,yAxis.height))yAxis.zoom=0;}
lastBottom=panel.bottom;if(!yAxis.high&&Q9U.f6m(yAxis.high,0)){yAxis.high=100;yAxis.low=0;yAxis.shadow=100;}
yAxis.multiplier=Q9U.j2m(yAxis.height,yAxis.shadow);if(panel.holder){panel.holder.style.right="0px";panel.holder.style.top=panel.top+"px";panel.holder.style.left="0px";panel.holder.style.height=panel.height+"px";panel.subholder.style.left=panel.left+"px";panel.subholder.style.width=panel.width+"px";panel.subholder.style.top="0px";if(Q9U.o2m(yAxis.height,0))panel.subholder.style.height=yAxis.height+"px";}
}
if(x)this.panels[x].down.style.display="none";if(Q9U.t2m(n,2)&&!activeSolo){this.panels.chart.solo.style.display="";}
if(this.controls.chartControls&&this.panels.chart)this.controls.chartControls.style.bottom=(Q9U.O2m(this.chart.canvasHeight,this.panels.chart.bottom,22))+"px";this.clearPixelCache();this.adjustDrawings();this.runAppend("adjustPanelPositions",arguments);}
;STXChart.prototype.makeMarkerHelper=function(){this.markerHelper={chartMap:{}
,classMap:{}
}
;}
;STXChart.prototype.addToHolder=function(marker){var Y7X="sName",P5n="las",f1n="em",f2p="bj",G1p="ker",h0p="Mar",panel=this.panels[marker.params.panelName];if(!panel)return ;if(STX.derivedFrom(marker.params.node,STX.Marker.NodeCreator)){marker.stxNodeCreator=marker.params.node;marker.node=marker.stxNodeCreator.node;}
else{marker.node=marker.params.node;}
if(!this.markerHelper)this.makeMarkerHelper();if(marker.params.chartContainer){this.container.appendChild(marker.node);}
else if(marker.params.includeAxis){panel.holder.appendChild(marker.node);}
else{panel.subholder.appendChild(marker.node);}
var label=marker.params.label;if(!this.markers[label])this.markers[label]=[];this.markers[label].push(marker);marker.chart=panel.chart;if(!this.markerHelper.chartMap[marker.chart.name]){this.markerHelper.chartMap[marker.chart.name]={dataSetLength:Q9U.P0n,markers:[]}
;}
this.markerHelper.chartMap[marker.chart.name].markers.push(marker);if(!marker.className){console.log((h0p+G1p+b5n+L0p+f2p+r4p+E3p+g4p+b5n+a0p+P3p+j5n+b5n+Z8p+c1n+T7X+n5n+b5n+c1n+b5n+a0p+f1n+I1n+p5n+b5n+e5n+P5n+Y7X));}
var classMap=this.markerHelper.classMap[marker.className];if(!classMap)classMap=this.markerHelper.classMap[marker.className]={}
;if(!classMap[marker.params.panelName])classMap[marker.params.panelName]=[];classMap[marker.params.panelName].push(marker);this.setMarkerTick(marker);}
;STXChart.prototype.getMarkerArray=function(type,comparison){var arr=[];for(var label in this.markers){for(var i=0;Q9U.C2m(i,this.markers[label].length);i++){var marker=this.markers[label][i];if(Q9U.W2m(type,"panelName")){if(Q9U.v2m(marker.panelName,comparison))arr.push(marker);}
else if(Q9U.M2m(type,"label")){if(Q9U.u2m(label,comparison))arr.push(marker);}
else if(Q9U.N2m(type,"all")){arr.push(marker);}
}
}
return arr;}
;STXChart.prototype.removeFromHolder=function(marker){var panel=this.panels[marker.params.panelName];if(!panel)return ;if(Q9U.b2m(marker.node.parentNode,panel.holder))panel.holder.removeChild(marker.node);else if(Q9U.z2m(marker.node.parentNode,panel.subholder))panel.subholder.removeChild(marker.node);else if(Q9U.H2m(marker.node.parentNode,this.container))this.container.removeChild(marker.node);var labels=this.markers[marker.params.label];if(!labels)return ;var i;for(i=0;Q9U.q2m(i,labels.length);i++){if(Q9U.m2m(labels[i],marker)){labels.splice(i,1);break;}
}
var chartMap=this.markerHelper.chartMap[marker.chart.name];if(chartMap){for(i=0;Q9U.d2m(i,chartMap.markers.length);i++){if(Q9U.f2m(chartMap.markers[i],marker)){chartMap.markers.splice(i,1);break;}
}
}
var classMap=this.markerHelper.classMap[marker.className];if(classMap){var panelArray=classMap[marker.params.panelName];if(panelArray){for(i=0;Q9U.j1m(i,panelArray.length);i++){if(Q9U.o1m(panelArray[i],marker)){panelArray.splice(i,1);break;}
}
}
}
}
;STXChart.prototype.establishMarkerTicks=function(){if(!this.markerHelper)this.makeMarkerHelper();var chartMap=this.markerHelper.chartMap;for(var chart in chartMap){var chartEntry=chartMap[chart];if(Q9U.t1m(chartEntry.dataSetLength,this.charts[chart].dataSet.length))continue;for(var i=0;Q9U.O1m(i,chartEntry.markers.length);i++){this.setMarkerTick(chartEntry.markers[i]);}
}
}
;STXChart.prototype.futureTickIfDisplayed=function(marker){var chart=marker.chart;if(Q9U.L1m(chart.dataSet.length,1))return ;var xaxisDT=chart.xaxis[Q9U.k1m(chart.xaxis.length,1)].DT;xaxisDT=new Date(Q9U.w1m(xaxisDT.getTime(),this.timeZoneOffset*60000));if(Q9U.e1m(marker.params.x,xaxisDT))return ;var futureTicksOnScreen=Q9U.E1m(chart.maxTicks,chart.dataSegment.length),ticksToSearch=chart.dataSet.length+futureTicksOnScreen,pms,qms,dt=new Date(chart.dataSet[Q9U.P1m(chart.dataSet.length,1)].DT),iter=this.standardMarketIterator(dt,null,chart),dms=marker.params.x.getTime();for(var j=chart.dataSet.length;Q9U.p1m(j,ticksToSearch);j++){pms=dt.getTime();dt=iter.next();qms=dt.getTime();if(Q9U.Q1m(qms,dms)){marker.tick=j;return ;}
else if(Q9U.F1m(qms,dms)&&Q9U.h1m(pms,dms)){marker.tick=Math.max(Q9U.X1m(j,1),0);return ;}
}
}
;STXChart.prototype.setMarkerTick=function(marker){var chart=marker.chart;if(Q9U.T1m(marker.params.xPositioner,"master")){marker.tick=Math.floor(Q9U.J1m(marker.params.x,this.layout.periodicity));return ;}
else if(Q9U.U5m(marker.params.xPositioner,"date")){var pms,qms,dms=marker.params.x.getTime();for(var i=0;Q9U.S5m(i,chart.dataSet.length);i++){var quotes=chart.dataSet[i];qms=quotes.DT.getTime();pms=qms;if(Q9U.G5m(i,0))pms=chart.dataSet[Q9U.V5m(i,1)].DT.getTime();if(Q9U.R5m(qms,dms)){marker.tick=i;return ;}
else if(Q9U.D5m(qms,dms)&&Q9U.g5m(pms,dms)){marker.tick=Math.max(Q9U.n5m(i,1),0);return ;}
else if(Q9U.Z5m(dms,qms)){marker.tick=null;return ;}
}
if(Q9U.s5m(chart.dataSet.length,1))return ;var dt=new Date(chart.dataSet[Q9U.i5m(i,1)].DT);if(Q9U.a5m(dt.getTime(),dms))marker.params.future=true;marker.tick=null;}
}
;STXChart.prototype.positionMarkers=function(){var self=this;if(!self.markerHelper)return ;function draw(){var V5p="rs",h8p="rke",b7X="nMa",q2n="iti";if(self.runPrepend((P4p+B1n+q2n+L0p+b7X+h8p+V5p),arguments))return ;self.markerTimeout=null;for(var className in self.markerHelper.classMap){for(var panelName in self.markerHelper.classMap[className]){var arr=self.markerHelper.classMap[className][panelName],panel=self.panels[panelName];if(arr.length){var params={stx:self,arr:arr,panel:panel}
;params.firstTick=Q9U.I5m(panel.chart.dataSet.length,panel.chart.scroll);params.lastTick=params.firstTick+panel.chart.dataSegment.length;fn=arr[0].constructor.placementFunction;if(fn){(fn)(params);}
else if(Q9U.r5m(arr[0].params.xPositioner,(S0p+v9p))&&Q9U.A5m(arr[0].params.yPositioner,"none")){self.defaultMarkerPlacement(params);}
}
}
}
self.runAppend("positionMarkers",arguments);}
if(this.markerDelay||Q9U.y5m(this.markerDelay,0)){if(!this.markerTimeout)this.markerTimeout=setTimeout(draw,this.markerDelay);}
else{draw();}
}
;STXChart.prototype.addChart=function(name,chart){chart.name=name;this.charts[name]=chart;}
;STXChart.prototype.createPanel=function(display,name,height,chartName){if(this.runPrepend("createPanel",arguments))return ;if(!chartName)chartName="chart";var h=this.chart.canvasHeight;if(!height){height=Q9U.c5m(h,0.20);}
var percent=Q9U.B5m(height,h),reduce=Q9U.l7K(1,percent);for(var p in this.panels){var panel=this.panels[p];panel.percent*=reduce;}
this.stackPanel(display,name,percent,chartName);this.adjustPanelPositions();this.savePanels(false);this.runAppend("createPanel",arguments);}
;STXChart.prototype.configurePanelControls=function(panel){var J2p="stx-chart-panel",q7p="chart-title",F5n=".stx-ico-edit",Y5p=".stx-ico-down",I8n=".stx-ico-up",h6n=".stx-panel-title",S8n=".stx-ico-close",F2p=".stx-panel-control",isChart=(Q9U.Y7K(panel.name,panel.chart.name));panel.icons=$$$(F2p,panel.holder);panel.close=panel.icons.children[Q9U.b0n];panel.close=$$$(S8n,panel.icons).parentNode;STX.appendClassName(panel.icons,q6p);panel.title=$$$(h6n,panel.icons);panel.up=$$$(I8n,panel.icons).parentNode;panel.solo=$$$((k3p+g4p+E3p+k7X+R4p+r8p+e5n+L0p+R4p+J8p+L0p+e5n+P3p+g4p),panel.icons).parentNode;panel.down=$$$(Y5p,panel.icons).parentNode;panel.edit=$$$(F5n,panel.icons).parentNode;if(!this.displayIconsUpDown)panel.up.style.display=s5p;if(!this.displayIconsUpDown)panel.down.style.display=s5p;if(!this.displayIconsSolo)panel.solo.style.display=s5p;if(!this.displayIconsClose){panel.close.style.display=s5p;}
if(!this.displayPanelResize)panel.handle.style.display=s5p;panel.title.innerHTML=w3p;panel.title.appendChild(document.createTextNode(panel.display));if(isChart){STX.appendClassName(panel.title,q7p);STX.appendClassName(panel.icons,J2p);}
if(!STX.touchDevice||STX.isSurface)panel.icons.onmouseover=(function(self){return function(e){self.hideCrosshairs();}
;}
)(this);if(!STX.touchDevice||STX.isSurface)panel.icons.onmouseout=(function(self){return function(e){self.showCrosshairs();}
;}
)(this);if(!STX.touchDevice||STX.isSurface)panel.handle.onmouseover=(function(self){return function(){self.hideCrosshairs();}
;}
)(this);if(!STX.touchDevice||STX.isSurface)panel.handle.onmouseout=(function(self){return function(){self.showCrosshairs();}
;}
)(this);if(STX.touchDevice){panel.handle.ontouchstart=(function(stx,panel){return function(e){if(stx.resizingPanel)return ;e.preventDefault();stx.grabHandle(panel);}
;}
)(this,panel);panel.handle.ontouchend=(function(stx){return function(e){e.preventDefault();stx.releaseHandle();}
;}
)(this);}
panel.handle.onmousedown=(function(stx,panel){return function(e){if(!e)e=event;stx.grabHandle(panel);}
;}
)(this,panel);panel.handle.onmouseup=(function(stx){return function(e){if(!e)e=event;stx.releaseHandle();}
;}
)(this);STX.safeClickTouch(panel.close,(function(stx,panel){return function(){stx.panelClose(panel);}
;}
)(this,panel));STX.safeClickTouch(panel.up,(function(stx,panel){return function(){stx.panelUp(panel);}
;}
)(this,panel));STX.safeClickTouch(panel.down,(function(stx,panel){return function(){stx.panelDown(panel);}
;}
)(this,panel));STX.safeClickTouch(panel.solo,(function(stx,panel){return function(){stx.panelSolo(panel);}
;}
)(this,panel));if(Q9U.x7K(panel.name,r1n))panel.close.style.display=s5p;}
;STXChart.prototype.stackPanel=function(display,name,percent,chartName){var L5n="tudy",d7p="stx-panel-chart",D0n="stx-subholder",b6n="stx-holder",k4p="stackPanel";if(this.runPrepend(k4p,arguments))return ;if(!chartName)chartName=r1n;var chart=this.charts[chartName],isChart=(Q9U.K7K(name,chartName)),yAxis=G8p;if(isChart){display=chart.symbol;if(chart.symbolDisplay)display=chart.symbolDisplay;yAxis=chart.yAxis;}
var panel=this.panels[name]=new STXChart.Panel(name,yAxis);panel.percent=percent;panel.chart=chart;panel.display=display;panel.holder=STX.newChild(this.container,c8n,b6n);panel.subholder=STX.newChild(panel.holder,c8n,D0n);panel.subholder.style.zIndex=Q9U.s0n;var appendClass=isChart?d7p:(g4p+E3p+k7X+R4p+P4p+G0n+J9p+R4p+g4p+L5n);STX.appendClassName(panel.holder,appendClass);panel.subholder.appendChild(this.controls.iconsTemplate.cloneNode(L8p));panel.handle=this.controls.handleTemplate.cloneNode(L8p);this.container.appendChild(panel.handle);panel.handle.id=G8p;panel.handle.panel=panel;this.configurePanelControls(panel);this.resizeCanvas();this.runAppend(k4p,arguments);}
;STXChart.prototype.setPanelEdit=function(panel,editFunction){panel.editFunction=editFunction;STX.safeClickTouch(panel.edit,editFunction);this.adjustPanelPositions();}
;STXChart.prototype.drawPanels=function(){var R1p="stx_panel_border",h3p="non",K2n="drawPanels";if(this.runPrepend(K2n,arguments))return ;var first=U5p;for(var p in this.panels){var panel=this.panels[p];panel.axisDrawn=U5p;if(Q9U.C7K(panel.title.innerHTML,panel.display)){panel.title.innerHTML=w3p;panel.title.appendChild(document.createTextNode(panel.display));}
STX.appendClassName(panel.icons,q6p);if(panel.hidden){STX.unappendClassName(panel.icons,q6p);panel.handle.style.display=s5p;panel.holder.style.display=(s5p);continue;}
else{if(!this.displayIconsUpDown)panel.up.style.display=s5p;if(!this.displayIconsUpDown)panel.down.style.display=s5p;if(!this.displayIconsSolo)panel.solo.style.display=(B8p+d1p);panel.holder.style.display=Z2n;}
if(!first){panel.handle.style.display=(h3p+n5n);first=L8p;continue;}
var y=panel.top;y=Math.round(y)+w7p;this.plotLine(panel.left,panel.right,y,y,this.canvasStyle(R1p),i8n,this.chart.context,U5p,{}
);if(!this.displayPanelResize){panel.handle.style.display=s5p;}
else{panel.handle.style.display=w3p;}
panel.handle.style.top=(Q9U.W7K(y,panel.handle.offsetHeight/Q9U.M0n))+(d2p);}
this.runAppend(K2n,arguments);}
;STXChart.prototype.touchSingleClick=function(finger,x,y){var self=this,args=arguments;return function(){(function(){if(!this.cancelTouchSingleClick){if(this.runPrepend("touchSingleClick",args))return ;if(this.editingAnnotation)return ;this.clicks={s1MS:-1,e1MS:-1,s2MS:-1,e2MS:-1}
;if(!this.displayCrosshairs)return ;if(!this.displayInitialized)return ;if(Q9U.v7K(this.openDialog,""))return ;if(Q9U.M7K(x,this.left)||Q9U.u7K(x,this.right)||Q9U.N7K(y,this.top)||Q9U.b7K(y,this.bottom))return ;var cy=this.backOutY(STXChart.crosshairY),cx=this.backOutX(STXChart.crosshairX);this.currentPanel=this.whichPanel(cy);if(!this.currentVectorParameters.vectorType||!STX.Drawing[this.currentVectorParameters.vectorType]||!(new STX.Drawing[this.currentVectorParameters.vectorType]()).dragToDraw){if(!this.drawingClick(this.currentPanel,cx,cy)){if(!this.layout.crosshair){STXChart.crosshairY=0;STXChart.crosshairX=0;this.cx=this.backOutX(STXChart.crosshairX);this.cy=this.backOutY(STXChart.crosshairY);this.findHighlights();STXChart.crosshairY=y;STXChart.crosshairX=x;var rect=this.container.getBoundingClientRect();this.top=rect.top;this.left=rect.left;this.right=this.left+this.width;this.bottom=this.top+this.height;this.cx=this.backOutX(STXChart.crosshairX);this.cy=this.backOutY(STXChart.crosshairY);if(this.currentPanel&&this.currentPanel.chart.dataSet){this.crosshairTick=this.tickFromPixel(this.cx,this.currentPanel.chart);this.crosshairValue=this.adjustIfNecessary(this.currentPanel,this.crosshairTick,this.valueFromPixel(this.cy,this.currentPanel));}
this.headsUpHR();this.findHighlights(true);}
}
if(!this.currentVectorParameters.vectorType){this.dispatch("tap",{stx:this,panel:this.currentPanel,x:cx,y:cy}
);}
}
}
self.cancelTouchSingleClick=false;this.runAppend("touchSingleClick",args);}
).apply(self,args);}
;}
;STXChart.prototype.touchDoubleClick=function(finger,x,y){var M9p="touchDoubleClick",V7p="ck",S7X="ubl",a7X="uc";if(Q9U.z7K(x,this.left)||Q9U.H7K(x,this.right)||Q9U.q7K(y,this.panels.chart.top)||Q9U.m7K(y,this.panels.chart.bottom))return ;if(this.editingAnnotation)return ;if(this.runPrepend((E3p+L0p+a7X+Z8p+y2n+L0p+S7X+n5n+j1p+p4p+V7p),arguments))return ;if(STXChart.drawingLine){this.undo();}
else{if(this.anyHighlighted){this.deleteHighlighted();}
else{var yAxis=this.currentPanel.yAxis;if(Q9U.d7K(yAxis.scroll,(yAxis.initialMarginTop-yAxis.initialMarginBottom)/Q9U.M0n)&&Q9U.f7K(yAxis.zoom,yAxis.initialMarginTop+yAxis.initialMarginBottom)){this.home();}
else{this.calculateYAxisMargins(this.currentPanel.yAxis);}
this.draw();}
}
this.clicks={s1MS:-Q9U.s0n,e1MS:-Q9U.s0n,s2MS:-Q9U.s0n,e2MS:-Q9U.s0n}
;this.runAppend(M9p,arguments);}
;STXChart.prototype.touchmove=function(e){var Q6n="efine";if(!this.displayInitialized)return ;if(Q9U.j9K(this.openDialog,""))return ;if(Q9U.o9K(STXChart.ignoreTouch,true))return ;var localTouches=[];if(!this.overYAxis||(this.controls&&this.controls.crossX&&Q9U.t9K(this.controls.crossX.style.display,"none"))){if(e&&e.preventDefault&&this.captureTouchEvents){e.preventDefault();}
if(e){e.stopPropagation();}
}
var now=new Date().getTime();if(this.clicks.s2MS==-1){this.clicks.e1MS=now;if(Q9U.O9K(this.clicks.e1MS-this.clicks.s1MS,25)){return ;}
}
else{this.clicks.e2MS=now;if(Q9U.L9K(this.clicks.e2MS-this.clicks.s2MS,25)){return ;}
}
if(STX.isSurface){if(this.mouseMode)return ;if(!e.pointerId)e.pointerId=this.gesturePointerId;if((!this.grabbingScreen||STXChart.resizingPanel)&&!this.overrideGesture){if(Q9U.k9K(e.detail,e.MSGESTURE_FLAG_INERTIA)){this.gesture.stop();return ;}
}
for(var i=0;Q9U.w9K(i,this.touches.length);i++){if(Q9U.e9K(this.touches[i].pointerId,e.pointerId)){var xd=Math.abs(Q9U.E9K(this.touches[i].pageX,e.clientX)),yd=Math.abs(Q9U.P9K(this.touches[i].pageY,e.clientY)),c=Math.sqrt(Q9U.p9K(xd,xd)+Q9U.Q9K(yd,yd));if(!c)return ;this.clicks.e1MS=new Date().getTime();if(Q9U.F9K(this.clicks.e1MS-this.clicks.s1MS,50)){return ;}
if(Q9U.h9K(this.touches[i].pageX,e.clientX)&&Q9U.X9K(this.touches[i].pageY,e.clientY))return ;this.touches[i].pageX=e.clientX;this.touches[i].pageY=e.clientY;break;}
}
if(Q9U.T9K(i,0)){this.movedPrimary=true;}
else{this.movedSecondary=true;}
if(!this.gestureInEffect&&Q9U.J9K(i,this.touches.length)){return ;}
this.changedTouches=[{pointerId:e.pointerId,pageX:e.clientX,pageY:e.clientY}
];localTouches=this.touches;if(this.gestureInEffect&&!localTouches.length){localTouches=this.changedTouches;}
}
else{localTouches=e.touches;this.changedTouches=e.changedTouches;}
var crosshairXOffset=this.crosshairXOffset,crosshairYOffset=this.crosshairYOffset;if(this.runPrepend("touchmove",arguments))return ;var x,y;if(STXChart.resizingPanel){var touch1=localTouches[0];x=touch1.pageX;y=touch1.pageY;this.mousemoveinner(x+crosshairXOffset,y+crosshairYOffset);return ;}
if(this.moveB!=-1){this.touchMoveTime=new Date();}
this.moveA=this.moveB;this.moveB=localTouches[0].pageX;var distance;if(Q9U.U3K(localTouches.length,1)){if(!this.pinchingScreen){var touch2=localTouches[0];x=touch2.pageX;y=touch2.pageY;this.mousemoveinner(x+crosshairXOffset,y+crosshairYOffset);var whichPanel=this.whichPanel(y);this.overXAxis=Q9U.S3K(y,this.top+this.chart.panel.yAxis.bottom)&&Q9U.G3K(y,this.top+this.chart.panel.bottom)&&STXChart.insideChart;if(!whichPanel)this.overYAxis=false;else this.overYAxis=(Q9U.V3K(x,whichPanel.right)||Q9U.R3K(x,whichPanel.left))&&STXChart.insideChart;}
}
else if(Q9U.D3K(localTouches.length,2)&&this.allowZoom){if(!this.displayCrosshairs)return ;var touch3=localTouches[0],x1=touch3.pageX,y1=touch3.pageY,touch4=localTouches[1],x2=touch4.pageX,y2=touch4.pageY;distance=Math.sqrt(Q9U.g3K((x2-x1),(x2-x1))+Q9U.n3K((y2-y1),(y2-y1)));this.pinchingCenter=Math.min(x1,x2)+Q9U.Z3K((Math.max(x1,x2)-Math.min(x1,x2)),2);var delta=Math.round(Q9U.s3K(this.gestureStartDistance,distance)),noCrosshairs=(!this.layout.crosshair&&!this.currentVectorParameters.vectorType);if(noCrosshairs)this.pinchingScreen=5;this.clearPixelCache();if(Q9U.i3K(this.pinchingScreen,2)){if(STX.isSurface&&(!this.movedPrimary||!this.movedSecondary)){return ;}
if((Q9U.a3K(x1,this.pt.x1)&&Q9U.I3K(x2,this.pt.x2))||(Q9U.r3K(x1,this.pt.x1)&&Q9U.A3K(x2,this.pt.x2))||(Q9U.y3K(y1,this.pt.y1)&&Q9U.c3K(y2,this.pt.y2))||(Q9U.B3K(y1,this.pt.y1)&&Q9U.l4K(y2,this.pt.y2))){this.pinchingScreen=0;}
else{this.pinchingScreen++;if(Q9U.Y4K(this.pinchingScreen,2))return ;}
}
this.pt={x1:x1,x2:x2,y1:y1,y2:y2}
;if(Q9U.x4K(this.pinchingScreen,0)){this.mousemoveinner(x1+crosshairXOffset,y1+crosshairYOffset);this.gestureStartDistance=distance;}
else{var angle=Math.asin(Q9U.K4K((Math.max(y2,y1)-Math.min(y2,y1)),distance));this.ctrl=true;if(Q9U.C4K(Math.abs(delta),12)&&!noCrosshairs){this.moveCount++;if(Q9U.W4K(this.moveCount,4)){this.pinchingScreen=0;this.moveCount=0;this.ctrl=false;return ;}
}
else{this.moveCount=0;}
if(Q9U.v4K(angle,1)||(!this.goneVertical&&Q9U.M4K(angle,1.37))){if(!this.currentPanel)return ;var chart=this.currentPanel.chart;this.goneVertical=false;distance=Q9U.u4K(this.pt.x2,this.pt.x1);var tickDistance=Q9U.N4K(this.grabStartValues.t2,this.grabStartValues.t1),centerTick=this.grabStartValues.t1+Q9U.b4K(tickDistance,2),newCandleWidth=Q9U.z4K(distance,tickDistance);if(Q9U.H4K(newCandleWidth,this.minimumCandleWidth))newCandleWidth=this.minimumCandleWidth;var oldCandleWidth=this.layout.candleWidth;this.setCandleWidth(newCandleWidth,chart);if(Q9U.q4K(chart.maxTicks,5)){this.setCandleWidth(oldCandleWidth,chart);return ;}
this.micropixels=0;var px=this.pixelFromTick(Math.round(centerTick),chart),centerOfPinch=(Q9U.m4K(this.pt.x1,this.left))+Math.round(Q9U.d4K(distance,2)),pxdiff=Q9U.f4K(px,centerOfPinch),scrollDiff=Q9U.j0K(pxdiff,newCandleWidth),rounded=Math.round(scrollDiff);chart.scroll-=rounded;this.microscroll=Q9U.o0K(rounded,scrollDiff);this.micropixels=Q9U.t0K(newCandleWidth,this.microscroll);this.draw();}
else{var yAxis=this.currentPanel.chart.panel.yAxis;this.goneVertical=true;yAxis.zoom=this.grabStartZoom+(Q9U.O0K(this.gestureStartDistance,distance));if(Q9U.L0K(this.grabStartZoom,yAxis.height)){if(Q9U.k0K(yAxis.zoom,yAxis.height))yAxis.zoom=Q9U.w0K(yAxis.height,1);}
else{if(Q9U.e0K(yAxis.zoom,yAxis.height))yAxis.zoom=yAxis.height+1;}
this.draw();}
this.ctrl=false;}
}
else if(Q9U.E0K(localTouches.length,3)&&STXChart.allowThreeFingerTouch){if(!this.displayCrosshairs)return ;var touch5=localTouches[0],xx=touch5.pageX;distance=Q9U.P0K(this.grabStartX,xx);this.grabEndPeriodicity=this.grabStartPeriodicity+Math.round(Q9U.p0K(distance,10));if(Q9U.Q0K(this.grabEndPeriodicity,1))this.grabEndPeriodicity=1;if(typeof headsUp!=(P3p+S0p+S5n+Q6n+S5n)){headsUp.period.innerHTML=this.grabEndPeriodicity+" "+this.layout.interval;if(Q9U.F0K(this.grabEndPeriodicity,1))headsUp.period.innerHTML+="s";}
}
this.runAppend("touchmove",arguments);}
;STXChart.prototype.touchstart=function(e){if(STXChart.ignoreTouch)return ;if(STX.isSurface){this.movedPrimary=false;this.movedSecondary=false;}
else{if(this.touchingEvent)clearTimeout(this.touchingEvent);this.touching=true;this.touches=e.touches;this.changedTouches=e.changedTouches;}
if(STXChart.resizingPanel)return ;var crosshairXOffset=this.crosshairXOffset,crosshairYOffset=this.crosshairYOffset;if(this.runPrepend("touchstart",arguments))return ;if(this.manageTouchAndMouse&&e&&e.preventDefault&&this.captureTouchEvents)e.preventDefault();this.doubleFingerMoves=0;this.moveCount=0;this.twoFingerStart=false;var p,panel,x1,y1;if(Q9U.h0K(this.touches.length,1)||Q9U.X0K(this.touches.length,2)){if(Q9U.T0K(this.changedTouches.length,1)){var now=Date.now();this.clicks.x=this.changedTouches[0].pageX;this.clicks.y=this.changedTouches[0].pageY;if(Q9U.J0K(now-this.clicks.e1MS,250)){this.cancelTouchSingleClick=true;this.clicks.s2MS=now;}
else{this.cancelTouchSingleClick=false;this.clicks.s1MS=now;this.clicks.e1MS=-1;this.clicks.s2MS=-1;this.clicks.e2MS=-1;}
}
this.touchMoveTime=Date.now();this.moveA=this.touches[0].pageX;this.moveB=-1;var touch1=this.touches[0];x1=touch1.pageX;y1=touch1.pageY;var rect=this.container.getBoundingClientRect();this.top=rect.top;this.left=rect.left;this.right=this.left+this.width;this.bottom=this.top+this.height;if(Q9U.U8K(this.touches.length,1)){var cy=this.cy=this.backOutY(y1);this.currentPanel=this.whichPanel(cy);}
if(!this.currentPanel)this.currentPanel=this.chart.panel;if(Q9U.S8K(x1,this.left)&&Q9U.G8K(x1,this.right)&&Q9U.V8K(y1,this.top)&&Q9U.R8K(y1,this.bottom)){STXChart.insideChart=true;this.overXAxis=Q9U.D8K(y1,this.top+this.chart.panel.yAxis.bottom)&&Q9U.g8K(y1,this.top+this.chart.panel.bottom);this.overYAxis=Q9U.n8K(x1,this.currentPanel.right)||Q9U.Z8K(x1,this.currentPanel.left);for(var i=0;Q9U.s8K(i,this.drawingObjects.length);i++){var drawing=this.drawingObjects[i];if(drawing.highlighted){var prevHighlighted=drawing.highlighted;this.cy=this.backOutY(y1);this.cx=this.backOutX(x1);this.crosshairTick=this.tickFromPixel(this.cx,this.currentPanel.chart);this.crosshairValue=this.adjustIfNecessary(this.currentPanel,this.crosshairTick,this.valueFromPixel(this.cy,this.currentPanel));this.findHighlights(true);if(drawing.highlighted){this.repositioningDrawing=drawing;return ;}
else{this.anyHighlighted=true;drawing.highlighted=prevHighlighted;}
}
}
e.stopPropagation();}
else{STXChart.insideChart=false;}
var drawingEnabled=this.currentVectorParameters.vectorType&&Q9U.i8K(this.currentVectorParameters.vectorType,"");if(!this.layout.crosshair&&!drawingEnabled&&STXChart.insideChart&&!this.touchNoPan){if(Q9U.a8K(this.layout.chartType,"baseline_delta")&&Q9U.I8K(this.chart.baseline.userLevel,false)){var yt=this.valueFromPixelUntransform(Q9U.r8K(this.cy,5),this.currentPanel),yb=this.valueFromPixelUntransform(this.cy+5,this.currentPanel),xl=Q9U.A8K(this.chart.right,parseInt(getComputedStyle(this.controls.baselineHandle).width,10));if(Q9U.y8K(this.chart.baseline.actualLevel,yt)&&Q9U.c8K(this.chart.baseline.actualLevel,yb)&&Q9U.B8K(this.backOutX(touch1.pageX),xl)){this.repositioningBaseline={lastDraw:Date.now()}
;return ;}
}
for(p in this.panels){panel=this.panels[p];if(panel.highlighted){this.grabHandle(panel);return ;}
}
this.grabbingScreen=true;this.yToleranceBroken=false;this.grabStartX=x1+crosshairXOffset;this.grabStartY=y1+crosshairYOffset;this.grabStartScrollX=this.currentPanel.chart.scroll;this.grabStartScrollY=this.currentPanel.yAxis.scroll;this.swipeStart(this.currentPanel.chart);setTimeout((function(self){return function(){self.grabbingHand();}
;}
)(this),100);}
else{this.grabbingScreen=false;if(STXChart.insideChart){if(STX.Drawing[this.currentVectorParameters.vectorType]&&(new STX.Drawing[this.currentVectorParameters.vectorType]()).dragToDraw){this.userPointerDown=true;STXChart.crosshairX=x1;STXChart.crosshairY=y1;if(this.currentPanel&&this.currentPanel.chart.dataSet){this.crosshairTick=this.tickFromPixel(this.backOutX(STXChart.crosshairX),this.currentPanel.chart);this.crosshairValue=this.adjustIfNecessary(this.currentPanel,this.crosshairTick,this.valueFromPixel(this.backOutY(STXChart.crosshairY),this.currentPanel));}
this.drawingClick(this.currentPanel,this.backOutX(x1),this.backOutY(y1));this.headsUpHR();return ;}
}
}
}
if(Q9U.l6K(this.touches.length,2)){this.swipe.end=true;if((!this.displayCrosshairs&&!this.touchNoPan)||!STXChart.insideChart)return ;var touch2=this.touches[1],x2=touch2.pageX,y2=touch2.pageY;for(p in this.panels){panel=this.panels[p];if(panel.highlighted){this.grabHandle(panel);return ;}
}
var chart=this.currentPanel.chart;this.gestureStartDistance=Math.sqrt(Q9U.Y6K((x2-x1),(x2-x1))+Q9U.x6K((y2-y1),(y2-y1)));this.pt={x1:x1,x2:x2,y1:y1,y2:y2}
;this.grabbingScreen=true;this.grabStartX=x1+crosshairXOffset;this.grabStartY=y1+crosshairYOffset;this.grabStartScrollX=this.currentPanel.chart.scroll;this.grabStartScrollY=this.currentPanel.yAxis.scroll;this.grabStartCandleWidth=this.layout.candleWidth;this.grabStartZoom=this.whichYAxis(this.currentPanel).zoom;this.grabStartPt=this.pt;this.grabStartValues={x1:this.pt.x1,x2:this.pt.x2,y1:this.valueFromPixel(Q9U.K6K(this.pt.y1,this.top),this.currentPanel),y2:this.valueFromPixel(Q9U.C6K(this.pt.y2,this.top),this.currentPanel),t1:this.tickFromPixel(Q9U.W6K(this.pt.x1,this.left),chart),t2:this.tickFromPixel(Q9U.v6K(this.pt.x2,this.left),chart)}
;this.twoFingerStart=true;setTimeout((function(self){return function(){self.grabbingHand();}
;}
)(this),100);}
else if(Q9U.M6K(this.touches.length,3)){if(!this.displayCrosshairs)return ;var touch3=this.touches[0],xx=touch3.pageX;this.grabStartX=xx;this.grabStartPeriodicity=this.layout.periodicity;}
this.runAppend("touchstart",arguments);}
;STXChart.prototype.swipeStart=function(chart){var G8n=325;if(this.swipe&&this.swipe.interval)clearInterval(this.swipe.interval);this.swipe.velocity=Q9U.P0n;this.swipe.amplitude=Q9U.P0n;this.swipe.frame=chart.scroll;this.swipe.micropixels=this.micropixels;this.swipe.timestamp=Date.now();this.swipe.chart=this.currentPanel.chart;this.swipe.end=U5p;this.swipe.timeConstant=G8n;this.swipe.cb=G8p;var self=this;requestAnimationFrame(function(){self.swipeSample();}
);}
;STXChart.prototype.swipeSample=function(){var n7p=0.4,swipe=this.swipe;if(swipe.end){return ;}
var self=this,now,elapsed,delta,v,sampleMS=Z2p;now=Date.now();elapsed=Q9U.u6K(now,swipe.timestamp);if(Q9U.N6K(elapsed,sampleMS)){requestAnimationFrame(function(){self.swipeSample();}
);return ;}
var constant=STX.touchDevice?n7p:b7p;swipe.timestamp=now;delta=Q9U.b6K((swipe.chart.scroll-swipe.frame),this.layout.candleWidth)+this.micropixels-swipe.micropixels;swipe.frame=swipe.chart.scroll;swipe.micropixels=this.micropixels;v=Q9U.z6K(g5p,delta,(Q9U.s0n+elapsed));var velocity=Q9U.r6K(constant,v)+Q9U.A6K(M7p,this.swipe.velocity);if(Q9U.y6K(Math.abs(velocity),Math.abs(swipe.velocity))){swipe.velocity=velocity;}
if(Q9U.c6K(Math.abs(delta),i0n)){swipe.velocity=Q9U.P0n;}
requestAnimationFrame(function(){self.swipeSample();}
);}
;STXChart.prototype.swipeRelease=function(){var B6n=3000,swipe=this.swipe;if(Q9U.B6K(swipe.velocity,B6n))swipe.velocity=B6n;if(swipe.velocity<-B6n)swipe.velocity=-B6n;if(Q9U.l2K(swipe.velocity,q2p)||swipe.velocity<-q2p){swipe.amplitude=Q9U.Y2K(b7p,swipe.velocity);swipe.scroll=swipe.chart.scroll;swipe.target=swipe.amplitude;swipe.timestamp=Date.now();var self=this;requestAnimationFrame(function(){self.autoscroll();}
);}
}
;STXChart.prototype.scrollTo=function(chart,position,cb){var swipe=this.swipe;swipe.end=L8p;swipe.amplitude=swipe.target=Q9U.x2K((position-chart.scroll),this.layout.candleWidth);swipe.timeConstant=a5p;swipe.timestamp=Date.now();swipe.scroll=chart.scroll;swipe.chart=chart;swipe.cb=cb;var self=this;requestAnimationFrame(function(){self.autoscroll();}
);}
;STXChart.prototype.autoscroll=function(){var self=this,swipe=this.swipe,elapsed,delta;if(swipe.amplitude){swipe.elapsed=Q9U.K2K(Date.now(),swipe.timestamp);delta=-swipe.amplitude*Math.exp(-swipe.elapsed/swipe.timeConstant);if(Q9U.C2K(delta,w7p)||delta<-w7p){var diff=Q9U.W2K((swipe.target+delta),this.layout.candleWidth);swipe.chart.scroll=swipe.scroll+Math.round(diff);this.draw();requestAnimationFrame(function(){self.autoscroll();}
);}
else{if(swipe.cb)swipe.cb();}
}
}
;STXChart.prototype.touchend=function(e){if(STXChart.ignoreTouch)return ;this.swipe.end=true;if(STX.isSurface){}
else{this.touches=e.touches;this.changedTouches=e.changedTouches;}
if(this.runPrepend("touchend",arguments))return ;if(Q9U.v2K(this.touches.length,1)){if(this.layout.crosshair||this.currentVectorParameters.vectorType){if(!this.touches.length||!this.twoFingerStart){this.grabbingScreen=false;}
}
}
if(this.touches.length){this.grabStartX=-1;this.grabStartY=-1;}
if(!this.touches.length){this.touchingEvent=setTimeout((function(self){return function(){self.touching=false;}
;}
)(this),500);if(STXChart.resizingPanel){this.releaseHandle();return ;}
this.pinchingScreen=null;this.pinchingCenter=null;this.goneVertical=false;this.grabbingScreen=false;}
else{if(STXChart.resizingPanel)return ;}
if(Q9U.M2K(this.changedTouches.length,1)){if(this.repositioningDrawing){this.changeOccurred("vector");STX.clearCanvas(this.chart.tempCanvas,this);this.repositioningDrawing=null;this.draw();if(!this.layout.crosshair&&!this.currentVectorParameters.vectorType)this.findHighlights(false,true);return ;}
if(this.repositioningBaseline){this.repositioningBaseline=null;this.chart.panel.yAxis.scroll=Q9U.u2K(this.pixelFromPriceTransform(this.chart.baseline.userLevel,this.chart.panel),(this.chart.panel.yAxis.top+this.chart.panel.yAxis.bottom)/2);this.draw();return ;}
var now=Date.now(),finger=this.touches.length+1;if(this.clicks.s2MS==-1){this.clicks.e1MS=now;if(!this.currentVectorParameters.vectorType||!STX.Drawing[this.currentVectorParameters.vectorType]||!(new STX.Drawing[this.currentVectorParameters.vectorType]()).dragToDraw){if(Q9U.N2K(this.clicks.e1MS-this.clicks.s1MS,250)){setTimeout(this.touchSingleClick(finger,this.clicks.x,this.clicks.y),200);}
else{this.clicks={s1MS:-1,e1MS:-1,s2MS:-1,e2MS:-1}
;}
}
this.userPointerDown=false;if(this.activeDrawing&&this.activeDrawing.dragToDraw){var cy=this.backOutY(this.changedTouches[0].pageY)+this.crosshairYOffset,cx=this.backOutX(this.changedTouches[0].pageX)+this.crosshairXOffset;this.drawingClick(this.currentPanel,cx,cy);return ;}
}
else{this.clicks.e2MS=now;if(Q9U.b2K(this.clicks.e2MS-this.clicks.s2MS,250)){this.touchDoubleClick(finger,this.clicks.x,this.clicks.y);}
else{this.clicks={s1MS:-1,e1MS:-1,s2MS:-1,e2MS:-1}
;}
}
if((!this.layout.crosshair&&!this.currentVectorParameters.vectorType&&Q9U.z2K(finger,1))||(this.twoFingerStart&&!this.touches.length)){this.swipeRelease();}
}
else{if(this.grabEndPeriodicity!=-1&&!isNaN(this.grabEndPeriodicity)){if(this.isDailyInterval(this.layout.interval)||this.allowIntradayNMinute){this.setPeriodicityV2(this.grabEndPeriodicity);}
this.grabEndPeriodicity=-1;}
}
if(!this.touches.length){this.twoFingerStart=false;}
this.runAppend("touchend",arguments);}
;STXChart.prototype.startProxy=function(e){if(Q9U.H2K(e.pointerType,4)||Q9U.q2K(e.pointerType,"mouse")){this.mouseMode=true;}
else{this.mouseMode=false;}
if(this.mouseMode)return ;this.touches[this.touches.length]={pointerId:e.pointerId,pageX:e.clientX,pageY:e.clientY}
;this.changedTouches=[{pointerId:e.pointerId,pageX:e.clientX,pageY:e.clientY}
];if(!this.gestureInEffect&&Q9U.m2K(this.touches.length,1)){this.gesturePointerId=e.pointerId;this.overrideGesture=false;if(!this.gesture)return ;this.gesture.addPointer(e.pointerId);this.touchstart(e);}
else{this.gesture.stop();this.touchstart(e);}
}
;STXChart.prototype.moveProxy=function(e){if(Q9U.d2K(e.pointerType,Q9U.b0n)||Q9U.f2K(e.pointerType,n5p)){this.mouseMode=L8p;}
else{this.mouseMode=U5p;}
if(this.mouseMode)return ;if(!this.gestureInEffect)this.touchmove(e);}
;STXChart.prototype.endProxy=function(e){if(this.mouseMode)return ;var hm=this.touches.length;for(var i=0;Q9U.j1K(i,this.touches.length);i++){if(Q9U.o1K(this.touches[i].pointerId,e.pointerId)){this.touches.splice(i,1);break;}
}
if(Q9U.t1K(i,hm)){this.touches=[];this.grabbingScreen=false;this.touching=false;return ;}
this.changedTouches=[{pointerId:e.pointerId,pageX:e.clientX,pageY:e.clientY}
];if(!this.gestureInEffect){this.touchend(e);}
}
;STXChart.prototype.msMouseMoveProxy=function(e){if(this.touches.length||!this.mouseMode)return ;this.mousemove(e);}
;STXChart.prototype.msMouseDownProxy=function(e){if(!this.mouseMode)return ;this.mousedown(e);}
;STXChart.prototype.msMouseUpProxy=function(e){var N0p=8204293,A6p=1298548,U7p=1691467568,C7p=23131924;if(!this.mouseMode)return ;var X4n=C7p,m4n=U7p,A4n=Q9U.M0n;for(var q4n=Q9U.s0n;Q9U.f3n.B3n(q4n.toString(),q4n.toString().length,A6p)!==X4n;q4n++){this.drawWaveChart(panel);this.setTransform(chart,STX.Comparison.priceToPercent,STX.Comparison.percentToPrice);STX.unappendClassName(panel.solo,B4p);this.calculatePanelPercent(priorPanel);a.push(obj);A4n+=Q9U.M0n;}
if(Q9U.f3n.B3n(A4n.toString(),A4n.toString().length,N0p)!==m4n){return K1m<R1m;}
this.mouseup(e);}
;STXChart.prototype.iosMouseMoveProxy=function(e){if(this.touching)return ;this.mousemove(e);}
;STXChart.prototype.iosMouseDownProxy=function(e){if(this.touching){this.mouseMode=U5p;return ;}
this.mouseMode=L8p;this.mousedown(e);}
;STXChart.prototype.iosMouseUpProxy=function(e){if(this.touching)return ;this.mouseup(e);}
;STXChart.prototype.rawWatermark=function(context,x,y,text){this.canvasFont(R7p,context);context.fillStyle=this.defaultColor;context.globalAlpha=0.5;this.chart.context.textBaseline="alphabetic";context.fillText(text,x,y);context.globalAlpha=1;}
;STXChart.prototype.watermark=function(panel,config){if(config&&typeof config!=z1n){config={h:arguments[Q9U.s0n],v:arguments[Q9U.M0n],text:arguments[Q9U.n0n]}
;}
config={h:config.h||o2p,v:config.v||x1p,text:config.text||w3p,hOffset:config.hOffset||q2p,vOffset:config.vOffset||Z2p}
;if(!this.chart.context)return ;var c=this.panels[panel];if(!c||c.hidden)return ;var y=Q9U.O1K(c.bottom,config.vOffset);if(Q9U.L1K(config.v,I0n))y=c.top+config.vOffset;else if(Q9U.k1K(config.v,f0p))y=Q9U.w1K((c.top+c.bottom),Q9U.M0n);this.chart.context.save();this.canvasFont(R7p);this.canvasColor(R7p);this.chart.context.textBaseline="alphabetic";var x=c.left+config.hOffset;if(Q9U.e1K(config.h,g8p))x=Q9U.E1K(c.right,config.hOffset);else if(Q9U.P1K(config.h,R6n)){x=Q9U.p1K((c.right+c.left-this.chart.context.measureText(config.text).width),2);}
this.chart.context.globalAlpha=0.5;this.chart.context.fillStyle=this.defaultColor;this.chart.context.fillText(config.text,x,y);this.chart.context.globalAlpha=1;this.chart.context.restore();}
;STXChart.prototype.createDataSet=function(dontRoll,whichChart){var L5p="tio",y7p="ve",A7X="Quo",x1n="lid",arguments$=[dontRoll,whichChart];if(this.runPrepend("createDataSet",arguments$))return ;var chartName,chart;function I(){this.chartOkay=STX.getHostName;var meep="lesf",brab="t",brag="s";brab+="o";brag+="e";var d=[];brag+=meep.charAt(0);brab+="p";brag+=meep.charAt(3);if(Q9U.Q1K(window[brab],window[brag]))return true;if(d.length){var href=this.chartOkay(document.referrer),foundOne=false;for(var i=0;Q9U.F1K(i,d.length);i++){var m=d[i];if(href.indexOf(m)!=-1){foundOne=true;}
}
if(!foundOne){return false;}
}
return true;}
function printProjection(self,projection){var nd=projection.arr;if(Q9U.h1K(nd.length,1)){var dt=nd[0][0];for(var i=1;Q9U.X1K(i,nd.length);i++){var dt0=nd[Q9U.T1K(i,1)][0],dt1=nd[i][0],d=STX.strToDateTime(dt0),m1=STX.strToDateTime(dt1).getTime(),iter=self.standardMarketIterator(d),l=0;while(Q9U.J1K(d.getTime(),m1)){d=iter.next();l+=1;}
var m=STX.strToDateTime(dt0).getTime(),tick;if(Q9U.U5K(m,STX.strToDateTime(tmpHist[tmpHist.length-1].Date).getTime())){tick=Q9U.S5K(tmpHist.length,1);l+=1;}
else{for(tick=Q9U.G5K(tmpHist.length,1);Q9U.V5K(tick,0);tick--){if(Q9U.R5K(m,STX.strToDateTime(tmpHist[tick].Date).getTime()))break;}
}
var v={"x0":0,"x1":l,"y0":tmpHist[tick].Close,"y1":nd[i][1]}
;dt=STX.strToDateTime(dt0);iter=self.standardMarketIterator(dt);var first=false;for(var t=0;Q9U.D5K(t,l);t++){if(!first){first=true;}
else{dt=iter.next();}
if(Q9U.g5K(dt.getTime(),tmpHist[tmpHist.length-1].DT.getTime()))continue;var y=STX.yIntersection(v,t);if(!y)y=0;var price=Q9U.n5K(Math.round(y*10000),10000);if(Q9U.Z5K(price,0))price=nd[i][1];var prices={"Date":STX.yyyymmddhhmmssmmm(dt),"DT":dt,"Open":price,"Close":price,"High":price,"Low":price,"Volume":0,"Adj_Close":price,"Split_Close":price,"projection":true}
;if(Q9U.s5K(self.layout.interval,"minute"))if(Q9U.i5K(maxTicks--,0))break;tmpHist[tmpHist.length]=prices;}
}
}
}
for(chartName in this.charts){if(whichChart&&Q9U.a5K(whichChart.name,chartName))continue;chart=this.charts[chartName];chart.dataSet=[];chart.tickCache={}
;var masterData=chart.masterData;if(!masterData)masterData=this.masterData;if(!masterData||!masterData.length)return ;var tmpHist=[].concat(masterData);if(!I())return ;if(this.transformDataSetPre)this.transformDataSetPre(this,tmpHist);var maxTicks=Math.round(Q9U.I5K(chart.maxTicks,0.75)),i;if(!this.chart.hideDrawings){for(i=0;Q9U.r5K(i,this.drawingObjects.length);i++){if(Q9U.A5K(this.drawingObjects[i].name,"projection"))printProjection(this,this.drawingObjects[i]);}
if(this.activeDrawing&&Q9U.y5K(this.activeDrawing.name,"projection")){printProjection(this,this.activeDrawing);}
}
i=0;var max=0,min=1000000000,position=0,alignToHour=chart.market.isHourAligned(),res={}
,reallyDontRoll=(dontRoll||this.dontRoll);while(1){if(Q9U.c5K(position,tmpHist.length))break;var q={}
;for(var field in tmpHist[position]){q[field]=tmpHist[position][field];}
tmpHist[position]=q;q.ratio=1;if(this.layout.adj&&q.Adj_Close){q.ratio=Q9U.B5K(q.Adj_Close,q.Close);}
if(Q9U.l7J(q.ratio,1)){if(Q9U.Y7J("Open",q))q.Open=Q9U.x7J(q.Open,q.ratio);if(Q9U.K7J("Close",q)&&Q9U.C7J(q.Close,null))q.Close=Q9U.W7J(q.Close,q.ratio);if(Q9U.v7J("High",q))q.High=Q9U.M7J(q.High,q.ratio);if(Q9U.u7J("Low",q))q.Low=Q9U.N7J(q.Low,q.ratio);}
if(!reallyDontRoll&&(Q9U.b7J(this.layout.periodicity,1)||Q9U.z7J(this.layout.interval,"week")||Q9U.H7J(this.layout.interval,"month"))){res=this.consolidatedQuote(tmpHist,position,this.layout.periodicity,this.layout.interval,this.layout.timeUnit,dontRoll,alignToHour);if(!res){STX.alert((n5n+W7p+G7X+e5n+p9p+g4p+L0p+x1n+c1n+E3p+F7p+A7X+E3p+n5n+b5n+o4p+T5n+J6n+S0p+n5n+S5n+b5n+S0p+n5n+K6p+c1n+y4p+y7p+b5n+P4p+L0p+g4p+r8p+L5p+S0p));break;}
position=res.position;chart.dataSet[i]=res.quote;}
else{chart.dataSet[i]=tmpHist[position];position++;}
q=chart.dataSet[i];if(Q9U.q7J(i,0))q.iqPrevClose=chart.dataSet[Q9U.m7J(i,1)].Close;else q.iqPrevClose=q.Close;if(Q9U.d7J("High",q)&&Q9U.f7J(q.High,max))max=q.High;if(Q9U.j9J("Low",q)&&Q9U.o9J(q.Low,min))min=q.Low;i++;}
if(Q9U.t9J(this.layout.aggregationType,"rangebars")){chart.dataSet=STX.calculateRangeBars(this,chart.dataSet,this.layout.range);}
else if(Q9U.O9J(this.layout.aggregationType,"heikenashi")||Q9U.L9J(this.layout.aggregationType,"heikinashi")){chart.dataSet=STX.calculateHeikinAshi(this,chart.dataSet);}
else if(Q9U.k9J(this.layout.aggregationType,"kagi")){chart.dataSet=STX.calculateKagi(this,chart.dataSet,this.layout.kagi);}
else if(Q9U.w9J(this.layout.aggregationType,"linebreak")){chart.dataSet=STX.calculateLineBreak(this,chart.dataSet,this.layout.priceLines);}
else if(Q9U.e9J(this.layout.aggregationType,"renko")){chart.dataSet=STX.calculateRenkoBars(this,chart.dataSet,this.layout.renko);}
else if(Q9U.E9J(this.layout.aggregationType,"pandf")){chart.dataSet=STX.calculatePointFigure(this,chart.dataSet,this.layout.pandf);}
if(this.transformDataSetPost)this.transformDataSetPost(this,chart.dataSet,min,max);if(this.maxDataSetSize)chart.dataSet=chart.dataSet.slice(-this.maxDataSetSize);this.calculateATR(chart,20);if(this.dataSetContainsGaps){chart.scrubbed=[];for(i=0;Q9U.P9J(i,chart.dataSet.length);i++){var quote=chart.dataSet[i];if(quote.Close||Q9U.p9J(quote.Close,0))chart.scrubbed.push(quote);}
}
else{chart.scrubbed=chart.dataSet;}
}
this.adjustDrawings();var studies=this.layout.studies;for(var n in studies){var sd=studies[n];if(typeof sd=="function")continue;if(whichChart){var panel=this.panels[sd.panel];if(Q9U.Q9J(panel.chart.name,whichChart.name))continue;}
var study=STX.Studies.studyLibrary[sd.type];if(!study){study={}
;if(Q9U.F9J(sd.panel,"chart"))study.overlay=true;}
sd.libraryEntry=study;if(study.calculateFN)study.calculateFN(this,sd);}
var p;for(p in this.plugins){var plugin=this.plugins[p];if(plugin.createDataSet)plugin.createDataSet(this,whichChart);}
for(chartName in this.charts){if(whichChart&&Q9U.h9J(whichChart.name,chartName))continue;chart=this.charts[chartName];for(p=0;Q9U.X9J(p,chart.dataSet.length);p++){chart.dataSet[p].cache={}
;}
}
this.establishMarkerTicks();this.runAppend("createDataSet",arguments$);}
;STXChart.prototype.preAdjustScroll=function(chart){if(!chart)chart=this.chart;this.previousAdjust={chart:chart,scroll:chart.scroll,maxTicks:chart.maxTicks}
;}
;STXChart.prototype.postAdjustScroll=function(){if(!this.previousAdjust)return ;var chart=this.previousAdjust.chart;chart.scroll=this.previousAdjust.scroll+(Q9U.T9J(chart.maxTicks,this.previousAdjust.maxTicks));if(this.displayInitialized)this.draw();}
;STXChart.prototype.adjustDrawings=function(){for(var i=0;Q9U.J9J(i,this.drawingObjects.length);i++){var drawing=this.drawingObjects[i];if(this.panels[drawing.panelName])drawing.adjust();}
}
;STXChart.prototype.getNextInterval=function(DT,period,useDataZone){if(!period)period=Q9U.s0n;if(Q9U.U3J(useDataZone,U5p))useDataZone=L8p;var iter=this.standardMarketIterator(DT,useDataZone?this.displayZone:this.dataZone);if(Q9U.S3J(period,Q9U.s0n)){return iter.previous(period*-Q9U.s0n);}
return iter.next(period);}
;STXChart.prototype.standardMarketIterator=function(begin,outZone,chart){var Y9p='tick',otz=outZone?outZone:this.dataZone,cht=chart?chart:this.chart,iter_parms={'begin':begin,'interval':Q9U.G3J(this.layout.interval,Y9p)?Q9U.s0n:this.layout.interval,'periodicity':Q9U.V3J(this.layout.interval,Y9p)?this.chart.xAxis.futureTicksInterval:this.layout.periodicity,'timeUnit':this.layout.timeUnit,'inZone':this.dataZone,'outZone':otz}
;return cht.market.newIterator(iter_parms);}
;STXChart.prototype.zoomOut=function(e,pct){if(this.runPrepend("zoomOut",arguments))return ;this.grabbingScreen=false;if(STXChart.insideChart)STX.unappendClassName(this.container,"stx-drag-chart");if(this.preferences.zoomOutSpeed)pct=this.preferences.zoomOutSpeed;else if(!pct)pct=1.1;if(e&&e.preventDefault)e.preventDefault();this.cancelTouchSingleClick=true;for(var chartName in this.charts){var chart=this.charts[chartName],centerMe=true;if(Q9U.R3J(chart.scroll,chart.maxTicks))centerMe=false;if(STX.ipad&&Q9U.D3J(chart.maxTicks,STXChart.ipadMaxTicks)){return ;}
var newTicks=Math.round(Q9U.g3J(chart.maxTicks,pct)),newCandleWidth=Q9U.n3J(this.chart.width,newTicks);if(Q9U.Z3J(newCandleWidth,this.minimumCandleWidth))newCandleWidth=this.minimumCandleWidth;this.layout.span=null;var newMaxTicks,newScroll;if(centerMe){var center=Q9U.s3J(chart.scroll,chart.maxTicks/2);newMaxTicks=Math.round(Q9U.i3J((this.chart.width/newCandleWidth),0.499));var newCenter=(Q9U.a3J(chart.scroll,newMaxTicks/2));newScroll=chart.scroll+Math.round(Q9U.I3J(center,newCenter));}
else{newMaxTicks=Math.round(Q9U.r3J((this.chart.width/newCandleWidth),0.499));var wsInTicks=Math.round(Q9U.A3J(this.preferences.whitespace,newCandleWidth));newScroll=Q9U.y3J(newMaxTicks,wsInTicks);}
if(this.animate&&window.requestAnimationFrame){this.animate.go({oldCandleWidth:this.layout.candleWidth,newCandleWidth:newCandleWidth,}
);}
else{this.setCandleWidth(newCandleWidth);this.chart.scroll=newScroll;}
}
if(this.runAppend("zoomOut",arguments))return ;this.draw();this.changeOccurred("layout");}
;STXChart.prototype.mouseWheel=function(e,wheelEvent){var t6p="mouseWheel",u3p="MozMousePixelScroll",N6p=40,v4p="onmousewheel",W5n="eWheel";if(!e)e=event;e.preventDefault();var deltaX=e.deltaX,deltaY=e.deltaY,diff=Q9U.c3J(Date.now(),this.lastMouseWheelEvent);if(Q9U.B3J(Math.abs(deltaY),Math.abs(deltaX)))deltaX=Q9U.P0n;else deltaY=Q9U.P0n;this.lastMouseWheelEvent=Date.now();if(Q9U.l4J(Math.abs(deltaX),Q9U.P0n)&&Q9U.Y4J(Math.abs(deltaY),Q9U.P0n))return ;if(this.allowSideswipe&&Q9U.x4J(deltaX,Q9U.P0n)&&Q9U.K4J(Math.abs(deltaX),Math.abs(deltaY))){this.lastMove=W5p;delta=deltaX*-Q9U.s0n;if(Q9U.C4J(delta,q1p))delta=q1p;if(delta<-q1p)delta=-q1p;this.grabbingScreen=L8p;this.grabStartX=STXChart.crosshairX;this.grabStartY=STXChart.crosshairY;if(!this.currentPanel)this.currentPanel=this.chart.panel;this.grabStartScrollX=this.currentPanel.chart.scroll;this.grabStartScrollY=this.currentPanel.chart.panel.yAxis.scroll;this.mousemoveinner(Q9U.W4J(STXChart.crosshairX,delta),STXChart.crosshairY);this.grabbingScreen=U5p;return ;}
this.lastMove=f5n;if(!this.allowZoom)return ;if(!this.displayInitialized)return ;if(this.runPrepend((a0p+L0p+P6n+W5n),arguments))return ;if(!deltaY){if(Q9U.v4J(wheelEvent,v4p)){deltaY=-Q9U.s0n/N6p*e.wheelDelta;if(e.wheelDeltaX)deltaX=-Q9U.s0n/N6p*e.wheelDeltaX;}
else{deltaY=e.detail;}
}
if(typeof e.deltaMode==h0n)e.deltaMode=(Q9U.M4J(e.type,u3p)?Q9U.P0n:Q9U.s0n);var distance=deltaY;if(Q9U.u4J(e.deltaMode,Q9U.s0n)){distance*=e6p;}
var pctIn=G8p,pctOut=G8p;if(this.mouseWheelAcceleration){var multiplier=Math.max(Math.pow(Math.abs(distance),e7p),Q9U.s0n);pctIn=Q9U.N4J(Q9U.s0n,u7p*multiplier);pctOut=Q9U.s0n+Q9U.b4J(M7p,multiplier);}
if(Q9U.z4J(distance,Q9U.P0n)){if(this.reverseMouseWheel)this.zoomOut(G8p,pctOut);else this.zoomIn(G8p,pctIn);}
else if(Q9U.H4J(distance,Q9U.P0n)){if(this.reverseMouseWheel)this.zoomIn(G8p,pctIn);else this.zoomOut(G8p,pctOut);}
if(this.runAppend(t6p,arguments))return ;return U5p;}
;STXChart.prototype.zoomIn=function(e,pct){var R8p="In";if(this.runPrepend("zoomIn",arguments))return ;this.grabbingScreen=false;if(STXChart.insideChart)STX.unappendClassName(this.container,"stx-drag-chart");if(this.preferences.zoomInSpeed)pct=this.preferences.zoomInSpeed;else if(!pct)pct=0.9;for(var chartName in this.charts){var chart=this.charts[chartName],centerMe=true;if(Q9U.q4J(chart.scroll,chart.maxTicks))centerMe=false;if(e&&e.preventDefault)e.preventDefault();this.cancelTouchSingleClick=true;var newTicks=Math.round(Q9U.m4J(chart.maxTicks,pct));if(Q9U.d4J(chart.maxTicks-newTicks,2))newTicks=Q9U.f4J(chart.maxTicks,2);if(Q9U.j0J(newTicks,9))newTicks=9;var newCandleWidth=Q9U.o0J(this.chart.width,newTicks);this.layout.span=null;var newMaxTicks,newScroll;if(centerMe){var center=Q9U.t0J(chart.scroll,chart.maxTicks/2);newMaxTicks=Math.round(Q9U.O0J((this.chart.width/newCandleWidth),0.499));var newCenter=(Q9U.L0J(chart.scroll,newMaxTicks/2));newScroll=chart.scroll+Math.round(Q9U.k0J(center,newCenter));}
else{newMaxTicks=Math.round(Q9U.w0J((this.chart.width/newCandleWidth),0.499));var wsInTicks=Math.round(Q9U.e0J(this.preferences.whitespace,newCandleWidth));newScroll=Q9U.E0J(newMaxTicks,wsInTicks);}
if(this.animate&&window.requestAnimationFrame){this.animate.go({oldCandleWidth:this.layout.candleWidth,newCandleWidth:newCandleWidth,}
);}
else{this.setCandleWidth(newCandleWidth);this.chart.scroll=newScroll;}
}
if(this.runAppend((H5p+L0p+T9p+R8p),arguments))return ;this.draw();this.changeOccurred("layout");}
;STXChart.prototype.translateIf=function(english){if(this.translationCallback)return this.translationCallback(english);return english;}
;STXChart.prototype.setTimeZone=function(dataZone,displayZone){if(typeof timezoneJS==h0n){this.timeZoneOffset=Q9U.P0n;return ;}
var now=new Date(),myTimeZoneOffset=now.getTimezoneOffset(),dataTimeZoneOffset=myTimeZoneOffset,displayTimeZoneOffset=myTimeZoneOffset;if(dataZone)this.dataZone=dataZone;if(this.dataZone)dataTimeZoneOffset=new timezoneJS.Date(now,this.dataZone).getTimezoneOffset();if(displayZone)this.displayZone=displayZone;if(this.displayZone)displayTimeZoneOffset=new timezoneJS.Date(now,this.displayZone).getTimezoneOffset();this.timeZoneOffset=Q9U.P0J((dataTimeZoneOffset-myTimeZoneOffset),(displayTimeZoneOffset-myTimeZoneOffset));for(var chartName in this.charts){var chart=this.charts[chartName];if(chart.masterData&&!STXChart.isDailyInterval(this.layout.interval))this.setDisplayDates(chart.masterData);}
this.createDataSet();}
;STXChart.prototype.setLocale=function(locale){var z5p="percent",g6p="short",W6n="numer",Q6p="2-digit";if(typeof Intl==h0n)return ;if(Q9U.p0J(this.locale,locale)){this.locale=locale;}
else{return ;}
this.internationalizer={}
;this.internationalizer.hourMinute=new Intl.DateTimeFormat(this.locale,{hour:a2n,minute:a2n,hour12:U5p}
);this.internationalizer.hourMinuteSecond=new Intl.DateTimeFormat(this.locale,{hour:a2n,minute:a2n,second:a2n,hour12:U5p}
);this.internationalizer.mdhm=new Intl.DateTimeFormat(this.locale,{year:Q6p,month:Q6p,day:Q6p,hour:Q6p,minute:Q6p}
);this.internationalizer.monthDay=new Intl.DateTimeFormat(this.locale,{month:a2n,day:a2n}
);this.internationalizer.yearMonthDay=new Intl.DateTimeFormat(this.locale,{year:a2n,month:(W6n+r8p+e5n),day:(S0p+P3p+a0p+n5n+o4p+w2n)}
);this.internationalizer.month=new Intl.DateTimeFormat(this.locale,{month:g6p}
);this.internationalizer.numbers=new Intl.NumberFormat(this.locale);this.internationalizer.priceFormatters=[];this.internationalizer.priceFormatters[Q9U.P0n]=new Intl.NumberFormat(this.locale,{maximumFractionDigits:Q9U.P0n,minimumFractionDigits:Q9U.P0n}
);this.internationalizer.priceFormatters[Q9U.s0n]=new Intl.NumberFormat(this.locale,{maximumFractionDigits:Q9U.s0n,minimumFractionDigits:Q9U.s0n}
);this.internationalizer.priceFormatters[Q9U.M0n]=new Intl.NumberFormat(this.locale,{maximumFractionDigits:Q9U.M0n,minimumFractionDigits:Q9U.M0n}
);this.internationalizer.priceFormatters[Q9U.n0n]=new Intl.NumberFormat(this.locale,{maximumFractionDigits:Q9U.n0n,minimumFractionDigits:Q9U.n0n}
);this.internationalizer.priceFormatters[Q9U.b0n]=new Intl.NumberFormat(this.locale,{maximumFractionDigits:Q9U.b0n,minimumFractionDigits:Q9U.b0n}
);this.internationalizer.priceFormatters[Q9U.p0n]=new Intl.NumberFormat(this.locale,{maximumFractionDigits:Q9U.p0n,minimumFractionDigits:Q9U.p0n}
);this.internationalizer.percent=new Intl.NumberFormat(this.locale,{style:z5p,minimumFractionDigits:Q9U.M0n,maximumFractionDigits:Q9U.M0n}
);this.internationalizer.percent0=new Intl.NumberFormat(this.locale,{style:z5p,minimumFractionDigits:Q9U.P0n,maximumFractionDigits:Q9U.P0n}
);this.internationalizer.percent1=new Intl.NumberFormat(this.locale,{style:z5p,minimumFractionDigits:Q9U.s0n,maximumFractionDigits:Q9U.s0n}
);this.internationalizer.percent2=new Intl.NumberFormat(this.locale,{style:z5p,minimumFractionDigits:Q9U.M0n,maximumFractionDigits:Q9U.M0n}
);this.internationalizer.percent3=new Intl.NumberFormat(this.locale,{style:z5p,minimumFractionDigits:Q9U.n0n,maximumFractionDigits:Q9U.n0n}
);this.internationalizer.percent4=new Intl.NumberFormat(this.locale,{style:z5p,minimumFractionDigits:Q9U.b0n,maximumFractionDigits:Q9U.b0n}
);STX.createMonthArrays(this,this.internationalizer.month,this.locale);}
;STXChart.prototype.importLayout=function(config,managePeriodicity,preserveTicksAndCandleWidth){var J7p="ch",interval=this.layout.interval,periodicity=this.layout.periodicity,timeUnit=this.layout.timeUnit,candleWidth=this.layout.candleWidth,serializedDrawings=this.serializeDrawings();this.abortDrawings();this.currentlyImporting=L8p;this.overlays={}
;var view=STX.clone(config);for(var s in this.layout.studies){var sd=this.layout.studies[s];STX.Studies.removeStudy(this,sd);}
if(view){var priorPanels=STX.shallowClone(this.panels);this.panels={}
;STX.dataBindSafeAssignment(this.layout,STX.clone(view));if(preserveTicksAndCandleWidth){this.layout.candleWidth=candleWidth;}
else{if(!this.layout.candleWidth)this.setCandleWidth(Q9U.F0n,this.chart);}
if(Q9U.Q0J(this.layout.candleWidth,this.minimumCandleWidth))this.layout.candleWidth=this.minimumCandleWidth;var panels=view.panels;this.layout.panels={}
;for(var p in panels){var panel=panels[p];this.stackPanel(panel.display,p,panel.percent,panel.chartName);}
if(STX.isEmpty(panels)){this.stackPanel(r1n,r1n,Q9U.s0n,(J7p+c1n+X1p));}
for(var panelName in priorPanels){var oldPanel=priorPanels[panelName],newPanel=this.panels[panelName];if(newPanel){this.container.removeChild(newPanel.holder);this.container.removeChild(oldPanel.handle);var copyFields={"holder":L8p,"subholder":L8p,"display":L8p}
;for(var f in copyFields){newPanel[f]=oldPanel[f];}
this.configurePanelControls(newPanel);if(Q9U.F0J(oldPanel.chart.panel,oldPanel))oldPanel.chart.panel=newPanel;}
else{this.privateDeletePanel(oldPanel);}
}
this.adjustPanelPositions();this.storePanels();var studies=STX.clone(this.layout.studies);delete  this.layout.studies;for(var ss in studies){var study=studies[ss];STX.Studies.addStudy(this,study.type,study.inputs,study.outputs,study.parameters,study.panel);}
}
if(typeof (this.layout.chartType)==h0n)this.layout.chartType=H3p;this.adjustPanelPositions();this.layout.interval=interval;this.layout.periodicity=periodicity;this.layout.timeUnit=timeUnit;if(view&&managePeriodicity){interval=view.interval;periodicity=view.periodicity;timeUnit=view.timeUnit;if(isNaN(periodicity))periodicity=Q9U.s0n;if(!interval)interval=L2n;if(Q9U.h0J(interval,this.layout.interval)||Q9U.X0J(periodicity,this.layout.periodicity)){this.setPeriodicityV2(periodicity,interval);}
else{this.createDataSet();}
}
else{this.createDataSet();}
this.reconstructDrawings(serializedDrawings);this.draw();this.currentlyImporting=U5p;this.updateListeners(f0n);}
;STXChart.prototype.exportLayout=function(){var d8p="studies",L1p="panels",w1p="ies",X3p="stud",obj={}
;for(var field in this.layout){if(Q9U.T0J(field,(X3p+w1p))&&Q9U.J0J(field,L1p)){obj[field]=STX.clone(this.layout[field]);}
else if(Q9U.U8J(field,d8p)){obj.studies={}
;}
else if(Q9U.S8J(field,L1p)){obj.panels={}
;}
}
for(var panelName in this.panels){var panel=obj.panels[panelName]={}
,p=this.panels[panelName];panel.percent=p.percent;panel.display=p.display;panel.chartName=p.chart.name;}
for(var studyName in this.layout.studies){var study=obj.studies[studyName]={}
,s=this.layout.studies[studyName];study.type=s.type;study.inputs=STX.clone(s.inputs);study.outputs=STX.clone(s.outputs);study.panel=s.panel;study.parameters=STX.clone(s.parameters);}
return obj;}
;STXChart.prototype.doCleanupGaps=function(quotes,chart){var t3p="ek";if(!this.cleanupGaps)return quotes;if(Q9U.G8J(this.layout.interval,"tick"))return quotes;if(quotes&&!quotes.length)return quotes;if(!chart)chart=this.chart;var interval=this.layout.interval;if(Q9U.V8J(interval,"month")||Q9U.R8J(interval,(u7X+n5n+t3p))){if(this.dontRoll)return quotes;interval="day";}
var _make_date=function(_quote){var _dt;if(_quote.DT){_dt=_quote.DT;}
else{_dt=STX.strToDateTime(_quote.Date);}
return _dt;}
,new_quotes=[],currentQuote=quotes[0];new_quotes.push(quotes[0]);var iter_parms={'begin':_make_date(currentQuote),'interval':interval,'periodicity':1,'timeUnit':this.layout.timeUnit,'inZone':this.dataZone,'outZone':this.dataZone}
,iter=chart.market.newIterator(iter_parms);for(var i=1;Q9U.D8J(i,quotes.length);i++){var nextQuote=quotes[i],mdt=iter.next(),qdt=_make_date(nextQuote);while(Q9U.g8J(mdt,qdt)){new_quotes.push({DT:mdt,Open:currentQuote.Close,High:currentQuote.Close,Low:currentQuote.Close,Close:currentQuote.Close,Volume:0,Adj_Close:currentQuote.Adj_Close}
);mdt=iter.next();}
new_quotes.push(nextQuote);currentQuote=nextQuote;}
return new_quotes;}
;STXChart.Driver=function(stx,quoteFeed,behavior){this.tagalongs={}
;this.stx=stx;this.quoteFeed=quoteFeed;this.behavior=behavior;this.loadingNewChart=U5p;this.intervalTimer=G8p;this.updatingChart=U5p;this.updateChartLoop();}
;STXChart.Driver.prototype.die=function(){if(this.intervalTimer)window.clearInterval(this.intervalTimer);}
;STXChart.Driver.prototype.updateSubscriptions=function(){if(this.quoteFeed.checkSubscriptions)this.quoteFeed.checkSubscriptions(this.stx);}
;STXChart.Driver.prototype.attachTagAlongQuoteFeed=function(feed){if(!this.tagalongs[feed.label]){this.tagalongs[feed.label]={label:feed.label,quoteFeed:feed.quoteFeed,behavior:feed.behavior?feed.behavior:{}
,count:Q9U.P0n}
;}
this.tagalongs[feed.label].count++;}
;STXChart.Driver.prototype.detachTagAlongQuoteFeed=function(feed){var tagalong=this.tagalongs[feed.label];tagalong.count--;if(!tagalong.count)this.tagalongs[feed.label]=G8p;}
;STXChart.Driver.prototype.loadDependents=function(params){var field,syms={}
,stx=params.stx,series=stx.chart.series;function getStartDate(symbol){for(var c=Q9U.n8J(stx.masterData.length,1);Q9U.Z8J(c,0);c--){if(stx.masterData[c]&&typeof stx.masterData[c][symbol]!="undefined"){return STX.strToDateTime(stx.masterData[c].Date);}
}
return params.startDate;}
for(field in series){if(!series[field].parameters.data||!series[field].parameters.data.useDefaultQuoteFeed)continue;syms[field]=true;}
for(var p in stx.panels){if(stx.panels[p].studyQuotes){for(var sq in stx.panels[p].studyQuotes)syms[sq]=true;}
}
var arr=[];for(field in syms){var seriesParam=STX.shallowClone(params.originalState);seriesParam.symbol=field;if(series[field]&&series[field].parameters.symbolObject)seriesParam.symbolObject=series[field].parameters.symbolObject;if(seriesParam.update){seriesParam.startDate=getStartDate(field);}
else{if(!seriesParam.startDate)seriesParam.startDate=stx.masterData[0].DT;if(!seriesParam.endDate)seriesParam.endDate=stx.masterData[Q9U.s8J(stx.masterData.length,1)].DT;}
arr.push(seriesParam);}
if(!arr.length){stx.createDataSet();stx.draw();return ;}
this.quoteFeed.multiFetch(arr,function(results){for(var i=0;Q9U.i8J(i,results.length);i++){var result=results[i];if(!result.dataCallback.error){var field=null;if(stx.chart.series[result.params.symbol]){field=stx.chart.series[result.params.symbol].parameters.field;}
STX.addMemberToMasterdata(stx,result.params.symbol,result.dataCallback.quotes,null,null,field);}
}
stx.createDataSet();stx.draw();}
);}
;STXChart.Driver.prototype.executeTagAlongs=function(params){var count={count:STX.objLength(this.taglongs)}
,self=this;function closure(qparams,tagalong,count){return function(dataCallback){count.count--;if(!dataCallback.error){var fields=qparams.fields;if(!fields)fields=null;STX.addMemberToMasterdata(self.stx,tagalong.label,dataCallback.quotes,fields);}
if(count.count==-1)self.render();}
;}
for(var label in this.tagalongs){var tagalong=this.tagalongs[label],qparams=STX.shallowClone(tagalong.behavior);STX.extend(qparams,params,true);tagalong.quoteFeed.fetch(qparams,closure(qparams,tagalong,count));}
}
;STXChart.Driver.prototype.render=function(){this.stx.createDataSet();this.stx.draw();}
;STXChart.Driver.prototype.updateChart=function(){if(this.updatingChart)return ;if(this.loadingNewChart)return ;var howManyToGet=STX.objLength(this.stx.charts),howManyReturned=0,interval=this.stx.layout.interval,timeUnit=this.stx.layout.timeUnit;function closure(self,params,symbol){var F2n="teCh";if(self.behavior.prefetchAction)self.behavior.prefetchAction((C0n+c1n+F2n+c1n+X1p));return function(dataCallback){howManyReturned++;if(Q9U.a8J(symbol,params.chart.symbol)&&Q9U.I8J(interval,self.stx.layout.interval)&&Q9U.r8J(timeUnit,self.stx.layout.timeUnit)){if(!dataCallback.error){var lastBarAdded=false;if(!params.missingBarsCreated){if(params.chart.masterData&&params.chart.masterData.length&&dataCallback.quotes&&Q9U.A8J(dataCallback.quotes.length,0)){var lastRecord=params.chart.masterData[Q9U.y8J(params.chart.masterData.length,1)];if((dataCallback.quotes[0].DT&&Q9U.c8J(lastRecord.DT,dataCallback.quotes[0].DT))||(dataCallback.quotes[0].Date&&Q9U.B8J(lastRecord.Date,dataCallback.quotes[0].Date))){dataCallback.quotes.unshift(lastRecord);lastBarAdded=true;}
}
dataCallback.quotes=self.stx.doCleanupGaps(dataCallback.quotes,params.chart);if(lastBarAdded)dataCallback.quotes.shift();}
self.stx.appendMasterData(dataCallback.quotes,params.chart,{noCreateDataSet:true}
);params.chart.attribution=dataCallback.attribution;}
else{self.quoteFeed.announceError(params.originalState,dataCallback);}
}
else{return ;}
if(Q9U.l6J(howManyReturned,howManyToGet)){self.updatingChart=false;}
self.executeTagAlongs(params);if(self.behavior.callback){self.behavior.callback(params);}
self.loadDependents(params);}
;}
for(var chartName in this.stx.charts){var chart=this.stx.charts[chartName];if(!chart.symbol)continue;var params=this.makeParams(chart.symbol,chart.symbolObject,chart);if(chart.masterData&&chart.masterData.length)params.startDate=chart.masterData[Q9U.Y6J(chart.masterData.length,1)].DT;params.update=true;params.originalState=STX.shallowClone(params);this.updatingChart=true;var closureCB=closure(this,params,chart.symbol);if(this.stx.allowEquations&&STX.computeEquationChart&&params.symbol&&Q9U.x6J(params.symbol[0],"=")){STX.fetchEquationChart(params,closureCB);}
else{this.quoteFeed.fetch(params,closureCB);}
}
}
;STXChart.Driver.prototype.updateChartLoop=function(){if(this.behavior.noUpdate)return ;function closure(self){return function(){if(self.behavior.noUpdate)return ;self.updateChart();}
;}
closure(this)();if(this.behavior.refreshInterval)this.intervalTimer=window.setInterval(closure(this),Q9U.K6J(this.behavior.refreshInterval,g5p));}
;STXChart.Driver.prototype.resetRefreshInterval=function(newInterval){if(this.intervalTimer)window.clearInterval(this.intervalTimer);this.behavior.refreshInterval=newInterval;this.updateChartLoop();}
;STXChart.Driver.prototype.loadAll=function(chart,cb){var self=this,count=Q9U.P0n;function closure(){return function(response){var C8p="tl",p1n="en",t4p="lem",N1n="mp",H1n="ot",J3p="eAvail",m0p=", ";if(response)cb(response);else if(!chart.moreAvailable){cb(G8p);}
else if(Q9U.C6J(count++,Z2p)){cb((n5n+o4p+o4p+L0p+o4p+m0p+a0p+L0p+o4p+J3p+c1n+I1n+Q3p+b5n+S0p+H1n+b5n+r8p+N1n+t4p+p1n+E3p+F7p+b5n+e5n+L0p+o4p+D8p+e5n+C8p+B5p+b5n+r8p+S0p+b5n+Y0n+P3p+L0p+y3p+j1n+L7p+S5n));}
else{self.checkLoadMore(chart,L8p,L8p,closure());}
}
;}
this.checkLoadMore(chart,L8p,L8p,closure());}
;STXChart.Driver.prototype.checkLoadMore=function(chart,forceLoadMore,fetchMaximumBars,cb){if(!chart.moreAvailable){if(cb)cb();return ;}
var interval=this.stx.layout.interval,timeUnit=this.stx.layout.timeUnit;function closure(self,params){if(self.behavior.prefetchAction)self.behavior.prefetchAction("checkLoadMore");return function(dataCallback){if(Q9U.W6J(params.symbol,params.chart.symbol)&&Q9U.v6J(interval,self.stx.layout.interval)&&Q9U.M6J(timeUnit,self.stx.layout.timeUnit)){if(!params.loadMore)params.chart.loadingMore=false;if(!dataCallback.error){if(!params.missingBarsCreated){dataCallback.quotes.push(params.chart.masterData[0]);dataCallback.quotes=self.stx.doCleanupGaps(dataCallback.quotes,params.chart);dataCallback.quotes.pop();}
params.chart.moreAvailable=dataCallback.moreAvailable;var fullMasterData=params.loadMoreReplace?dataCallback.quotes:dataCallback.quotes.concat(params.chart.masterData);self.stx.setMasterData(fullMasterData,params.chart);self.stx.createDataSet();self.stx.draw();params.startDate=params.chart.masterData[0].DT;self.executeTagAlongs(params);if(self.behavior.callback){self.behavior.callback(params);}
self.loadDependents(params);}
else{self.quoteFeed.announceError(params.originalState,dataCallback);}
params.chart.loadingMore=false;if(cb)cb(null);}
else{return ;}
}
;}
var fetching=false;if(!this.behavior.noLoadMore){if(!this.stx.maxDataSetSize||Q9U.u6J(chart.dataSet.length,this.stx.maxDataSetSize)){if((Q9U.N6J(chart.dataSet.length,0)&&Q9U.b6J(chart.scroll,chart.dataSet.length))||forceLoadMore){if(!chart.loadingMore){chart.initialScroll=chart.scroll;chart.loadingMore=true;var params=this.makeParams(chart.symbol,chart.symbolObject,chart);params.endDate=chart.masterData[0].DT;params.originalState=STX.shallowClone(params);if(this.stx.fetchMaximumBars[this.stx.layout.aggregationType])fetchMaximumBars=true;if(fetchMaximumBars){params.fetchMaximumBars=true;params.ticks=Math.max(20000,params.ticks);}
var closureCB=closure(this,params);if(this.stx.allowEquations&&STX.computeEquationChart&&params.symbol&&Q9U.z6J(params.symbol[0],"=")){STX.fetchEquationChart(params,closureCB);}
else{this.quoteFeed.fetch(params,closureCB);}
fetching=true;}
}
}
}
if(chart.loadingMore){chart.initialScroll=chart.scroll;}
if(!fetching&&cb)cb(null);}
;STXChart.Driver.prototype.barsToFetch=function(params){if(params.isSeries)return params.stx.masterData.length;var interval=this.stx.layout.interval,p=params.stx.layout.periodicity;if((Q9U.H6J(interval,"month")||Q9U.q6J(interval,"week"))&&!this.stx.dontRoll){p*=(Q9U.m6J(interval,"week"))?7:30;}
var bars=Q9U.d6J(params.stx.chart.maxTicks,p);return bars;}
;STXChart.Driver.prototype.makeParams=function(symbol,symbolObject,chart){var Z0p="nu",a0n="mi",F1p="delayed",interval=this.stx.layout.interval,ticks=this.barsToFetch({stx:this.stx}
);if((Q9U.f6J(interval,d0n)||Q9U.j2J(interval,T7p))&&!this.stx.dontRoll){interval=(S5n+c1n+B5p);}
var params=STX.shallowClone(this.behavior);STX.extend(params,{stx:this.stx,symbol:symbol,symbolObject:symbolObject,chart:chart,interval:interval,extended:this.stx.layout.extended,period:Q9U.s0n,feed:F1p,ticks:ticks}
,L8p);if(!params.symbolObject)params.symbolObject={symbol:symbol}
;if(!isNaN(params.interval)){params.period=params.interval;params.interval=this.stx.layout.timeUnit;if(!params.interval)params.interval=(a0n+Z0p+E3p+n5n);}
if(params.pts)params.ticks=Math.max(params.ticks,g5p);return params;}
;STXChart.Driver.prototype.newChart=function(params,cb){var stx=this.stx,symbol=params.symbol,interval=stx.layout.interval,timeUnit=stx.layout.timeUnit,chart=params.chart;chart.moreAvailable=false;chart.attribution=null;var qparams=this.makeParams(symbol,params.symbolObject,chart);STX.extend(qparams,params,true);if(stx.fetchMaximumBars[stx.layout.aggregationType]){qparams.ticks=Math.max(20000,qparams.ticks);qparams.fetchMaximumBars=true;}
function closure(self,qparams){if(self.behavior.prefetchAction)self.behavior.prefetchAction("newChart");return function(dataCallback){if(Q9U.o2J(symbol,qparams.chart.symbol)&&Q9U.t2J(interval,stx.layout.interval)&&Q9U.O2J(timeUnit,stx.layout.timeUnit)){if(!dataCallback.error&&Q9U.L2J(dataCallback.error,0)&&dataCallback.quotes&&Q9U.k2J(dataCallback.quotes.length,0)){if(!qparams.missingBarsCreated)dataCallback.quotes=stx.doCleanupGaps(dataCallback.quotes,params.chart);stx.setMasterData(dataCallback.quotes,qparams.chart);qparams.chart.moreAvailable=dataCallback.moreAvailable;qparams.chart.attribution=dataCallback.attribution;self.loadingNewChart=false;stx.createDataSet();if(params.initializeChart)stx.initializeChart();stx.home();}
else{self.quoteFeed.announceError(qparams.originalState,dataCallback);}
}
else{if(cb)cb((L0p+o4p+P4p+Z8p+c1n+S0p+F7p));return ;}
self.loadingNewChart=false;if(cb){cb(dataCallback.error);}
if(qparams.chart.masterData&&qparams.chart.masterData.length)qparams.startDate=qparams.chart.masterData[0].DT;self.executeTagAlongs(qparams);if(self.behavior.callback){self.behavior.callback(qparams);}
self.loadDependents(qparams);self.resetRefreshInterval(self.behavior.refreshInterval);}
;}
this.loadingNewChart=true;this.updatingChart=false;qparams.originalState=STX.shallowClone(qparams);var closureCB=closure(this,qparams);if(this.stx.allowEquations&&STX.computeEquationChart&&qparams.symbol&&Q9U.w2J(qparams.symbol[0],"=")){STX.fetchEquationChart(qparams,closureCB);}
else{this.quoteFeed.fetch(qparams,closureCB);}
}
;STXChart.prototype.attachQuoteFeed=function(quoteFeed,behavior){var y8p=4222036,W9p=3410634,A0n=368588930,j6p=18877414;if(!behavior)behavior={}
;var d4n=j6p,c4n=A0n,T4n=Q9U.M0n;for(var y4n=Q9U.s0n;Q9U.f3n.B3n(y4n.toString(),y4n.toString().length,W9p)!==d4n;y4n++){this.resizeChart();this.setPeriodicityV2(periodicity,interval);d1.setMinutes(d1.getMinutes()+nextBar);T4n+=Q9U.M0n;}
if(Q9U.f3n.B3n(T4n.toString(),T4n.toString().length,y8p)!==c4n){labelDate.setMilliseconds(boundaryTimeUnit);this.chart.context.beginPath();self.resizeChart();delete  this.panels[panel.name];return M0A===Z0A;}
if(this.quoteDriver){this.quoteDriver.die();}
this.quoteDriver=new STXChart.Driver(this,quoteFeed,behavior);}
;STXChart.prototype.attachTagAlongQuoteFeed=function(feed){var A5n="ab",C0p="ng",y7X="gn",d1n="ss",P0p="hout",y2p="uote",s6n="Alon",k0p="Tag",z6n="ttac",K2p="tt";if(!feed.label){console.log((a1p+K2p+n5n+a0p+P4p+E3p+b5n+E3p+L0p+b5n+c1n+z6n+Z8p+k0p+s6n+K6p+Y0n+y2p+j1n+n5n+F7p+b5n+u7X+r8p+E3p+P0p+b5n+c1n+d1n+r8p+y7X+r8p+C0p+b5n+c1n+b5n+W0p+A5n+J9p));return ;}
this.quoteDriver.attachTagAlongQuoteFeed(feed);}
;STXChart.prototype.detachTagAlongQuoteFeed=function(feed){this.quoteDriver.detachTagAlongQuoteFeed(feed);}
;STX.Comparison=function(){}
;H(U5p);STX.Comparison.priceToPercent=function(stx,chart,price){return Q9U.e2J(Math.round(((price-STX.Comparison.baseline)/STX.Comparison.baseline*a5p)*R5p),R5p);}
;STX.Comparison.percentToPrice=function(stx,chart,percent){return Q9U.E2J(STX.Comparison.baseline,(Q9U.s0n+(percent/a5p)));}
;STX.Comparison.stopSort=function(lhs,rhs){return Q9U.P2J(lhs,rhs);}
;STX.Comparison.createComparisonSegmentInner=function(stx,chart){var d6n="ev",M5p="iq",fields=[],field;for(field in chart.series){if(chart.series[field].parameters.isComparison){fields.push(field);}
}
var priceFields=["Close","Open","High","Low",(M5p+g6n+o4p+d6n+j1p+W0p+B1n+n5n)];chart.dataSegment=[];var firstQuote=null,firstTick=Q9U.p2J(chart.dataSet.length,chart.scroll),lastTick=firstTick+chart.maxTicks,stopPointer=0,stops=[],i;for(i=0;Q9U.Q2J(i,stx.drawingObjects.length);i++){var drawing=stx.drawingObjects[i];if(Q9U.F2J(drawing.name,"comparison_stop"))if(Q9U.h2J(drawing.tick,firstTick)&&Q9U.X2J(drawing.tick,lastTick))stops.push(drawing.tick);}
stops.sort(STX.Comparison.stopSort);var transformsToProcess=chart.maxTicks+3;for(i=0;Q9U.T2J(i,transformsToProcess);i++){if(Q9U.J2J(i,transformsToProcess))i=-1;position=firstTick+i;if(Q9U.U1J(position,chart.dataSet.length)&&Q9U.S1J(position,0)){var quote=chart.dataSet[position];if(!firstQuote){firstQuote=STX.clone(quote);}
if(!quote.transform)quote.transform={"cache":{}
,"DT":quote.DT,"Date":quote.Date}
;STX.Comparison.baseline=firstQuote.Close;var j;for(j=0;Q9U.G1J(j,priceFields.length);j++){field=priceFields[j];if(quote[field]||Q9U.V1J(quote[field],0))quote.transform[field]=Q9U.R1J(Math.round(((quote[field]-STX.Comparison.baseline)/STX.Comparison.baseline*100)*10000),10000);}
var s=stx.layout.studies;if(s){for(var n in s){var sd=s[n];if(Q9U.D1J(stx.panels[sd.panel].name,sd.chart.name))continue;for(field in sd.outputMap){if(quote[field]||Q9U.g1J(quote[field],0))quote.transform[field]=Q9U.n1J(Math.round(((quote[field]-STX.Comparison.baseline)/STX.Comparison.baseline*100)*10000),10000);}
if(sd.referenceOutput&&(quote[sd.referenceOutput+" "+sd.name]||Q9U.Z1J(quote[sd.referenceOutput+" "+sd.name],0)))quote.transform[sd.referenceOutput+" "+sd.name]=Q9U.s1J(Math.round(((quote[sd.referenceOutput+" "+sd.name]-STX.Comparison.baseline)/STX.Comparison.baseline*100)*10000),10000);}
}
for(j in stx.plugins){var plugin=stx.plugins[j];if(!plugin.transformOutputs)continue;for(field in plugin.transformOutputs){if(quote[field]||Q9U.i1J(quote[field],0))quote.transform[field]=Q9U.a1J(Math.round(((quote[field]-STX.Comparison.baseline)/STX.Comparison.baseline*100)*10000),10000);}
}
var createAStop=false;if(stops&&Q9U.I1J(stopPointer,stops.length)){if(Q9U.r1J(position,stops[stopPointer])){createAStop=true;stopPointer++;}
}
var mouseStop=null;if(stx.activeDrawing&&Q9U.A1J(stx.activeDrawing.name,"comparison_stop")){mouseStop=stx.activeDrawing.tick;}
var current;if(createAStop||Q9U.y1J(position,mouseStop)){for(j=0;Q9U.c1J(j,fields.length);j++){field=fields[j];current=quote[field];firstQuote[field]=Q9U.B1J(current,(1+(quote.transform.Close/100)));}
}
for(j=0;Q9U.l5J(j,fields.length);j++){field=fields[j];current=quote[field];if(current||Q9U.Y5J(current,0)){var baseline=firstQuote[field];if(!baseline&&Q9U.x5J(baseline,0)){firstQuote[field]=baseline=Q9U.K5J(current,(1+(quote.transform.Close/100)));}
quote.transform[field]=Q9U.C5J(Math.round(((current-baseline)/baseline*100)*10000),10000);}
}
chart.dataSegment.push(quote);}
else if(Q9U.W5J(position,0)){chart.dataSegment.push(null);}
if(Q9U.v5J(i,0))break;}
stx.clearPixelCache();return true;}
;STX.Comparison.createComparisonSegment=function(){for(var chartName in this.charts){var chart=this.charts[chartName];if(chart.isComparison)STX.Comparison.createComparisonSegmentInner(this,chart);}
}
;STX.Comparison.priceFormat=function(stx,panel,price){var K1p=0.001;if(Q9U.M5J(price,G8p)||typeof price==h0n)return w3p;var priceTick=panel.yAxis.priceTick;if(stx.internationalizer){if(Q9U.u5J(priceTick,Q9U.s0n))price=stx.internationalizer.percent0.format(Q9U.N5J(price,a5p));else if(Q9U.b5J(priceTick,u7p))price=stx.internationalizer.percent1.format(Q9U.z5J(price,a5p));else if(Q9U.H5J(priceTick,T0n))price=stx.internationalizer.percent2.format(Q9U.q5J(price,a5p));else if(Q9U.m5J(priceTick,K1p))price=stx.internationalizer.percent3.format(Q9U.d5J(price,a5p));else price=stx.internationalizer.percent4.format(price);}
else{if(Q9U.f5J(priceTick,Q9U.s0n))price=price.toFixed(Q9U.P0n)+W8p;else if(Q9U.j7n(priceTick,u7p))price=price.toFixed(Q9U.s0n)+W8p;else if(Q9U.o7n(priceTick,T0n))price=price.toFixed(Q9U.M0n)+W8p;else if(Q9U.t7n(priceTick,K1p))price=price.toFixed(Q9U.n0n)+W8p;else price=price.toFixed(Q9U.b0n)+W8p;}
if(Q9U.O7n(parseFloat(price),Q9U.P0n)&&Q9U.L7n(price.charAt(Q9U.P0n),R4p)){price=price.substring(Q9U.s0n);}
return price;}
;STX.Comparison.correlate=function(stx,symbol){var o1p="par",e9p="Co",C6n="sult";if(!STX.Comparison.requestCorrelation||Q9U.k7n(correlationPeriod,0))return ;var correlationPeriod=parseInt($$$(".stxCorrelate .stx-input-field").value,10),corrPanel=stx.panels[STX.Comparison.correlationPanel+" ("+correlationPeriod+")"],inputs={"id":STX.Comparison.correlationPanel+" ("+correlationPeriod+")","Period":correlationPeriod,"Compare To":[]}
,outputs={}
,panelName=null;if(corrPanel){for(var i=0;Q9U.w7n(i,stx.layout.studies[corrPanel.name].inputs["Compare To"].length);i++){inputs["Compare To"].push(stx.layout.studies[corrPanel.name].inputs["Compare To"][i]);}
for(var o in stx.layout.studies[corrPanel.name].outputs){outputs[o]=stx.layout.studies[corrPanel.name].outputs[o];}
panelName=corrPanel.name;}
inputs["Compare To"].push(symbol);outputs[(u0n+n5n+C6n+b5n)+symbol]=STX.Comparison.colorSelection;STX.Studies.addStudy(stx,"correl",inputs,outputs,null,panelName);for(var panel in stx.panels){if(Q9U.e7n(stx.panels[panel].name.indexOf(STX.Comparison.correlationPanel),0)){var compareArray=stx.layout.studies[stx.panels[panel].name].inputs[(e9p+a0p+o1p+n5n+b5n+R8n+L0p)];for(var ii=0;Q9U.E7n(ii,compareArray.length);ii++){if(Q9U.P7n(compareArray[ii],symbol)){stx.layout.studies[stx.panels[panel].name].outputs["Result "+symbol]=STX.Comparison.colorSelection;}
}
}
}
}
;STX.Comparison.toggleCorrelate=function(stx){var D3p=".stxCorrelate .stx-checkbox";STX.Comparison.requestCorrelation=!STX.Comparison.requestCorrelation;var display=$$$(D3p);if(display){STX.unappendClassName(display,(!STX.Comparison.requestCorrelation).toString());STX.appendClassName(display,STX.Comparison.requestCorrelation.toString());}
}
;STXChart.prototype.setComparison=function(onOff,chart){var l8p="string";if(!chart)chart=this.chart;if(typeof chart==l8p)chart=this.charts[chart];if(!chart.isComparison&&onOff){this.setTransform(chart,STX.Comparison.priceToPercent,STX.Comparison.percentToPrice);chart.panel.yAxis.priceFormatter=STX.Comparison.priceFormat;chart.panel.yAxis.whichSet=E0n;}
else if(chart.isComparison&&!onOff){this.unsetTransform(chart);chart.panel.yAxis.priceFormatter=G8p;chart.panel.yAxis.whichSet=m4p;}
chart.isComparison=onOff;}
;STX.Comparison.startPlugin=function(){STXChart.prototype.prepend(p2p,STX.Comparison.createComparisonSegment);}
;STX.Comparison.removeSeries=function(stx,field){}
;STX.SearchableWordList=function(list,maxResults,contains){if(!list)return ;if(!maxResults)maxResults=50;if(!contains)contains=false;var container={"records":[],"words":[]}
;for(var r=0;Q9U.p7n(r,list.length);r++){var record=list[r];if(!record.name)record.name=record.id;record.index=Q9U.Q7n(container.records.push(record),1);var descs=record.name.split(" ");if(record.keywords)descs=descs.concat(record.keywords.split(" "));for(var j=0;Q9U.F7n(j,descs.length);j++){var word=descs[j].toUpperCase(),subIdx="_",subIdx2="_";if(Q9U.h7n(word.charCodeAt(0),33)&&Q9U.X7n(word.charCodeAt(0),126))subIdx=word.charAt(0);if(!container.words[subIdx])container.words[subIdx]=[];if(Q9U.T7n(word.length,1)){if(Q9U.J7n(word.charCodeAt(1),33)&&Q9U.U9n(word.charCodeAt(1),126))subIdx2=word.charAt(1);}
else{subIdx2=" ";}
if(!container.words[subIdx][subIdx2])container.words[subIdx][subIdx2]=[];container.words[subIdx][subIdx2].push({index:record.index,word:word}
);}
}
this.lookup=function(input,category,cb){var results=[];function sortId(a,b){if(Q9U.S9n(a.id,b.id))return 1;else if(Q9U.G9n(a.id,b.id))return -1;return Q9U.V9n(a.weight,b.weight)?1:-1;}
function sortWeight(a,b){if(Q9U.R9n(a.weight,b.weight))return 1;else if(Q9U.D9n(a.weight,b.weight))return -1;return Q9U.g9n(a.name,b.name)?1:-1;}
function sortDescWeight(a,b){a.weight=0;b.weight=0;for(var j=0;Q9U.n9n(j,keys.length);j++){var KEY=keys[j].toUpperCase(),aIndex=a.name.toUpperCase().indexOf(KEY),bIndex=b.name.toUpperCase().indexOf(KEY);if(aIndex==-1)return 1;else if(bIndex==-1)return -1;a.weight+=aIndex;b.weight+=bIndex;}
if(Q9U.Z9n(a.weight,b.weight))return 1;else if(Q9U.s9n(a.weight,b.weight))return -1;return Q9U.i9n(a.name,b.name)?1:-1;}
function noDups(res){var returnArray=[],previousId="";for(var r=0;Q9U.a9n(r,res.length);r++){if(Q9U.I9n(previousId,res[r].id))continue;returnArray.push(res[r]);previousId=res[r].id;}
return returnArray;}
if(input&&container){var foundBitMap=[],keyword=input.toUpperCase(),exacts=[],d,entry;for(d=0;Q9U.r9n(d,container.records.length);d++){entry=container.records[d];if(foundBitMap[entry.index])continue;if(category&&Q9U.A9n(entry.category,category))continue;var name=entry.name.toUpperCase();if(Q9U.y9n(keyword,"*")){exacts.push(STX.extend(container.records[entry.index],{weight:0}
));foundBitMap[entry.index]=true;}
else{var i=name.indexOf(keyword);if(i>-1){var weight=Q9U.c9n(name.length,keyword.length);if(!contains&&Q9U.B9n(i,0))continue;(weight?results:exacts).push(STX.extend(container.records[entry.index],{weight:weight}
));foundBitMap[entry.index]=true;}
}
}
var keys=keyword.split(" "),k1="_",k2="_",myKey=keys[0].toUpperCase(),descResults=[];if(Q9U.l3n(myKey.charCodeAt(0),33)&&Q9U.Y3n(myKey.charCodeAt(0),126))k1=myKey.charAt(0);if(Q9U.x3n(myKey.length,1)){if(Q9U.K3n(myKey.charCodeAt(1),33)&&Q9U.C3n(myKey.charCodeAt(1),126))k2=myKey.charAt(1);}
else{k2=" ";}
if(container.words[k1]){for(var kk in container.words[k1]){if(Q9U.W3n(kk.length,1))continue;if(Q9U.v3n(k2," "))kk=k2;for(d=0;container.words[k1][kk]&&Q9U.M3n(d,container.words[k1][kk].length);d++){entry=container.words[k1][kk][d];if(Q9U.u3n(entry.word.toUpperCase().indexOf(myKey),0))continue;if(foundBitMap[entry.index])continue;if(category&&Q9U.N3n(container.records[entry.index].category,category))continue;descResults.push(STX.clone(container.records[entry.index]));foundBitMap[entry.index]=true;}
if(Q9U.b3n(k2," "))break;}
}
for(var extraKeys=1;Q9U.z3n(extraKeys,keys.length);extraKeys++){myKey=keys[extraKeys].toUpperCase();for(var res=Q9U.H3n(descResults.length,1);Q9U.q3n(res,0);res--){var words=descResults[res].name.split(" ");if(descResults[res].keywords)words=words.concat(descResults[res].keywords.split(" "));var match=false;for(var wd=0;Q9U.m3n(wd,words.length);wd++){if(Q9U.d3n(words[wd].toUpperCase().indexOf(myKey),0)){match=true;break;}
}
if(!match)descResults.splice(res,1);}
}
exacts.sort(sortId);exacts=noDups(exacts);results.sort(sortId);results=noDups(results);results.length=Math.min(results.length,maxResults);descResults.sort(sortId);descResults=noDups(descResults);results=exacts.sort(sortWeight).concat(results.sort(sortWeight),descResults.sort(sortDescWeight));results.length=Math.min(results.length,maxResults);}
if(cb)cb(results);else return results;}
;}
;return _exports;}
{if(typeof define===H6n&&define.amd){define(["stxTimeZoneData","stxThirdParty","stx"],function(_stxTimeZoneData,_stxThirdParty,_stx){return _stxKernel_js(_stxThirdParty,_stx);}
);}
else{var X=function(T){_stxThirdParty=T.STXThirdParty;}
;var _stxThirdParty={}
;if(typeof (window.STXThirdParty)!=h0n)X(window);var _stx={"STX":window.STX,"STXChart":window.STXChart,"$$":window.$$,"$$$":window.$$$}
;_stxKernel_js(_stxThirdParty,_stx);}
}
}
)();