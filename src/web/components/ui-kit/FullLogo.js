import React, {PropTypes} from 'react'

import "./FullLogo.css"
const FullLogo = (
  {
    onClick
  }) => (
  <svg
    width="385px"
    height="69px"
    viewBox="0 0 385 69"
    onClick={onClick}
    id="full-logo"
  >
    <g
      stroke="none"
      strokeWidth="1"
      fill="none"
      fillRule="evenodd">
      <g
        transform="translate(-207.000000, -79.000000)"
        fill="#0055ff">
        <path
          d="M240.801612,89.3821513 C235.217988,89.8840945 230.791793,94.3993668 230.424645,100.02126 L227,100.02126 L227,102.008906 L230,102.008906 L230,109.808503 L227,109.808503 L227,117.866996 C227,118.41928 227.447715,118.866996 228,118.866996 L255.538564,118.866996 C256.090849,118.866996 256.538564,118.41928 256.538564,117.866996 L256.538564,117.866996 L256.538564,109.808503 L254,109.808503 L254,102.008906 L256.538564,102.008906 L256.538564,100.02126 L253.25285,100.02126 C252.884075,94.374463 248.420213,89.8441129 242.801612,89.3757173 L242.801612,86.9505814 L240.801612,86.9505814 L240.801612,89.3821513 Z M241,102.208691 L241,109.808503 L232,109.808503 L232,102.208691 L241,102.208691 Z M243,102.208691 L252,102.208691 L252,109.808503 L243,109.808503 L243,102.208691 Z M235.181342,147 C219.145154,144.050178 207,130.078095 207,113.286882 C207,94.3507601 222.446176,79 241.5,79 C260.553824,79 276,94.3507601 276,113.286882 C276,126.111954 268.914695,137.292388 258.422021,143.172967 L257.476785,139.451577 L235.181342,147 Z M253.573974,124.086229 L227.318607,132.975338 L225,142.103682 L255.52538,131.768903 L253.573974,124.086229 Z M241.879716,121.734375 L229.921017,121.734375 L228.795866,126.164089 L241.879716,121.734375 Z M346.96,134 L318.46,134 L318.46,129.26 L323.2,129.26 L323.2,99.74 L318.46,99.74 L318.46,95 L334.84,95 L334.84,99.74 L328.66,99.74 L328.66,129.26 L342.22,129.26 L343.42,120.74 L348.16,121.16 L346.96,134 Z M354.88,100.88 L354.88,94.7 L360.34,94.7 L360.34,100.88 L354.88,100.88 Z M364.84,134 L350.86,134 L350.86,129.92 L355.24,129.92 L355.24,111.32 L350.68,111.32 L350.68,107.18 L360.52,107.18 L360.52,129.92 L364.84,129.92 L364.84,134 Z M398.32,111.32 L394.18,111.32 L394.18,133.34 C394.18,137.580021 393.010012,140.979987 390.67,143.54 C388.329988,146.100013 384.960022,147.38 380.56,147.38 C377.759986,147.38 375.200012,146.750006 372.88,145.49 C370.559988,144.229994 368.980004,142.200014 368.14,139.4 L372.22,137.3 C372.980004,139.26001 374.139992,140.699995 375.7,141.62 C377.260008,142.540005 378.919991,143 380.68,143 C383.080012,143 385.059992,142.160008 386.62,140.48 C388.180008,138.799992 388.96,136.380016 388.96,133.22 L388.96,128.72 C388.159996,130.240008 387.020007,131.539995 385.54,132.62 C384.059993,133.700005 382.080012,134.24 379.6,134.24 C376.399984,134.24 373.670011,133.130011 371.41,130.91 C369.149989,128.689989 368.02,125.460021 368.02,121.22 C368.02,117.539982 369.01999,114.190015 371.02,111.17 C373.02001,108.149985 376.03998,106.64 380.08,106.64 C384.240021,106.64 387.199991,108.219984 388.96,111.38 L388.96,107.18 L398.32,107.18 L398.32,111.32 Z M388.96,121.88 L388.96,118.4 C388.96,116.159989 388.240007,114.360007 386.8,113 C385.359993,111.639993 383.62001,110.96 381.58,110.96 C378.939987,110.96 376.980006,111.909991 375.7,113.81 C374.419994,115.71001 373.78,118.059986 373.78,120.86 C373.78,123.940015 374.469993,126.219993 375.85,127.7 C377.230007,129.180007 378.91999,129.92 380.92,129.92 C383.320012,129.92 385.239993,129.080008 386.68,127.4 C388.120007,125.719992 388.88,123.88001 388.96,121.88 Z M432.64,134 L418.66,134 L418.66,129.92 L423.04,129.92 L423.04,118.34 C423.04,115.619986 422.500005,113.690006 421.42,112.55 C420.339995,111.409994 418.920009,110.84 417.16,110.84 C414.999989,110.84 413.260007,111.569993 411.94,113.03 C410.619993,114.490007 409.92,116.159991 409.84,118.04 L409.84,129.92 L414.22,129.92 L414.22,134 L400.3,134 L400.3,129.92 L404.62,129.92 L404.62,96.86 L400.3,96.86 L400.3,92.72 L409.84,92.72 L409.84,111.8 C411.80001,108.359983 414.859979,106.64 419.02,106.64 C421.620013,106.64 423.819991,107.439992 425.62,109.04 C427.420009,110.640008 428.32,113.139983 428.32,116.54 L428.32,129.92 L432.64,129.92 L432.64,134 Z M455.92,126.44 C455.159996,131.880027 452.160026,134.6 446.92,134.6 C444.159986,134.6 442.010008,133.850008 440.47,132.35 C438.929992,130.849993 438.16,128.760013 438.16,126.08 L438.16,111.2 L434.02,111.2 L434.02,107.18 L438.16,107.18 L438.16,98.72 L443.38,98.72 L443.38,107.18 L453.64,107.18 L453.64,111.2 L443.38,111.2 L443.38,125.3 C443.38,128.500016 444.759986,130.1 447.52,130.1 C448.400004,130.1 449.279996,129.810003 450.16,129.23 C451.040004,128.649997 451.659998,127.300011 452.02,125.18 L455.92,126.44 Z M489.34,134 L475.36,134 L475.36,129.92 L479.74,129.92 L479.74,118.34 C479.74,115.619986 479.200005,113.690006 478.12,112.55 C477.039995,111.409994 475.620009,110.84 473.86,110.84 C471.699989,110.84 469.960007,111.569993 468.64,113.03 C467.319993,114.490007 466.62,116.159991 466.54,118.04 L466.54,129.92 L470.92,129.92 L470.92,134 L457,134 L457,129.92 L461.32,129.92 L461.32,96.86 L457,96.86 L457,92.72 L466.54,92.72 L466.54,111.8 C468.50001,108.359983 471.559979,106.64 475.72,106.64 C478.320013,106.64 480.519991,107.439992 482.32,109.04 C484.120009,110.640008 485.02,113.139983 485.02,116.54 L485.02,129.92 L489.34,129.92 L489.34,134 Z M518.98,120.62 C518.98,124.740021 517.710013,128.099987 515.17,130.7 C512.629987,133.300013 509.280021,134.6 505.12,134.6 C501.03998,134.6 497.810012,133.340013 495.43,130.82 C493.049988,128.299987 491.86,124.980021 491.86,120.86 C491.86,116.93998 492.999989,113.580014 495.28,110.78 C497.560011,107.979986 500.959977,106.58 505.48,106.58 C510.000023,106.58 513.379989,107.969986 515.62,110.75 C517.860011,113.530014 518.98,116.819981 518.98,120.62 Z M513.46,120.44 C513.46,117.479985 512.730007,115.140009 511.27,113.42 C509.809993,111.699991 507.840012,110.84 505.36,110.84 C502.759987,110.84 500.770007,111.749991 499.39,113.57 C498.009993,115.390009 497.32,117.719986 497.32,120.56 C497.32,123.280014 497.989993,125.589991 499.33,127.49 C500.670007,129.39001 502.659987,130.34 505.3,130.34 C507.900013,130.34 509.909993,129.410009 511.33,127.55 C512.750007,125.689991 513.46,123.320014 513.46,120.44 Z M523.96,134 L523.96,126.56 L530.8,126.56 L530.8,134 L523.96,134 Z M566.08,134 L556.3,134 L556.3,129.2 C554.459991,132.800018 551.440021,134.6 547.24,134.6 C544.639987,134.6 542.430009,133.800008 540.61,132.2 C538.789991,130.599992 537.88,128.080017 537.88,124.64 L537.88,111.32 L533.56,111.32 L533.56,107.18 L543.16,107.18 L543.16,122.9 C543.16,125.620014 543.689995,127.539994 544.75,128.66 C545.810005,129.780006 547.239991,130.34 549.04,130.34 C551.200011,130.34 552.939993,129.550008 554.26,127.97 C555.580007,126.389992 556.26,124.64001 556.3,122.72 L556.3,111.32 L551.08,111.32 L551.08,107.18 L561.58,107.18 L561.58,129.92 L566.08,129.92 L566.08,134 Z M591.52,126.14 C591.52,128.820013 590.410011,130.899993 588.19,132.38 C585.969989,133.860007 583.160017,134.6 579.76,134.6 C575.639979,134.6 572.140014,133.720009 569.26,131.96 L570.1,125.48 L574.24,125.9 L574.12,129.38 C574.920004,129.780002 575.789995,130.059999 576.73,130.22 C577.670005,130.380001 578.599995,130.46 579.52,130.46 C581.240009,130.46 582.789993,130.140003 584.17,129.5 C585.550007,128.859997 586.24,127.860007 586.24,126.5 C586.24,125.179993 585.680006,124.250003 584.56,123.71 C583.439994,123.169997 582.050008,122.760001 580.39,122.48 C578.729992,122.199999 577.080008,121.850002 575.44,121.43 C573.799992,121.009998 572.420006,120.290005 571.3,119.27 C570.179994,118.249995 569.62,116.70001 569.62,114.62 C569.62,111.619985 570.729989,109.540006 572.95,108.38 C575.170011,107.219994 577.539987,106.64 580.06,106.64 C581.900009,106.64 583.629992,106.869998 585.25,107.33 C586.870008,107.790002 588.339993,108.379996 589.66,109.1 L590.26,115.58 L586.06,116.06 L585.46,111.86 C583.819992,111.099996 582.100009,110.72 580.3,110.72 C578.819993,110.72 577.600005,110.999997 576.64,111.56 C575.679995,112.120003 575.2,113.039994 575.2,114.32 C575.2,115.560006 575.749995,116.439997 576.85,116.96 C577.950006,117.480003 579.309992,117.869999 580.93,118.13 C582.550008,118.390001 584.169992,118.739998 585.79,119.18 C587.410008,119.620002 588.769995,120.359995 589.87,121.4 C590.970006,122.440005 591.52,124.019989 591.52,126.14 Z"
          id="Combined-Shape"/>
      </g>
    </g>
  </svg>
)

FullLogo.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default FullLogo