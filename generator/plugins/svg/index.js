import Vue from 'vue';
import SvgSprite from 'ym-svg-sprite';

Vue.use(SvgSprite);

const requireAll = requireContext => requireContext.keys().map(requireContext);

requireAll(require.context('../assets/sprites', false, /\.svg$/));
