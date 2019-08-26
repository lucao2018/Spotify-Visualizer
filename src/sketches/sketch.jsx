export default function sketch(p) {
  let amplitude = [];
  let pitches = [];
  let durations = [];
  let progress_ms = 0;
  let r = 0;
  let b = 0;
  let transparency = 255;
  p.setup = function() {
    p.createCanvas(600, 600);
  };

  p.myCustomRedrawAccordingToNewPropsHandler = function(props) {
    if (props.amplitude) {
      amplitude = props.amplitude;
    }

    if (props.pitches) {
      pitches = props.pitches;
    }

    if (props.duration) {
      durations = props.duration;
    }

    if (props.progress_ms) {
      progress_ms = props.progress_ms;
    }

    r = 0;
  };


  p.draw = function() {
    p.clear();

    p.translate(p.width / 2, p.height / 2);

    var ampToGraph = [];
    var pitchesToGraph = [];
    for (let i = 0; i < durations.length; i++) {
      if (durations[i] <= progress_ms && durations[i] >= progress_ms - 1000) {
        pitchesToGraph.push(pitches[i]);
        ampToGraph.push(amplitude[i]);
      }
    }

    for (let i = 0; i < ampToGraph.length; i++) {
      var r2 = p.map(ampToGraph[i], -100, 0, 0, 100);
      var pitchArray = [];
      if (pitchesToGraph.length !== 0) {
        pitchArray = pitchesToGraph[i];
      }

      p.noFill();
      p.ellipse(0, 0, ampToGraph[i] * 10);

      for (let i = 0; i < pitchArray.length; i++) {
        var x = Math.cos(pitchArray[i] * 360);
        var y = Math.sin(pitchArray[i] * 360);
        p.strokeWeight(10);
        p.stroke(255, 204, b, transparency);
        p.point(x * r, y * r);
      }
    }

    r = r + 2;
    b = b + 2;
    transparency = transparency - 1;

    if (r > r2) {
      r = 0;
    }

    if (transparency < 0) {
      transparency = 255;
    }

    if (b > 255) {
      b = 0;
    }
  };
}
