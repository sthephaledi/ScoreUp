import { useStatus } from 'react';
import {
View, Text, TouchableOpacity, ScrollView,
StyleSheet, Dimensions, StatusBar
} from ‘react-native’;

const { width, height } = Dimensions.get(‘window’);

// ── COLORS ──────────────────────────────────────────────────
const C = {
bg:      ‘#F7F8FC’,
white:   ‘#FFFFFF’,
panel:   ‘#EEF0F8’,
border:  ‘rgba(20,30,80,0.09)’,
text:    ‘#12183A’,
muted:   ‘#5A6282’,
subtle:  ‘#9BA3BE’,
blue:    ‘#3A86FF’,
blueLt:  ‘#E8F1FF’,
green:   ‘#16C79A’,
greenLt: ‘#E3F9F3’,
orange:  ‘#F7962B’,
purple:  ‘#8B5CF6’,
red:     ‘#EF4444’,
gold:    ‘#F5C518’,
};

// ── CAPS SUBJECTS BY GRADE ───────────────────────────────────
const CAPS = {
‘Grade 1’:  { band: ‘Foundation Phase’, mandatory: [‘Mathematics’,‘English Home Language’,‘Life Skills’], elective: [] },
‘Grade 2’:  { band: ‘Foundation Phase’, mandatory: [‘Mathematics’,‘English Home Language’,‘Life Skills’], elective: [] },
‘Grade 3’:  { band: ‘Foundation Phase’, mandatory: [‘Mathematics’,‘English Home Language’,‘Life Skills’,‘Technology’], elective: [] },
‘Grade 4’:  { band: ‘Intermediate Phase’, mandatory: [‘Mathematics’,‘English Home Language’,‘Life Skills’,‘Natural Sciences & Technology’,‘Social Sciences’], elective: [‘Creative Arts’,‘Afrikaans FAL’] },
‘Grade 5’:  { band: ‘Intermediate Phase’, mandatory: [‘Mathematics’,‘English Home Language’,‘Life Skills’,‘Natural Sciences & Technology’,‘Social Sciences’], elective: [‘Creative Arts’,‘Afrikaans FAL’] },
‘Grade 6’:  { band: ‘Intermediate Phase’, mandatory: [‘Mathematics’,‘English Home Language’,‘Life Skills’,‘Natural Sciences & Technology’,‘Social Sciences’], elective: [‘Creative Arts’,‘Afrikaans FAL’] },
‘Grade 7’:  { band: ‘Senior Phase’, mandatory: [‘Mathematics’,‘English Home Language’,‘Life Orientation’,‘Natural Sciences’,‘Social Sciences’,‘Technology’], elective: [‘Economic Management Sciences’,‘Creative Arts’,‘Afrikaans FAL’] },
‘Grade 8’:  { band: ‘Senior Phase’, mandatory: [‘Mathematics’,‘English Home Language’,‘Life Orientation’,‘Natural Sciences’,‘Social Sciences’,‘Technology’], elective: [‘Economic Management Sciences’,‘Creative Arts’,‘Afrikaans FAL’] },
‘Grade 9’:  { band: ‘Senior Phase’, mandatory: [‘Mathematics’,‘English Home Language’,‘Life Orientation’,‘Natural Sciences’,‘Social Sciences’,‘Technology’], elective: [‘Economic Management Sciences’,‘Creative Arts’,‘Afrikaans FAL’] },
‘Grade 10’: { band: ‘FET Phase’, mandatory: [‘English Home Language’,‘Life Orientation’], elective: [‘Mathematics’,‘Mathematical Literacy’,‘Physical Sciences’,‘Life Sciences’,‘History’,‘Geography’,‘Tourism’,‘Accounting’,‘Business Studies’,‘Economics’], note: ‘Choose Maths OR Maths Lit + 3 electives’ },
‘Grade 11’: { band: ‘FET Phase’, mandatory: [‘English Home Language’,‘Life Orientation’], elective: [‘Mathematics’,‘Mathematical Literacy’,‘Physical Sciences’,‘Life Sciences’,‘History’,‘Geography’,‘Tourism’,‘Accounting’,‘Business Studies’,‘Economics’], note: ‘Choose Maths OR Maths Lit + 3 electives’ },
‘Grade 12’: { band: ‘FET Phase’, mandatory: [‘English Home Language’,‘Life Orientation’], elective: [‘Mathematics’,‘Mathematical Literacy’,‘Physical Sciences’,‘Life Sciences’,‘History’,‘Geography’,‘Tourism’,‘Accounting’,‘Business Studies’,‘Economics’], note: ‘Choose Maths OR Maths Lit + 3 electives’ },
};

