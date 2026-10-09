"use client"

import { useEffect, useRef } from "react"
import { profile } from "../lib/portfolio-content"

// Contours traced from Jamyl's photo, in the photo's original coordinates.
const contours = [
  "M529 657 L530 609 L552 556 L596 522 L640 510 L685 516 L728 542 L752 584 L764 650",
  "M549 665 L557 610 L577 561 L614 535 L651 526 L687 534 L723 557 L743 596 L748 650",
  "M543 654 L529 650 L521 662 L524 696 L535 726 L550 730",
  "M754 650 L766 644 L772 661 L768 692 L762 719 L749 723",
  "M549 668 L551 718 L568 766 L594 800 L625 818 L665 820 L706 804 L731 772 L746 729 L751 677",
  "M569 624 L587 609 L615 604 L634 608 M671 607 L696 599 L721 609 L732 622",
  "M573 640 L588 633 L605 631 L622 638 L610 646 L588 647 Z",
  "M678 635 L693 627 L710 629 L724 638 L710 644 L691 643 Z",
  "M596 632 L596 642 L604 643 L607 633 M699 629 L698 638 L706 640 L708 630",
  "M644 638 L640 665 L625 682 L632 692 L644 690 M652 640 L661 669 L674 684 L670 691 L658 692",
  "M606 716 L627 709 L652 711 L675 706 L700 717 M615 728 L639 725 L662 726 L685 724",
  "M603 725 L613 734 L640 737 L670 736 L694 727 M620 751 L642 756 L666 755 L684 747",
  "M568 778 L571 823 L595 867 L652 919 L704 871 L738 821 L735 778",
  "M560 820 L512 856 L449 885 L372 912 L350 955 L337 1050 L293 1331 L282 1480",
  "M741 820 L787 854 L871 886 L948 913 L971 957 L989 1070 L1030 1328 L1048 1470",
  "M571 825 L561 881 L589 971 L638 928 L652 919 L703 971 L738 897 L742 827",
  "M518 855 L542 961 L518 1000 L541 1062 L559 1197 L572 1450",
  "M788 855 L764 960 L789 1000 L761 1058 L750 1197 L766 1450",
  "M640 929 L626 955 L641 990 L629 1070 L632 1204 L682 1206 L698 1072 L670 992 L680 955 L659 928",
  "M568 838 L611 894 L641 1014 L690 1148 L713 1145 L735 1015 L746 850",
  "M366 936 L361 1125 L342 1341 M948 938 L943 1128 L979 1348",
  "M812 1159 L909 1132 L913 1169 L815 1198 Z",
]

export function Portrait() {
  const ref = useRef<SVGSVGElement>(null)
  useEffect(() => {
    const svg = ref.current
    if (!svg) return
    const observer = new IntersectionObserver(([entry]) => {
      svg.classList.toggle("portrait-playing", entry.isIntersecting)
    }, { threshold: .1 })
    observer.observe(svg)
    return () => observer.disconnect()
  }, [])
  return <figure className="portrait" data-animate data-delay="60">
    <svg ref={ref} className="portrait-image" viewBox="260 450 790 987.5" preserveAspectRatio="xMidYMin slice" role="img" aria-label={`Portrait of ${profile.name}`}>
      <g className="portrait-lines" fill="none" stroke="currentColor" strokeWidth="5" strokeLinejoin="round" strokeLinecap="round">
        {contours.map((d, i) => <path key={d} d={d} pathLength="1" style={{ animationDelay: `${2200 + i * 50}ms` }} />)}
      </g>
      <image className="portrait-photo" href={profile.portrait} width="1280" height="1920" />
    </svg>
    <figcaption className="mono"><strong>{profile.name}</strong><span>DEVELOPER</span></figcaption>
  </figure>
}