const GRADES = Object.keys(CAPS);
const TERMS  = [‘Term 1’,‘Term 2’,‘Term 3’,‘Term 4’,‘Annual’];

const getLearnerRating = (avg) => {
if (avg >= 80) return { label: ‘Outstanding Learner’, emoji: ‘🏆’, color: C.gold,   desc: ‘Top 10% — exceptional!’ };
if (avg >= 70) return { label: ‘Merit Learner’,        emoji: ‘⭐’, color: C.green,  desc: ‘Above average — keep it up!’ };
if (avg >= 60) return { label: ‘Achieving Learner’,    emoji: ‘📈’, color: C.blue,   desc: ‘On track — room to grow’ };
if (avg >= 50) return { label: ‘Developing Learner’,   emoji: ‘💪’, color: C.orange, desc: ‘Almost there — ScoreUp will help’ };
if (avg >= 40) return { label: ‘Needs Support’,        emoji: ‘🎯’, color: C.purple, desc: “Let’s close the gap together” };
return         { label: ‘Foundation Learner’,          emoji: ‘🌱’, color: C.red,    desc: ‘Big gains ahead with ScoreUp!’ };
};

// ── SHARED COMPONENTS ────────────────────────────────────────
const Btn = ({ label, onPress, color = C.blue, textColor = ‘#fff’, disabled, style }) => (
<TouchableOpacity
onPress={onPress}
disabled={disabled}
activeOpacity={0.82}
style={[{
backgroundColor: disabled ? C.subtle : color,
borderRadius: 14, padding: 15,
alignItems: ‘center’,
shadowColor: color,
shadowOffset: { width: 0, height: 6 },
shadowOpacity: 0.28,
shadowRadius: 10,
elevation: 5,
}, style]}

```
<Text style={{ color: textColor, fontSize: 15, fontWeight: '700' }}>{label}</Text>
```

  </TouchableOpacity>
);

const StepDots = ({ current, total }) => (
<View style={{ flexDirection: ‘row’, justifyContent: ‘center’, gap: 6, marginBottom: 20 }}>
{Array.from({ length: total }).map((_, i) => (
<View key={i} style={{
height: 4, borderRadius: 2,
width: i === current ? 28 : 10,
backgroundColor: i <= current ? C.blue : C.panel,
}} />
))}
</View>
);

// ════════════════════════════════════════════════
//  SCREEN: SPLASH
// ════════════════════════════════════════════════
function SplashScreen({ onGetStarted, onSignIn }) {
const features = [
‘🧠 AI Tutor for all CAPS subjects’,
‘📅 Smart planner & exam scheduling’,
‘🔁 Spaced repetition memory engine’,
‘👨‍👩‍👧 Parent insights & weekly reports’,
];

return (
<View style={{ flex: 1, background: ‘linear-gradient(160deg, #3A86FF, #12183A)’ }}>
<View style={[StyleSheet.absoluteFill, { backgroundColor: ‘#1a52d4’ }]} />
<ScrollView contentContainerStyle={{ flexGrow: 1, padding: 24, paddingTop: 80, paddingBottom: 40 }}>
<View style={{ alignItems: ‘center’, marginBottom: 36 }}>
<Text style={{ fontSize: 72, marginBottom: 12 }}>🎓</Text>
<Text style={{ fontSize: 36, fontWeight: ‘800’, color: ‘#fff’, letterSpacing: -1.5, marginBottom: 6 }}>
Score<Text style={{ color: C.gold, fontStyle: ‘italic’ }}>Up</Text>
</Text>
<Text style={{ fontSize: 12, color: ‘rgba(255,255,255,0.65)’, fontWeight: ‘600’, letterSpacing: 2, textTransform: ‘uppercase’ }}>
🇿🇦 South Africa’s AI Study Companion
</Text>
</View>

```
    {features.map((f, i) => (
      <View key={i} style={{
        flexDirection: 'row', alignItems: 'center', gap: 12,
        backgroundColor: 'rgba(255,255,255,0.12)',
        borderRadius: 12, padding: 14, marginBottom: 10,
        borderWidth: 1, borderColor: 'rgba(255,255,255,0.18)',
      }}>
        <Text style={{ fontSize: 20 }}>{f.slice(0, 2)}</Text>
        <Text style={{ fontSize: 13, color: 'rgba(255,255,255,0.92)', fontWeight: '600', flex: 1 }}>{f.slice(3)}</Text>
      </View>
    ))}

    <Text style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', textAlign: 'center', marginTop: 16, marginBottom: 32, fontWeight: '600' }}>
      Grade 1–12 · CAPS Aligned · 120k+ students
    </Text>

    <Btn
      label="Get Started Free 🚀"
      onPress={onGetStarted}
      color={C.gold}
      textColor={C.text}
      style={{ marginBottom: 12, paddingVertical: 16 }}
    />
    <TouchableOpacity onPress={onSignIn} style={{ alignItems: 'center', padding: 14, borderRadius: 14, borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.28)' }}>
      <Text style={{ color: '#fff', fontSize: 15, fontWeight: '700' }}>I have an account</Text>
    </TouchableOpacity>
  </ScrollView>
</View>
```

);
}

// ════════════════════════════════════════════════
//  SCREEN: SIGN UP
// ════════════════════════════════════════════════
function SignUpScreen({ onSignUp, onGoSignIn }) {
const [role,     setRole]     = useState(‘student’);
const [name,     setName]     = useState(’’);
const [email,    setEmail]    = useState(’’);
const [password, setPassword] = useState(’’);

return (
<ScrollView style={{ flex: 1, backgroundColor: C.bg }} contentContainerStyle={{ padding: 24, paddingTop: 60 }}>
<View style={{ alignItems: ‘center’, marginBottom: 28 }}>
<Text style={{ fontSize: 40 }}>🎓</Text>
<Text style={{ fontSize: 26, fontWeight: ‘800’, color: C.text, letterSpacing: -1, marginTop: 8 }}>
Score<Text style={{ color: C.blue }}>Up</Text>
</Text>
</View>

```
  <Text style={{ fontSize: 22, fontWeight: '800', color: C.text, marginBottom: 4 }}>Create account</Text>
  <Text style={{ fontSize: 13, color: C.muted, marginBottom: 22 }}>Join 120,000+ SA students</Text>

  {/* Role toggle */}
  <View style={{ flexDirection: 'row', backgroundColor: C.panel, borderRadius: 12, padding: 4, marginBottom: 20 }}>
    {['student', 'parent'].map((r) => (
      <TouchableOpacity key={r} onPress={() => setRole(r)} style={{
        flex: 1, paddingVertical: 10, borderRadius: 9,
        backgroundColor: role === r ? C.white : 'transparent',
        alignItems: 'center',
      }}>
        <Text style={{ fontSize: 13, fontWeight: '700', color: role === r ? C.blue : C.muted }}>
          {r === 'student' ? '👨‍🎓 Student' : '👨‍👩‍👧 Parent'}
        </Text>
      </TouchableOpacity>
    ))}
  </View>

  {/* Fields */}
  {[
    { label: 'Full Name',  value: name,     set: setName,     ph: 'e.g. Thabo Mokoena' },
    { label: 'Email',      value: email,    set: setEmail,    ph: 'your@email.com' },
    { label: 'Password',   value: password, set: setPassword, ph: 'At least 6 characters', secure: true },
  ].map((f) => (
    <View key={f.label} style={{ marginBottom: 14 }}>
      <Text style={s.label}>{f.label}</Text>
      <View style={s.input}>
        <Text style={{ color: f.value ? C.text : C.subtle, fontSize: 15 }}>
          {f.secure && f.value ? '••••••••' : f.value || f.ph}
        </Text>
      </View>
    </View>
  ))}

  <Btn label="Create Account →" onPress={() => onSignUp(name || 'Thabo Mokoena', role)} style={{ marginTop: 6, marginBottom: 16 }} />

  <TouchableOpacity onPress={onGoSignIn} style={{ alignItems: 'center' }}>
    <Text style={{ fontSize: 13, color: C.subtle }}>
      Already have an account? <Text style={{ color: C.blue, fontWeight: '700' }}>Sign in</Text>
    </Text>
  </TouchableOpacity>
</ScrollView>
```

);
}

// ════════════════════════════════════════════════
//  ONBOARDING: STEP 1 — PICK GRADE
// ════════════════════════════════════════════════
function GradeStep({ onNext }) {
const [grade, setGrade] = useState(’’);

const phases = [
{ phase: ‘🏫 Foundation Phase’, grades: [‘Grade 1’,‘Grade 2’,‘Grade 3’] },
{ phase: ‘📗 Intermediate Phase’, grades: [‘Grade 4’,‘Grade 5’,‘Grade 6’] },
{ phase: ‘📘 Senior Phase’, grades: [‘Grade 7’,‘Grade 8’,‘Grade 9’] },
{ phase: ‘📙 FET Phase’, grades: [‘Grade 10’,‘Grade 11’,‘Grade 12’] },
];

return (
<ScrollView style={{ flex: 1, backgroundColor: C.bg }} contentContainerStyle={{ padding: 22, paddingTop: 50 }}>
<StepDots current={0} total={3} />
<Text style={s.stepTitle}>What grade are you in? 📚</Text>
<Text style={s.stepSub}>We’ll load your CAPS subjects automatically.</Text>

```
  {phases.map(({ phase, grades }) => (
    <View key={phase} style={{ marginBottom: 18 }}>
      <Text style={s.phaseLabel}>{phase}</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
        {grades.map((g) => (
          <TouchableOpacity key={g} onPress={() => setGrade(g)} style={[s.chip, grade === g && s.chipActive]}>
            <Text style={[s.chipText, grade === g && { color: '#fff' }]}>{g}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  ))}

  {grade ? (
    <View style={{ backgroundColor: C.blueLt, borderRadius: 13, padding: 14, marginBottom: 16 }}>
      <Text style={{ fontSize: 12, fontWeight: '800', color: C.blue, marginBottom: 3 }}>
        📋 {CAPS[grade].band}
      </Text>
      <Text style={{ fontSize: 12, color: C.muted }}>
        {CAPS[grade].mandatory.length} mandatory + {CAPS[grade].elective.length} elective subjects
      </Text>
      {CAPS[grade].note && (
        <Text style={{ fontSize: 11, color: C.orange, marginTop: 4, fontWeight: '600' }}>⚠ {CAPS[grade].note}</Text>
      )}
    </View>
  ) : null}

  <Btn label="Next — Choose Subjects →" onPress={() => onNext(grade)} disabled={!grade} />
</ScrollView>
```

);
}

// ════════════════════════════════════════════════
//  ONBOARDING: STEP 2 — PICK SUBJECTS
// ════════════════════════════════════════════════
function SubjectStep({ grade, onNext, onBack }) {
const data      = CAPS[grade];
const mandatory = data?.mandatory || [];
const elective  = data?.elective  || [];
const [selected, setSelected] = useState([…mandatory]);

const toggle = (sub) => {
if (mandatory.includes(sub)) return;
setSelected((prev) => prev.includes(sub) ? prev.filter((s) => s !== sub) : […prev, sub]);
};

return (
<ScrollView style={{ flex: 1, backgroundColor: C.bg }} contentContainerStyle={{ padding: 22, paddingTop: 50 }}>
<StepDots current={1} total={3} />
<Text style={s.stepTitle}>Pick your subjects ✅</Text>
<Text style={s.stepSub}>{grade} · Tap electives to add them.</Text>

```
  {mandatory.length > 0 && (
    <View style={{ marginBottom: 18 }}>
      <Text style={s.phaseLabel}>📌 Mandatory</Text>
      {mandatory.map((sub) => (
        <View key={sub} style={[s.subRow, { backgroundColor: `${C.green}15`, borderColor: `${C.green}40` }]}>
          <View style={[s.check, { backgroundColor: C.green }]}>
            <Text style={{ color: '#fff', fontSize: 11, fontWeight: '800' }}>✓</Text>
          </View>
          <Text style={{ flex: 1, fontSize: 13, fontWeight: '600', color: C.text }}>{sub}</Text>
          <Text style={{ fontSize: 10, color: C.green, fontWeight: '700' }}>Required</Text>
        </View>
      ))}
    </View>
  )}

  {elective.length > 0 && (
    <View style={{ marginBottom: 18 }}>
      <Text style={s.phaseLabel}>📚 Electives</Text>
      {elective.map((sub) => {
        const on = selected.includes(sub);
        return (
          <TouchableOpacity key={sub} onPress={() => toggle(sub)} style={[s.subRow, on && { backgroundColor: C.blueLt, borderColor: `${C.blue}40` }]}>
            <View style={[s.check, { backgroundColor: on ? C.blue : C.panel }]}>
              {on && <Text style={{ color: '#fff', fontSize: 11, fontWeight: '800' }}>✓</Text>}
            </View>
            <Text style={{ flex: 1, fontSize: 13, fontWeight: '600', color: on ? C.text : C.muted }}>{sub}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  )}

  <View style={{ backgroundColor: C.panel, borderRadius: 12, padding: 12, marginBottom: 16 }}>
    <Text style={{ fontSize: 12, fontWeight: '700', color: C.muted }}>{selected.length} subjects selected</Text>
  </View>

  <View style={{ flexDirection: 'row', gap: 10 }}>
    <Btn label="← Back" onPress={onBack} color={C.panel} textColor={C.muted} style={{ flex: 1 }} />
    <Btn label="Next — Add Marks →" onPress={() => onNext(selected)} disabled={selected.length === 0} style={{ flex: 2 }} />
  </View>
</ScrollView>
```

);
}

// ════════════════════════════════════════════════
//  ONBOARDING: STEP 3 — ENTER MARKS
// ════════════════════════════════════════════════
function MarksStep({ subjects, onFinish, onBack }) {
const [term,  setTerm]  = useState(‘Term 1’);
const [marks, setMarks] = useState({});

const entered   = subjects.filter((s) => marks[s] && marks[s] !== ‘’);
const avgMark   = entered.length > 0
? Math.round(entered.reduce((sum, s) => sum + parseInt(marks[s] || ‘0’), 0) / entered.length)
: null;
const rating    = avgMark !== null ? getLearnerRating(avgMark) : null;

return (
<ScrollView style={{ flex: 1, backgroundColor: C.bg }} contentContainerStyle={{ padding: 22, paddingTop: 50 }}>
<StepDots current={2} total={3} />
<Text style={s.stepTitle}>Enter your report marks 📊</Text>
<Text style={s.stepSub}>This is your starting point. We track your improvement from here.</Text>

```
  {/* Term */}
  <Text style={s.phaseLabel}>📅 Which term?</Text>
  <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 18 }}>
    <View style={{ flexDirection: 'row', gap: 8 }}>
      {TERMS.map((t) => (
        <TouchableOpacity key={t} onPress={() => setTerm(t)} style={{
          paddingVertical: 8, paddingHorizontal: 14, borderRadius: 100,
          backgroundColor: term === t ? C.blue : C.white,
          borderWidth: 1.5, borderColor: term === t ? C.blue : C.border,
        }}>
          <Text style={{ fontSize: 12, fontWeight: '700', color: term === t ? '#fff' : C.muted }}>{t}</Text>
        </TouchableOpacity>
      ))}
    </View>
  </ScrollView>

  {/* Mark inputs */}
  <Text style={s.phaseLabel}>📝 Your % mark per subject</Text>
  {subjects.map((sub) => {
    const val = parseInt(marks[sub] || '0');
    const col = val >= 70 ? C.green : val >= 50 ? C.orange : C.red;
    return (
      <View key={sub} style={{
        backgroundColor: C.white, borderRadius: 14, padding: 14,
        marginBottom: 12, borderWidth: 1.5, borderColor: C.border,
      }}>
        {/* Subject name on its own line */}
        <Text style={{ fontSize: 14, fontWeight: '800', color: C.text, marginBottom: 10 }}>{sub}</Text>

        {/* Progress bar */}
        <View style={{ height: 5, backgroundColor: C.panel, borderRadius: 4, overflow: 'hidden', marginBottom: 10 }}>
          <View style={{ height: '100%', width: `${val}%`, backgroundColor: col, borderRadius: 4 }} />
        </View>

        {/* Mark buttons in 2 rows */}
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
          {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((v) => {
            const active = marks[sub] === String(v);
            return (
              <TouchableOpacity
                key={v}
                onPress={() => setMarks((p) => ({ ...p, [sub]: String(v) }))}
                style={{
                  paddingVertical: 6, paddingHorizontal: 10, borderRadius: 8,
                  backgroundColor: active ? col : C.panel,
                  borderWidth: 1.5,
                  borderColor: active ? col : C.border,
                }}
              >
                <Text style={{ fontSize: 12, fontWeight: '700', color: active ? '#fff' : C.muted }}>{v}%</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Selected mark display */}
        {marks[sub] && (
          <Text style={{ fontSize: 12, fontWeight: '700', color: col, marginTop: 8 }}>
            Selected: {marks[sub]}% {val >= 70 ? '✅' : val >= 50 ? '⚠️' : '❌'}
          </Text>
        )}
      </View>
    );
  })}

  {/* Rating card */}
  {rating && (
    <View style={{
      backgroundColor: `${rating.color}18`,
      borderRadius: 16, padding: 18, marginTop: 16, marginBottom: 8,
      borderWidth: 1.5, borderColor: `${rating.color}35`,
      alignItems: 'center',
    }}>
      <Text style={{ fontSize: 40, marginBottom: 8 }}>{rating.emoji}</Text>
      <Text style={{ fontSize: 11, fontWeight: '800', color: rating.color, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>
        Your Learner Rating
      </Text>
      <Text style={{ fontSize: 20, fontWeight: '800', color: C.text, marginBottom: 4 }}>{rating.label}</Text>
      <Text style={{ fontSize: 30, fontWeight: '800', color: rating.color, letterSpacing: -1 }}>{avgMark}% Average</Text>
      <Text style={{ fontSize: 12, color: C.muted, marginTop: 6, textAlign: 'center' }}>{rating.desc}</Text>
      <View style={{ marginTop: 10, backgroundColor: C.white, borderRadius: 10, padding: 10, width: '100%' }}>
        <Text style={{ fontSize: 11, color: C.muted, textAlign: 'center' }}>
          ScoreUp will track your improvement from this starting point. Let's go! 🚀
        </Text>
      </View>
    </View>
  )}

  <View style={{ flexDirection: 'row', gap: 10, marginTop: 16, marginBottom: 30 }}>
    <Btn label="← Back" onPress={onBack} color={C.panel} textColor={C.muted} style={{ flex: 1 }} />
    <Btn label="Let's Study! 🚀" onPress={() => onFinish({ marks, term })} color={C.green} style={{ flex: 2 }} />
  </View>
</ScrollView>
```

);
}

// ════════════════════════════════════════════════
//  DASHBOARD (simple version after onboarding)
// ════════════════════════════════════════════════
function DashboardScreen({ student }) {
const first  = student.name.split(’ ’)[0];
const rating = student.avgMark ? getLearnerRating(student.avgMark) : null;

return (
<ScrollView style={{ flex: 1, backgroundColor: C.bg }} contentContainerStyle={{ padding: 20, paddingTop: 55 }}>
{/* Header */}
<View style={{ flexDirection: ‘row’, justifyContent: ‘space-between’, alignItems: ‘flex-start’, marginBottom: 22 }}>
<View>
<Text style={{ fontSize: 13, color: C.muted, fontWeight: ‘600’, marginBottom: 3 }}>Welcome back 👋</Text>
<Text style={{ fontSize: 26, fontWeight: ‘800’, color: C.text, letterSpacing: -0.8 }}>{first}!</Text>
<Text style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>{student.grade} · {CAPS[student.grade]?.band}</Text>
</View>
<View style={{ backgroundColor: `${C.green}18`, borderRadius: 14, padding: 12, alignItems: ‘center’ }}>
<Text style={{ fontSize: 20 }}>🔥</Text>
<Text style={{ fontSize: 18, fontWeight: ‘800’, color: C.green }}>0</Text>
<Text style={{ fontSize: 9, fontWeight: ‘700’, color: C.green, textTransform: ‘uppercase’ }}>Streak</Text>
</View>
</View>

```
  {/* Rating card */}
  {rating && (
    <View style={{
      backgroundColor: `${rating.color}15`, borderRadius: 16,
      padding: 16, marginBottom: 18,
      borderWidth: 1.5, borderColor: `${rating.color}30`,
      flexDirection: 'row', alignItems: 'center', gap: 14,
    }}>
      <Text style={{ fontSize: 36 }}>{rating.emoji}</Text>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 11, fontWeight: '800', color: rating.color, textTransform: 'uppercase', letterSpacing: 0.8 }}>Learner Rating</Text>
        <Text style={{ fontSize: 16, fontWeight: '800', color: C.text, marginTop: 2 }}>{rating.label}</Text>
        <Text style={{ fontSize: 22, fontWeight: '800', color: rating.color }}>{student.avgMark}% Average</Text>
      </View>
    </View>
  )}

  {/* Subjects */}
  <Text style={{ fontSize: 16, fontWeight: '800', color: C.text, marginBottom: 12 }}>📚 Your Subjects</Text>
  {student.subjects.map((sub, i) => {
    const mark = parseInt(student.marks?.[sub] || '0');
    const col  = mark >= 70 ? C.green : mark >= 50 ? C.orange : C.red;
    return (
      <View key={i} style={{
        backgroundColor: C.white, borderRadius: 14, padding: 14,
        marginBottom: 10, borderWidth: 1, borderColor: C.border,
      }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
          <Text style={{ fontSize: 13, fontWeight: '700', color: C.text, flex: 1 }}>{sub}</Text>
          <Text style={{ fontSize: 13, fontWeight: '800', color: col }}>{mark > 0 ? `${mark}%` : '—'}</Text>
        </View>
        <View style={{ height: 5, backgroundColor: C.panel, borderRadius: 4, overflow: 'hidden' }}>
          <View style={{ height: '100%', width: `${mark}%`, backgroundColor: col, borderRadius: 4 }} />
        </View>
      </View>
    );
  })}

  <View style={{ backgroundColor: C.blueLt, borderRadius: 14, padding: 14, marginTop: 8 }}>
    <Text style={{ fontSize: 12, fontWeight: '800', color: C.blue, marginBottom: 3 }}>🚀 Coming Soon</Text>
    <Text style={{ fontSize: 12, color: C.muted }}>AI Tutor, Study Planner, Quizzes and more — all linked to your subjects!</Text>
  </View>
</ScrollView>
```

);
}

// ════════════════════════════════════════════════
//  ROOT APP
// ════════════════════════════════════════════════
export default function App() {
const [screen,  setScreen]  = useState(‘splash’); // splash | signup | grade | subjects | marks | dashboard
const [student, setStudent] = useState({ name: ‘’, grade: ‘’, subjects: [], marks: {}, avgMark: null });

const goSignUp   = (name, role) => { setStudent((p) => ({ …p, name })); setScreen(‘grade’); };
const goGrade    = (grade)      => { setStudent((p) => ({ …p, grade })); setScreen(‘subjects’); };
const goSubjects = (subjects)   => { setStudent((p) => ({ …p, subjects })); setScreen(‘marks’); };
const goFinish   = ({ marks, term }) => {
const entered  = student.subjects.filter((s) => marks[s] && marks[s] !== ‘’);
const avgMark  = entered.length > 0
? Math.round(entered.reduce((sum, s) => sum + parseInt(marks[s] || ‘0’), 0) / entered.length)
: 0;
setStudent((p) => ({ …p, marks, term, avgMark }));
setScreen(‘dashboard’);
};

return (
<View style={{ flex: 1 }}>
<StatusBar barStyle="light-content" />
{screen === ‘splash’    && <SplashScreen   onGetStarted={() => setScreen(‘signup’)} onSignIn={() => setScreen(‘signup’)} />}
{screen === ‘signup’    && <SignUpScreen    onSignUp={goSignUp} onGoSignIn={() => setScreen(‘signup’)} />}
{screen === ‘grade’     && <GradeStep      onNext={goGrade} />}
{screen === ‘subjects’  && <SubjectStep    grade={student.grade} onNext={goSubjects} onBack={() => setScreen(‘grade’)} />}
{screen === ‘marks’     && <MarksStep      subjects={student.subjects} onFinish={goFinish} onBack={() => setScreen(‘subjects’)} />}
{screen === ‘dashboard’ && <DashboardScreen student={student} />}
</View>
);
}

// ── STYLES ───────────────────────────────────────────────────
const s = StyleSheet.create({
label:     { fontSize: 10, fontWeight: ‘800’, color: ‘#5A6282’, letterSpacing: 1, textTransform: ‘uppercase’, marginBottom: 6 },
input:     { backgroundColor: ‘#FFFFFF’, borderRadius: 12, padding: 13, borderWidth: 1.5, borderColor: ‘rgba(20,30,80,0.09)’ },
stepTitle: { fontSize: 22, fontWeight: ‘800’, color: ‘#12183A’, letterSpacing: -0.5, marginBottom: 6 },
stepSub:   { fontSize: 13, color: ‘#5A6282’, lineHeight: 19, marginBottom: 22 },
phaseLabel:{ fontSize: 10, fontWeight: ‘800’, color: ‘#9BA3BE’, textTransform: ‘uppercase’, letterSpacing: 1, marginBottom: 10 },
chip:      { paddingVertical: 10, paddingHorizontal: 16, borderRadius: 12, backgroundColor: ‘#FFFFFF’, borderWidth: 1.5, borderColor: ‘rgba(20,30,80,0.09)’, minWidth: 90, alignItems: ‘center’ },
chipActive:{ backgroundColor: ‘#3A86FF’, borderColor: ‘#3A86FF’ },
chipText:  { fontSize: 13, fontWeight: ‘700’, color: ‘#5A6282’ },
subRow:    { flexDirection: ‘row’, alignItems: ‘center’, gap: 10, backgroundColor: ‘#FFFFFF’, borderRadius: 12, padding: 12, borderWidth: 1.5, borderColor: ‘rgba(20,30,80,0.09)’, marginBottom: 8 },
check:     { width: 26, height: 26, borderRadius: 8, backgroundColor: ‘#EEF0F8’, alignItems: ‘center’, justifyContent: ‘center’ },
});
